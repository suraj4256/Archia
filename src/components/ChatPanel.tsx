"use client";

import { useRef, useEffect } from "react";
import type { Message, Mode } from "@/types";

interface ChatPanelProps {
  messages: Message[];
  isLoading: boolean;
  mode: Mode;
  onModeChange: (mode: Mode) => void;
  onSendMessage: (message: string) => void;
}

/* ── Inline SVGs ──────────────────────────────────── */

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 2 11 13" />
      <path d="M22 2 15 22 11 13 2 9z" />
    </svg>
  );
}

function SparklesIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z" />
    </svg>
  );
}

function BotIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  );
}

function PlanIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function ActIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

/* ── Typing Indicator ─────────────────────────────── */

function TypingIndicator({ mode }: { mode: Mode }) {
  return (
    <div className="flex items-start gap-3 animate-fade-in-up px-1">
      <div className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${mode === "act" ? "bg-amber-500/20 text-amber-400" : "bg-accent-1/20 text-accent-3"}`}>
        <BotIcon />
      </div>
      <div className="glass-card rounded-2xl rounded-tl-md px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className={`typing-dot h-2 w-2 rounded-full ${mode === "act" ? "bg-amber-400" : "bg-accent-3"}`} />
            <div className={`typing-dot h-2 w-2 rounded-full ${mode === "act" ? "bg-amber-400" : "bg-accent-3"}`} />
            <div className={`typing-dot h-2 w-2 rounded-full ${mode === "act" ? "bg-amber-400" : "bg-accent-3"}`} />
          </div>
          {mode === "act" && (
            <span className="text-[10px] text-amber-400/70 ml-1 animate-pulse">
              Generating architecture...
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Message Bubble ───────────────────────────────── */

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  const isAct = message.mode === "act";

  return (
    <div
      className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : ""} ${
        isUser ? "animate-slide-in-right" : "animate-slide-in-left"
      }`}
    >
      {/* Avatar */}
      {!isUser && (
        <div className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${isAct ? "bg-amber-500/20 text-amber-400" : "bg-accent-1/20 text-accent-3"}`}>
          <BotIcon />
        </div>
      )}

      {/* Bubble */}
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? isAct
              ? "rounded-tr-md bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/20"
              : "rounded-tr-md bg-gradient-to-br from-accent-1 to-accent-2 text-white shadow-lg shadow-accent-1/20"
            : "glass-card rounded-tl-md text-zinc-200"
        }`}
      >
        {/* Mode badge on assistant messages */}
        {!isUser && message.mode && (
          <span className={`inline-flex items-center gap-1 text-[9px] uppercase tracking-wider mb-1.5 ${isAct ? "text-amber-400/70" : "text-accent-3/60"}`}>
            {isAct ? <ActIcon /> : <PlanIcon />}
            {message.mode}
          </span>
        )}
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );
}

/* ── Mode Toggle ──────────────────────────────────── */

function ModeToggle({
  mode,
  onModeChange,
  disabled,
}: {
  mode: Mode;
  onModeChange: (m: Mode) => void;
  disabled: boolean;
}) {
  return (
    <div className="flex items-center rounded-xl border border-white/[0.06] bg-white/[0.02] p-0.5">
      <button
        type="button"
        onClick={() => onModeChange("plan")}
        disabled={disabled}
        className={`flex items-center gap-1.5 rounded-[10px] px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
          mode === "plan"
            ? "bg-accent-1/20 text-accent-3 shadow-sm"
            : "text-zinc-500 hover:text-zinc-300"
        }`}
      >
        <PlanIcon />
        Plan
      </button>
      <button
        type="button"
        onClick={() => onModeChange("act")}
        disabled={disabled}
        className={`flex items-center gap-1.5 rounded-[10px] px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
          mode === "act"
            ? "bg-amber-500/20 text-amber-400 shadow-sm"
            : "text-zinc-500 hover:text-zinc-300"
        }`}
      >
        <ActIcon />
        Act
      </button>
    </div>
  );
}

/* ── Suggested Prompts ────────────────────────────── */

