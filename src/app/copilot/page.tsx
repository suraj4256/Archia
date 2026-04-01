"use client";

import { useState, useCallback } from "react";
import ChatPanel from "@/components/ChatPanel";
import DiagramPanel from "@/components/DiagramPanel";
import type { Message, Mode, ChatAPIResponse, ChatHistoryEntry } from "@/types";

export default function CopilotPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentDiagram, setCurrentDiagram] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<Mode>("plan");

  const handleSendMessage = useCallback(
    async (content: string) => {
      const userMessage: Message = {
        id: `user-${Date.now()}`,
        role: "user",
        content,
        timestamp: Date.now(),
        mode,
      };
      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      try {
        // Build chat history from existing messages
        const chatHistory: ChatHistoryEntry[] = messages.map((m) => ({
          role: m.role,
          content: m.content,
        }));

        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: content,
            currentDiagram,
            mode,
            chatHistory,
          }),
        });

        if (!res.ok) throw new Error("API request failed");

        const data = (await res.json()) as ChatAPIResponse;

        const assistantMessage: Message = {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: data.explanation,
          timestamp: Date.now(),
          mode,
        };
        setMessages((prev) => [...prev, assistantMessage]);

        // Only update diagram in Act mode (or if diagram is returned)
        if (data.diagram) {
          setCurrentDiagram(data.diagram);
        }
      } catch (err) {
        console.error("Failed to send message:", err);
        const errorMessage: Message = {
          id: `error-${Date.now()}`,
          role: "assistant",
          content: "Sorry, something went wrong. Please try again.",
          timestamp: Date.now(),
          mode,
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [currentDiagram, messages, mode]
  );

  const handleModeChange = useCallback((newMode: Mode) => {
    setMode(newMode);
  }, []);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -left-[300px] -top-[300px] h-[600px] w-[600px] rounded-full bg-accent-1/[0.07] blur-[120px]" />
        <div className="absolute -bottom-[200px] -right-[200px] h-[500px] w-[500px] rounded-full bg-accent-2/[0.05] blur-[100px]" />
      </div>

      <aside className="relative z-10 flex h-full w-[34%] min-w-[340px] max-w-[480px] flex-col border-r border-white/[0.06] bg-background/80 backdrop-blur-xl">
        <ChatPanel
          messages={messages}
          isLoading={isLoading}
          mode={mode}
          onModeChange={handleModeChange}
          onSendMessage={handleSendMessage}
        />
      </aside>

      <main className="relative z-10 flex h-full flex-1 flex-col bg-background/50">
        <DiagramPanel diagram={currentDiagram} />
      </main>
    </div>
  );
}
