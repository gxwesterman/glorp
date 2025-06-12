"use client";

import React, { useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useChat } from "@/contexts/ChatContext";

export default function Chat() {

  const { messages } = useChat();
  const pathname = usePathname();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scroll({
        top: scrollRef.current.scrollHeight,
        behavior: "instant"
      })
    }
  }, [pathname]);

  return (
    <div className="absolute bottom-0 top-0 w-full">
      <div
        ref={scrollRef}
        className="absolute inset-0 overflow-y-scroll pt-3.5 pb-[144px]"
      >
        <div className="mx-auto flex w-full max-w-3xl flex-col space-y-12 p-4 pb-8">
          {messages.map((message) => {
            return (
              <div key={message.id}>
                {message.type === "question" ? (
                  <div className="flex justify-end">
                    <div className="group relative inline-block max-w-[80%] break-words rounded-2xl border border-secondary/50 bg-secondary/50 p-4 text-left">
                      <div className="prose max-w-none prose-pre:m-0 prose-pre:bg-transparent prose-pre:p-0">
                        {message.text}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-start">
                    <div className="group relative w-full max-w-full break-words">
                      <div className="space-y-4 prose max-w-none prose-pre:m-0 prose-pre:bg-transparent prose-pre:p-0">
                        {message.text}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}