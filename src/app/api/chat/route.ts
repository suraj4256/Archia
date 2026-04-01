import type { ChatAPIRequest, ChatAPIResponse, ChatHistoryEntry } from "@/types";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Gemini API helper
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent";

interface GeminiPart {
  text: string;
}
interface GeminiContent {
  role: "user" | "model";
  parts: GeminiPart[];
}

const RETRYABLE = new Set([429, 503, 500]);

async function callGemini(
  contents: GeminiContent[],
  systemInstruction?: string,
  retries = 4
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY is not configured");

  const body: Record<string, unknown> = { contents };
  if (systemInstruction) {
    body.system_instruction = { parts: [{ text: systemInstruction }] };
  }

  for (let attempt = 0; attempt < retries; attempt++) {
    const res = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (RETRYABLE.has(res.status)) {
      const waitMs = (attempt + 1) * 2500; // 2.5s, 5s, 7.5s, 10s
      console.warn(
        `Gemini ${res.status}, retrying in ${waitMs}ms (attempt ${attempt + 1}/${retries})`
      );
      await new Promise((r) => setTimeout(r, waitMs));
      continue;
    }

    if (!res.ok) {
      const errText = await res.text();
      console.error("Gemini API error:", res.status, errText);
      throw new Error(`Gemini API returned ${res.status}`);
    }

    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error("Empty response from Gemini");
    return text;
  }

  throw new Error(
    "Gemini API temporarily unavailable after retries. Please wait a moment and try again."
  );
}

