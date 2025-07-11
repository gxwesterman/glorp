"use client";

import React from "react";
import { useChat } from "@/contexts/ChatContext";
import { Dot } from "lucide-react";
import { ChatMessage } from "@/components/ChatMessage";
import { useIsMobile } from "@/hooks/use-mobile"

const pending = (
  <div className="flex" key="pending">
    <Dot className="animate-ping" />
    <Dot className="animate-ping delay-150" />
    <Dot className="animate-ping delay-300" />
  </div>
);

export default function Messages() {

  const isMobile = useIsMobile();
  const { messages } = useChat();

  return (
    messages.map((message, index) => {
      return (
        <div key={message.id} className={`${index === messages.length - 1 && (isMobile ? "min-h-100" : "min-h-160")}`}>
          {message.type === "question" ? (
            <div className="flex justify-end">
              <div className="relative inline-block max-w-[80%] break-words rounded-2xl bg-secondary/50 p-4 text-left">
                <div className="whitespace-pre overflow-x-auto prose max-w-none prose-pre:m-0 prose-pre:bg-transparent prose-teal prose-pre:p-0 dark:prose-invert">
                  {message.text}
                </div>
              </div>
            </div>
          ) : (
            message.status === "pending" ?
            (
              pending
            ) : (
              <ChatMessage message={message} index={index} />
            )
          )}
        </div>
      );
    })
  );
}