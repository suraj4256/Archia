"use client";

import { useRef, useEffect } from "react";
import type { Message } from "@/types";

interface ChatPanelProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (message: string) => void;
}

/* ── Inline SVGs ──────────────────────────────────── */

function SendIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 2 11 13" />
      <path d="M22 2 15 22 11 13 2 9z" />
    </svg>
  );
}

function SparklesIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z" />
    </svg>
  );
}

function BotIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  );
}

/* ── Typing Indicator ─────────────────────────────── */

function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 animate-fade-in-up px-1">
      <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent-1/20 text-accent-3">
        <BotIcon />
      </div>
      <div className="glass-card rounded-2xl rounded-tl-md px-4 py-3">
        <div className="flex items-center gap-1.5">
          <div className="typing-dot h-2 w-2 rounded-full bg-accent-3" />
          <div className="typing-dot h-2 w-2 rounded-full bg-accent-3" />
          <div className="typing-dot h-2 w-2 rounded-full bg-accent-3" />
        </div>
      </div>
    </div>
  );
}

/* ── Message Bubble ───────────────────────────────── */

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : ""} ${
        isUser ? "animate-slide-in-right" : "animate-slide-in-left"
      }`}
    >
      {/* Avatar */}
      {!isUser && (
        <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent-1/20 text-accent-3">
          <BotIcon />
        </div>
      )}

      {/* Bubble */}
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? "rounded-tr-md bg-gradient-to-br from-accent-1 to-accent-2 text-white shadow-lg shadow-accent-1/20"
            : "glass-card rounded-tl-md text-zinc-200"
        }`}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );
}

/* ── Suggested Prompts ────────────────────────────── */

const SUGGESTIONS = [
  "Design a scalable e-commerce backend",
  "Create a microservices architecture",
  "Build a real-time chat system",
  "Design an event-driven pipeline",
];

function SuggestedPrompts({
  onSelect,
}: {
  onSelect: (prompt: string) => void;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6">
      <div className="mb-8 flex flex-col items-center gap-3 animate-fade-in">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-1 to-accent-2 shadow-lg shadow-accent-1/25">
          <SparklesIcon />
        </div>
        <h2 className="text-lg font-semibold text-zinc-100">
          Archia Copilot
        </h2>
        <p className="max-w-[240px] text-center text-xs text-zinc-500">
          Describe your system and I&apos;ll generate an architecture diagram for you.
        </p>
      </div>

      <div className="grid w-full max-w-[320px] gap-2 animate-fade-in-up">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => onSelect(s)}
            className="group rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-left text-xs text-zinc-400 transition-all duration-200 hover:border-accent-1/30 hover:bg-accent-1/5 hover:text-zinc-200"
          >
            <span className="mr-2 text-accent-3 opacity-0 transition-opacity group-hover:opacity-100">
              →
            </span>
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Main Chat Panel ──────────────────────────────── */

export default function ChatPanel({
  messages,
  isLoading,
  onSendMessage,
}: ChatPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSubmit = () => {
    const value = inputRef.current?.value.trim();
    if (!value || isLoading) return;
    onSendMessage(value);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex h-full flex-col">
      {/* ── Header ─────────────────────────────────── */}
      <div className="flex items-center gap-3 border-b border-white/[0.06] px-5 py-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-accent-1 to-accent-2 shadow-lg shadow-accent-1/20">
          <SparklesIcon />
        </div>
        <div>
          <h1 className="text-sm font-semibold text-zinc-100">Archia</h1>
          <p className="text-[11px] text-zinc-500">AI Design Copilot</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-[breathe_3s_ease-in-out_infinite]" />
          <span className="text-[11px] text-zinc-500">Online</span>
        </div>
      </div>

      {/* ── Messages ───────────────────────────────── */}
      {messages.length === 0 ? (
        <SuggestedPrompts onSelect={onSendMessage} />
      ) : (
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
        >
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          {isLoading && <TypingIndicator />}
        </div>
      )}

      {/* ── Input ──────────────────────────────────── */}
      <div className="border-t border-white/[0.06] p-4">
        <div className="group relative flex items-end gap-2 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 transition-colors focus-within:border-accent-1/40 focus-within:bg-white/[0.03]">
          <textarea
            ref={inputRef}
            rows={1}
            placeholder="Describe your system architecture..."
            className="flex-1 resize-none bg-transparent text-sm text-zinc-200 placeholder-zinc-600 outline-none"
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = "auto";
              target.style.height = Math.min(target.scrollHeight, 120) + "px";
            }}
          />
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-accent-1 to-accent-2 text-white shadow-lg shadow-accent-1/25 transition-all duration-200 hover:shadow-accent-1/40 hover:brightness-110 disabled:opacity-40 disabled:shadow-none"
          >
            <SendIcon />
          </button>
        </div>
        <p className="mt-2 text-center text-[10px] text-zinc-600">
          Press Enter to send · Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}
