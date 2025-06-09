"use client";

import React, { useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Message } from "@/lib/types";

export default function Page({ messages }: { messages: Message[] }) {
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
      >
        <div className="mx-auto flex w-full max-w-3xl flex-col space-y-12 p-4 pb-8">
          {messages.map((message) => {
            return (
              <div key={message.id}>
                {message.type === "question" ? (
                  <div className="flex justify-end">
                    <div className="group relative inline-block max-w-[80%] break-words rounded-2xl border border-secondary/50 bg-secondary/50 p-4 text-left">
                      <div className="prose prose-pink prose-invert max-w-none prose-pre:m-0 prose-pre:bg-transparent prose-pre:p-0">
                        {message.text}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-start chat-content">
                    <div className="group relative w-full max-w-full break-words">
                      <div className="space-y-4 prose prose-pink prose-invert max-w-none prose-pre:m-0 prose-pre:bg-transparent prose-pre:p-0">
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