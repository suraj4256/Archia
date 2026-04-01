import type { ChatAPIRequest, ChatAPIResponse } from "@/types";

const SYSTEM_PROMPT = `Act as a senior system architect.

Given the current architecture (Mermaid format):
{currentDiagram}

Modify or generate architecture based on:
{userInput}

Return STRICT JSON:
{
  "diagram": "<mermaid code>",
  "explanation": "<short explanation>"
}`;

// Mock responses for when no API key is configured
const MOCK_RESPONSES: Record<string, ChatAPIResponse> = {
  default: {
    diagram: `graph TB
    %% Client Layer
    Client["Client (Web/Mobile)"]
    DNS["DNS"]
    CDN["CDN / Edge Cache"]
    WAF["WAF + Rate Limiter"]

    %% Entry Layer
    LB["Global Load Balancer"]
    APIGW["API Gateway"]

    %% Service Layer
    Auth["Auth Service"]
    API1["App Server 1"]
    API2["App Server 2"]
    API3["App Server 3"]

    %% Caching Layer
    Redis["Redis Cache Cluster"]
    Session["Session Store"]

    %% Messaging Layer
    MQ["Message Queue (Kafka/SQS)"]
    DLQ["Dead Letter Queue"]

    %% Worker Layer
    Worker1["Worker Service 1"]
    Worker2["Worker Service 2"]

    %% Data Layer
    DBPrimary[("PostgreSQL Primary")]
    DBReplica1[("Read Replica 1")]
    DBReplica2[("Read Replica 2")]
    DBShard[("Sharded DB Cluster")]

    %% Storage
    ObjectStore[("Object Storage (S3)")]
    Search["Search Engine (Elasticsearch)"]

    %% Observability
    Logs["Logging Service"]
    Metrics["Metrics (Prometheus)"]
    Tracing["Tracing (Jaeger)"]

    %% Flow
    Client --> DNS --> CDN --> WAF --> LB --> APIGW

    APIGW --> Auth
    APIGW --> API1
    APIGW --> API2
    APIGW --> API3

    %% Caching
    API1 --> Redis
    API2 --> Redis
    API3 --> Redis

    API1 --> Session
    API2 --> Session
    API3 --> Session

    %% DB Reads/Writes
    API1 --> DBPrimary
    API2 --> DBPrimary
    API3 --> DBPrimary

    DBPrimary --> DBReplica1
    DBPrimary --> DBReplica2

    API1 --> DBReplica1
    API2 --> DBReplica2

    DBPrimary --> DBShard

    %% Messaging
    API1 --> MQ
    API2 --> MQ
    API3 --> MQ

    MQ --> Worker1
    MQ --> Worker2

    MQ --> DLQ

    %% Workers
    Worker1 --> ObjectStore
    Worker2 --> ObjectStore

    Worker1 --> DBPrimary
    Worker2 --> DBPrimary

    Worker1 --> Search
    Worker2 --> Search

    %% Observability
    API1 --> Logs
    API2 --> Logs
    API3 --> Logs
    Worker1 --> Logs
    Worker2 --> Logs

    API1 --> Metrics
    API2 --> Metrics
    API3 --> Metrics

    API1 --> Tracing
    API2 --> Tracing
    API3 --> Tracing

    %% Styling
    style Client fill:#6366f1,stroke:#818cf8,color:#fff
    style CDN fill:#06b6d4,stroke:#22d3ee,color:#fff
    style WAF fill:#06b6d4,stroke:#22d3ee,color:#fff
    style LB fill:#8b5cf6,stroke:#a78bfa,color:#fff
    style APIGW fill:#8b5cf6,stroke:#a78bfa,color:#fff

    style API1 fill:#3b82f6,stroke:#60a5fa,color:#fff
    style API2 fill:#3b82f6,stroke:#60a5fa,color:#fff
    style API3 fill:#3b82f6,stroke:#60a5fa,color:#fff

    style Redis fill:#f59e0b,stroke:#fbbf24,color:#000
    style Session fill:#f59e0b,stroke:#fbbf24,color:#000

    style DBPrimary fill:#10b981,stroke:#34d399,color:#fff
    style DBReplica1 fill:#10b981,stroke:#34d399,color:#fff
    style DBReplica2 fill:#10b981,stroke:#34d399,color:#fff
    style DBShard fill:#10b981,stroke:#34d399,color:#fff

    style MQ fill:#ec4899,stroke:#f472b6,color:#fff
    style DLQ fill:#ec4899,stroke:#f472b6,color:#fff

    style Worker1 fill:#14b8a6,stroke:#2dd4bf,color:#fff
    style Worker2 fill:#14b8a6,stroke:#2dd4bf,color:#fff

    style ObjectStore fill:#f97316,stroke:#fb923c,color:#fff
    style Search fill:#22c55e,stroke:#4ade80,color:#fff

    style Logs fill:#64748b,stroke:#94a3b8,color:#fff
    style Metrics fill:#64748b,stroke:#94a3b8,color:#fff
    style Tracing fill:#64748b,stroke:#94a3b8,color:#fff`,
    explanation:
      "I've designed a scalable web architecture with load balancing across two API servers, Redis caching for performance, PostgreSQL for persistent storage, a message queue for async processing, and a worker service for background tasks with object storage.",
  },
  microservices: {
    diagram: `graph TB
    Gateway["API Gateway"]
    Auth["Auth Service"]
    Users["User Service"]
    Orders["Order Service"]
    Payments["Payment Service"]
    Notify["Notification Service"]
    UserDB[("Users DB")]
    OrderDB[("Orders DB")]
    PayDB[("Payments DB")]
    Bus["Event Bus"]
    Cache["Redis"]

    Gateway --> Auth
    Gateway --> Users
    Gateway --> Orders
    Gateway --> Payments
    Users --> UserDB
    Orders --> OrderDB
    Payments --> PayDB
    Orders --> Bus
    Payments --> Bus
    Bus --> Notify
    Auth --> Cache

    style Gateway fill:#6366f1,stroke:#818cf8,color:#fff
    style Auth fill:#ef4444,stroke:#f87171,color:#fff
    style Users fill:#3b82f6,stroke:#60a5fa,color:#fff
    style Orders fill:#3b82f6,stroke:#60a5fa,color:#fff
    style Payments fill:#3b82f6,stroke:#60a5fa,color:#fff
    style Notify fill:#3b82f6,stroke:#60a5fa,color:#fff
    style UserDB fill:#10b981,stroke:#34d399,color:#fff
    style OrderDB fill:#10b981,stroke:#34d399,color:#fff
    style PayDB fill:#10b981,stroke:#34d399,color:#fff
    style Bus fill:#f59e0b,stroke:#fbbf24,color:#000
    style Cache fill:#8b5cf6,stroke:#a78bfa,color:#fff`,
    explanation:
      "Here's a microservices architecture with an API Gateway for routing, dedicated services for Auth, Users, Orders, Payments, and Notifications. Each service owns its database (database-per-service pattern), and they communicate asynchronously via an Event Bus.",
  },
  realtime: {
    diagram: `graph TB
    Mobile["Mobile App"]
    Web["Web App"]
    CDN["CDN"]
    WSGateway["WebSocket Gateway"]
    API["REST API"]
    PubSub["Pub/Sub"]
    Presence["Presence Service"]
    Chat["Chat Service"]
    Media["Media Service"]
    DB[("MongoDB")]
    TimeSeries[("TimescaleDB")]
    Blob[("Blob Storage")]
    Search["Elasticsearch"]

    Mobile --> CDN
    Web --> CDN
    CDN --> API
    CDN --> WSGateway
    WSGateway --> PubSub
    WSGateway --> Presence
    API --> Chat
    Chat --> DB
    Chat --> PubSub
    Chat --> Search
    API --> Media
    Media --> Blob
    Presence --> TimeSeries

    style Mobile fill:#6366f1,stroke:#818cf8,color:#fff
    style Web fill:#6366f1,stroke:#818cf8,color:#fff
    style CDN fill:#8b5cf6,stroke:#a78bfa,color:#fff
    style WSGateway fill:#8b5cf6,stroke:#a78bfa,color:#fff
    style PubSub fill:#8b5cf6,stroke:#a78bfa,color:#fff
    style API fill:#3b82f6,stroke:#60a5fa,color:#fff
    style Presence fill:#3b82f6,stroke:#60a5fa,color:#fff
    style Chat fill:#3b82f6,stroke:#60a5fa,color:#fff
    style Media fill:#3b82f6,stroke:#60a5fa,color:#fff
    style DB fill:#10b981,stroke:#34d399,color:#fff
    style TimeSeries fill:#10b981,stroke:#34d399,color:#fff
    style Blob fill:#10b981,stroke:#34d399,color:#fff
    style Search fill:#f59e0b,stroke:#fbbf24,color:#000`,
    explanation:
      "This real-time architecture uses WebSocket connections through a gateway for persistent connections, Pub/Sub for message distribution, dedicated services for chat, presence tracking, and media handling, with specialized databases for different data patterns.",
  },
};