const SUGGESTIONS = [
  { text: "Design a scalable e-commerce backend", mode: "plan" as Mode },
  { text: "Create a microservices architecture", mode: "plan" as Mode },
  { text: "Build a real-time chat system", mode: "plan" as Mode },
  { text: "Design an event-driven pipeline", mode: "plan" as Mode },
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
        <h2 className="text-lg font-semibold text-zinc-100">Archia Copilot</h2>
        <p className="max-w-[260px] text-center text-xs text-zinc-500">
          Start in <span className="text-accent-3 font-medium">Plan</span> mode to discuss your architecture, then switch to <span className="text-amber-400 font-medium">Act</span> to generate the diagram.
        </p>
      </div>

      <div className="grid w-full max-w-[320px] gap-2 animate-fade-in-up">
        {SUGGESTIONS.map((s) => (
          <button
            key={s.text}
            type="button"
            onClick={() => onSelect(s.text)}
            className="group rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-left text-xs text-zinc-400 transition-all duration-200 hover:border-accent-1/30 hover:bg-accent-1/5 hover:text-zinc-200"
          >
            <span className="mr-2 text-accent-3 opacity-0 transition-opacity group-hover:opacity-100">
              →
            </span>
            {s.text}
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
  mode,
  onModeChange,
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
      <div className="flex items-center gap-3 border-b border-white/[0.06] px-5 py-3">
        <div className={`flex h-8 w-8 items-center justify-center rounded-xl shadow-lg ${mode === "act" ? "bg-gradient-to-br from-amber-500 to-orange-600 shadow-amber-500/20" : "bg-gradient-to-br from-accent-1 to-accent-2 shadow-accent-1/20"} transition-all duration-300`}>
          <SparklesIcon />
        </div>
        <div className="flex-1">
          <h1 className="text-sm font-semibold text-zinc-100">Archia</h1>
          <p className="text-[11px] text-zinc-500">
            {mode === "plan" ? "Planning architecture" : "Generating diagram"}
          </p>
        </div>
        <ModeToggle mode={mode} onModeChange={onModeChange} disabled={isLoading} />
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
          {isLoading && <TypingIndicator mode={mode} />}
        </div>
      )}

      {/* ── Input ──────────────────────────────────── */}
      <div className="border-t border-white/[0.06] p-4">
        {/* Mode indicator above input */}
        <div className="mb-2 flex items-center gap-2">
          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${
            mode === "plan"
              ? "bg-accent-1/10 text-accent-3"
              : "bg-amber-500/10 text-amber-400"
          }`}>
            {mode === "plan" ? <PlanIcon /> : <ActIcon />}
            {mode === "plan" ? "Plan — discuss your architecture" : "Act — generate diagram from conversation"}
          </span>
        </div>

        <div className={`group relative flex items-end gap-2 rounded-2xl border bg-white/[0.02] px-4 py-3 transition-colors ${
          mode === "act"
            ? "border-amber-500/20 focus-within:border-amber-500/40 focus-within:bg-amber-500/[0.02]"
            : "border-white/[0.06] focus-within:border-accent-1/40 focus-within:bg-white/[0.03]"
        }`}>
          <textarea
            ref={inputRef}
            rows={1}
            placeholder={
              mode === "plan"
                ? "Describe your system requirements..."
                : "Describe what to build or just hit Enter to use the plan..."
            }
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
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-white shadow-lg transition-all duration-200 hover:brightness-110 disabled:opacity-40 disabled:shadow-none ${
              mode === "act"
                ? "bg-gradient-to-r from-amber-500 to-orange-600 shadow-amber-500/25 hover:shadow-amber-500/40"
                : "bg-gradient-to-r from-accent-1 to-accent-2 shadow-accent-1/25 hover:shadow-accent-1/40"
            }`}
          >
            <SendIcon />
          </button>
        </div>
        <p className="mt-2 text-center text-[10px] text-zinc-600">
          {mode === "plan"
            ? "Plan your architecture · Switch to Act when ready"
            : "Enter to generate · Uses chat history as context"}
        </p>
      </div>
    </div>
  );
}