/** Convert our chat history to Gemini's role format */
function toGeminiContents(
  history: ChatHistoryEntry[],
  newMessage?: string
): GeminiContent[] {
  const contents: GeminiContent[] = history.map((h) => ({
    role: h.role === "assistant" ? "model" : "user",
    parts: [{ text: h.content }],
  }));
  if (newMessage) {
    contents.push({ role: "user", parts: [{ text: newMessage }] });
  }
  return contents;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * System prompts
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function getPlanSystem(currentDiagram: string): string {
  const base = `You are Archia, a senior system design architect and copilot.
You are in PLAN mode — your job is to help the user brainstorm, discuss trade-offs,
ask clarifying questions, and iteratively refine their system architecture requirements.

Guidelines:
- Be conversational, concise, and helpful
- Ask smart follow-up questions to understand scale, latency needs, data patterns, etc.
- Suggest architectural patterns (microservices, event-driven, CQRS, etc.)
- Do NOT generate any Mermaid diagrams or code — that happens in Act mode
- Keep responses under 150 words
- Use bullet points for clarity`;

  if (currentDiagram) {
    return (
      base +
      `\n\nIMPORTANT: The user already has a generated architecture diagram. Here it is in Mermaid format:
\`\`\`mermaid
${currentDiagram}
\`\`\`
You can reference this diagram when the user asks about it, suggests changes, or wants to refine it.
Help them plan modifications — but do NOT regenerate the diagram yourself. Tell them to switch to Act mode to apply changes.`
    );
  }
  return base;
}

const REFINE_SYSTEM = `You are a system design expert. You will receive a planning conversation
between a user and an AI architect, along with any existing diagram.

Your job is to produce a precise, detailed architecture specification that captures:
1. All components/services mentioned or shown in the existing diagram
2. Any modifications the user requested (replacements, additions, removals)
3. How components connect (protocols, data flow)
4. Databases, caches, queues, external services
5. Key architectural patterns decided
6. Scale requirements if discussed

CRITICAL: If an existing diagram is provided and the user asks for modifications,
your spec MUST preserve everything from the existing diagram that wasn't explicitly changed.
Only modify what the user specifically asked to change.

Output ONLY the specification text, no preamble.`;

const DIAGRAM_SYSTEM = `You are a Mermaid.js diagram expert. Given a system architecture specification,
generate a beautiful, detailed Mermaid flowchart diagram.

Rules:
1. Use "graph TB" (top-to-bottom) layout
2. Use descriptive node labels with technology names: API["API Gateway (Kong)"]
3. Use subgraphs to group related components: subgraph Layer_Name ["Display Name"]
4. Use different arrow styles:
   - --> for data flow
   - -.-> for async/optional connections
   - --- for bidirectional/internal
5. Add style statements with these colors:
   - Client/Frontend: fill:#6366f1,stroke:#818cf8,color:#fff
   - Load Balancer/Gateway: fill:#8b5cf6,stroke:#a78bfa,color:#fff
   - API/Services: fill:#3b82f6,stroke:#60a5fa,color:#fff
   - Cache/Redis: fill:#f59e0b,stroke:#fbbf24,color:#000
   - Database: fill:#10b981,stroke:#34d399,color:#fff
   - Queue/Messaging: fill:#ec4899,stroke:#f472b6,color:#fff
   - Workers: fill:#14b8a6,stroke:#2dd4bf,color:#fff
   - Storage: fill:#f97316,stroke:#fb923c,color:#fff
   - Monitoring: fill:#a855f7,stroke:#c084fc,color:#fff
   - Security: fill:#06b6d4,stroke:#22d3ee,color:#fff

Return ONLY valid JSON in this exact format (no markdown fences, no extra text):
{"diagram":"<mermaid code here>","explanation":"<2-3 sentence summary of what changed or was generated>"}`;

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * JSON parser
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function parseJsonResponse(raw: string): ChatAPIResponse | null {
  try {
    const cleaned = raw
      .replace(/```json\s*/g, "")
      .replace(/```\s*/g, "")
      .trim();
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const obj = JSON.parse(jsonMatch[0]);
      if (obj.diagram && obj.explanation) {
        return obj as ChatAPIResponse;
      }
    }
  } catch {
    // ignore
  }
  return null;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Route handler
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ChatAPIRequest;
    const { message, currentDiagram, mode, chatHistory } = body;

    if (!message || typeof message !== "string") {
      return Response.json({ error: "Message is required" }, { status: 400 });
    }

    // ─── PLAN MODE ─────────────────────────────────
    // Passes current diagram context so AI can discuss the existing architecture
    if (mode === "plan") {
      const contents = toGeminiContents(chatHistory || [], message);
      const systemPrompt = getPlanSystem(currentDiagram || "");
      const reply = await callGemini(contents, systemPrompt);
      return Response.json({
        diagram: "",
        explanation: reply,
      } as ChatAPIResponse);
    }

    // ─── ACT MODE — Two-call chain ─────────────────
    const history = chatHistory || [];

    // Build the refine prompt with full context
    const conversationText = history.length
      ? history
        .map(
          (h) =>
            `${h.role === "user" ? "USER" : "ARCHITECT"}: ${h.content}`
        )
        .join("\n\n")
      : "(No prior conversation)";

    const diagramContext = currentDiagram
      ? `\n\nEXISTING DIAGRAM (Mermaid) — preserve everything not explicitly changed:\n\`\`\`mermaid\n${currentDiagram}\n\`\`\``
      : "\n\n(No existing diagram — generate from scratch)";

    // Call 1: Refine chat + existing diagram into architecture spec
    const refineContents: GeminiContent[] = [
      {
        role: "user",
        parts: [
          {
            text: `Planning conversation:\n\n${conversationText}\n\nUSER: ${message}${diagramContext}\n\nProduce a detailed architecture specification. If an existing diagram was provided, incorporate the user's requested changes while preserving everything else.`,
          },
        ],
      },
    ];

    const spec = await callGemini(refineContents, REFINE_SYSTEM);
    console.log("[Act] Refined spec length:", spec.length);

    // Call 2: Generate the Mermaid diagram from the spec
    const diagramPrompt = currentDiagram
      ? `Architecture specification:\n\n${spec}\n\nExisting diagram for reference (modify, don't rebuild from scratch):\n\`\`\`mermaid\n${currentDiagram}\n\`\`\`\n\nGenerate the updated Mermaid diagram and explanation as JSON.`
      : `Architecture specification:\n\n${spec}\n\nGenerate the Mermaid diagram and explanation as JSON.`;

    const diagramContents: GeminiContent[] = [
      { role: "user", parts: [{ text: diagramPrompt }] },
    ];

    const raw = await callGemini(diagramContents, DIAGRAM_SYSTEM);
    const parsed = parseJsonResponse(raw);

    if (parsed) {
      return Response.json(parsed);
    }

    // If parsing fails, keep existing diagram and show spec
    return Response.json({
      diagram: currentDiagram || "",
      explanation:
        "Generated the architecture spec but the diagram format was invalid. Try again.\n\n" +
        spec.slice(0, 600),
    } as ChatAPIResponse);
  } catch (error) {
    console.error("Chat API error:", error);
    const errMsg =
      error instanceof Error ? error.message : "Internal server error";
    return Response.json(
      {
        diagram: "",
        explanation: `⚠️ ${errMsg}`,
      } as ChatAPIResponse,
      { status: 200 }
    );
  }
}
