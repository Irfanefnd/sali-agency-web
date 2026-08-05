import type { Metadata } from "next";
import { MessageSquareText } from "lucide-react";
import { ChatWindow } from "@/components/ChatWindow";

export const metadata: Metadata = {
  title: "AI Chat",
  description: "Sali Agency AI Assistant — instant answers to your visa, legal, and immigration questions about Bali.",
};

export default function AiChatPage() {
  return (
    <section className="mx-auto max-w-[900px] px-8 pt-[110px] pb-24">
      <div className="mb-10 flex flex-col items-center text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl text-ac shadow-neu-sm">
          <MessageSquareText size={24} strokeWidth={1.6} />
        </div>
        <h1 className="text-[26px] font-extrabold text-tx">Sali Agency Assistant</h1>
        <p className="mt-2 text-[14px] text-tx2">Ask anything about Indonesian visas, legal services, and life in Bali.</p>
      </div>

      <ChatWindow />
    </section>
  );
}