function getMockResponse(message: string, currentDiagram: string): ChatAPIResponse {
  const lowerMsg = message.toLowerCase();

  if (lowerMsg.includes("microservice") || lowerMsg.includes("micro-service")) {
    return MOCK_RESPONSES.microservices;
  }
  if (
    lowerMsg.includes("realtime") ||
    lowerMsg.includes("real-time") ||
    lowerMsg.includes("websocket") ||
    lowerMsg.includes("chat system")
  ) {
    return MOCK_RESPONSES.realtime;
  }

  // If there's already a diagram, generate a modification
  if (currentDiagram && currentDiagram.trim() !== "") {
    if (lowerMsg.includes("cache") || lowerMsg.includes("redis") || lowerMsg.includes("cdn")) {
      return {
        diagram: `graph TB
    Client["Client App"]
    CDNEdge["CDN Edge"]
    RateLimit["Rate Limiter"]
    LB["Load Balancer"]
    API1["API Server 1"]
    API2["API Server 2"]
    Cache["Redis Cache"]
    SessionCache["Session Store"]
    DB[("PostgreSQL")]
    Queue["Message Queue"]
    Worker["Worker Service"]
    Storage[("Object Storage")]

    Client --> CDNEdge
    CDNEdge --> RateLimit
    RateLimit --> LB
    LB --> API1
    LB --> API2
    API1 --> DB
    API2 --> DB
    API1 --> Cache
    API2 --> Cache
    API1 --> SessionCache
    API2 --> SessionCache
    API1 --> Queue
    API2 --> Queue
    Queue --> Worker
    Worker --> Storage
    Worker --> DB

    style Client fill:#6366f1,stroke:#818cf8,color:#fff
    style CDNEdge fill:#06b6d4,stroke:#22d3ee,color:#fff
    style RateLimit fill:#06b6d4,stroke:#22d3ee,color:#fff
    style LB fill:#8b5cf6,stroke:#a78bfa,color:#fff
    style API1 fill:#3b82f6,stroke:#60a5fa,color:#fff
    style API2 fill:#3b82f6,stroke:#60a5fa,color:#fff
    style Cache fill:#f59e0b,stroke:#fbbf24,color:#000
    style SessionCache fill:#f59e0b,stroke:#fbbf24,color:#000
    style DB fill:#10b981,stroke:#34d399,color:#fff
    style Queue fill:#ec4899,stroke:#f472b6,color:#fff
    style Worker fill:#14b8a6,stroke:#2dd4bf,color:#fff
    style Storage fill:#f97316,stroke:#fb923c,color:#fff`,
        explanation:
          "I've enhanced the architecture with a CDN Edge layer for static assets, a Rate Limiter for API protection, and a dedicated Session Store alongside the existing Redis Cache for improved performance and security.",
      };
    }
    if (lowerMsg.includes("monitor") || lowerMsg.includes("log") || lowerMsg.includes("observ")) {
      return {
        diagram: `graph TB
    Client["Client App"]
    LB["Load Balancer"]
    API1["API Server 1"]
    API2["API Server 2"]
    Cache["Redis Cache"]
    DB[("PostgreSQL")]
    Queue["Message Queue"]
    Worker["Worker Service"]
    Storage[("Object Storage")]
    Monitor["Prometheus"]
    Logger["ELK Stack"]
    Tracer["Jaeger Tracing"]

    Client --> LB
    LB --> API1
    LB --> API2
    API1 --> DB
    API2 --> DB
    API1 --> Cache
    API2 --> Cache
    API1 --> Queue
    API2 --> Queue
    Queue --> Worker
    Worker --> Storage
    Worker --> DB
    API1 -.-> Monitor
    API2 -.-> Monitor
    API1 -.-> Logger
    API2 -.-> Logger
    Worker -.-> Tracer

    style Client fill:#6366f1,stroke:#818cf8,color:#fff
    style LB fill:#8b5cf6,stroke:#a78bfa,color:#fff
    style API1 fill:#3b82f6,stroke:#60a5fa,color:#fff
    style API2 fill:#3b82f6,stroke:#60a5fa,color:#fff
    style Cache fill:#f59e0b,stroke:#fbbf24,color:#000
    style DB fill:#10b981,stroke:#34d399,color:#fff
    style Queue fill:#ec4899,stroke:#f472b6,color:#fff
    style Worker fill:#14b8a6,stroke:#2dd4bf,color:#fff
    style Storage fill:#f97316,stroke:#fb923c,color:#fff
    style Monitor fill:#a855f7,stroke:#c084fc,color:#fff
    style Logger fill:#a855f7,stroke:#c084fc,color:#fff
    style Tracer fill:#a855f7,stroke:#c084fc,color:#fff`,
        explanation:
          "I've added an observability stack: Prometheus for metrics collection, ELK Stack (Elasticsearch, Logstash, Kibana) for centralized logging, and Jaeger for distributed tracing across your services.",
      };
    }

    return {
      diagram: currentDiagram,
      explanation: `I've reviewed your current architecture. To make specific modifications, try asking me to:\n\n• Add caching layers\n• Add monitoring/observability\n• Switch to microservices\n• Add real-time capabilities\n• Add authentication\n• Scale specific components`,
    };
  }

  return MOCK_RESPONSES.default;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ChatAPIRequest;
    const { message, currentDiagram } = body;

    if (!message || typeof message !== "string") {
      return Response.json({ error: "Message is required" }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (apiKey) {
      // Real OpenAI call
      const prompt = SYSTEM_PROMPT.replace("{currentDiagram}", currentDiagram || "None")
        .replace("{userInput}", message);

      const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            { role: "system", content: prompt },
            { role: "user", content: message },
          ],
          temperature: 0.7,
          max_tokens: 2000,
        }),
      });

      if (!openaiRes.ok) {
        const errorData = await openaiRes.json();
        console.error("OpenAI API error:", errorData);
        // Fallback to mock
        const mockResponse = getMockResponse(message, currentDiagram);
        return Response.json(mockResponse);
      }

      const data = await openaiRes.json();
      const content = data.choices?.[0]?.message?.content;

      if (!content) {
        const mockResponse = getMockResponse(message, currentDiagram);
        return Response.json(mockResponse);
      }

      try {
        // Try to parse the JSON from the response
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]) as ChatAPIResponse;
          return Response.json(parsed);
        }
      } catch {
        // If parsing fails, fall back to mock
      }

      const mockResponse = getMockResponse(message, currentDiagram);
      return Response.json(mockResponse);
    }

    // Mock response with simulated delay
    await new Promise((resolve) => setTimeout(resolve, 1200 + Math.random() * 800));
    const mockResponse = getMockResponse(message, currentDiagram);
    return Response.json(mockResponse);
  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
