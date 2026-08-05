"use client";

import { useRef, useState } from "react";
import { MessageSquare, Send } from "lucide-react";

type Message = { role: "user" | "assistant" | "error"; content: string };

const suggestions = [
  "What is the Digital Nomad Visa E33G and how do I get it?",
  "What is the difference between KITAS and KITAP?",
  "How can a foreigner set up a PT PMA company in Bali?",
  "Can foreigners own property or land in Bali?",
  "How do I extend my Visa on Arrival in Bali?",
  "What documents do I need to open a bank account in Indonesia?",
];

export function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const history = messages
      .filter((m) => m.role !== "error")
      .map((m) => ({ role: m.role, content: m.content }));

    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessages((prev) => [...prev, { role: "error", content: data.error || "Something went wrong." }]);
      } else {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      }
    } catch {
      setMessages((prev) => [...prev, { role: "error", content: "Connection error. Please try again." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {messages.length === 0 && (
        <div className="mx-auto mb-8 flex max-w-[640px] flex-wrap justify-center gap-2">
          {suggestions.map((q) => (
            <button key={q} onClick={() => send(q)} className="rounded-full px-4 py-2 text-[12.5px] font-medium text-tx2 shadow-neu-sm hover:text-ac">
              {q.length > 40 ? q.slice(0, 37) + "…" : q}
            </button>
          ))}
        </div>
      )}

      <div className="card mx-auto flex max-w-[720px] flex-col overflow-hidden">
        <div className="flex min-h-[320px] flex-col gap-4 p-6">
          {messages.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 py-10 text-center text-tx3">
              <MessageSquare size={28} strokeWidth={1.4} />
              <span className="text-[13px]">Ask a question above or type below to get started.</span>
            </div>
          ) : (
            messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-[13.5px] leading-relaxed whitespace-pre-wrap ${
                  m.role === "user"
                    ? "ml-auto bg-ac text-white"
                    : m.role === "error"
                      ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
                      : "shadow-neu-sm text-tx2"
                }`}
              >
                {m.content}
              </div>
            ))
          )}
          {loading && (
            <div className="shadow-neu-sm flex w-fit gap-1 rounded-2xl px-4 py-3">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-tx3 [animation-delay:-0.3s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-tx3 [animation-delay:-0.15s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-tx3" />
            </div>
          )}
        </div>

        <div className="border-t border-bd p-4">
          <div className="flex items-end gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              rows={1}
              maxLength={2000}
              placeholder="Ask about visas, legal services, life in Bali…"
              className="field max-h-32 flex-1 resize-none"
            />
            <button
              onClick={() => send(input)}
              disabled={!input.trim() || loading}
              aria-label="Send"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ac text-white disabled:opacity-40"
            >
              <Send size={16} />
            </button>
          </div>
          <p className="mt-3 text-center text-[11.5px] text-tx3">
            Sali Agency AI provides general information only — not legal advice.
          </p>
        </div>
      </div>
    </>
  );
}
