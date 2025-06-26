"use client";

import React, { useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useChat } from "@/contexts/ChatContext";
import ReactMarkdown from "react-markdown";
import { Dot } from "lucide-react";
import rehypeHighlight from 'rehype-highlight'
import Branch from "@/components/Branch";

const pending = (
  <div className="flex" key="pending">
    <Dot className="animate-ping" />
    <Dot className="animate-ping delay-150" />
    <Dot className="animate-ping delay-300" />
  </div>
)

export default function Chat() {

  const { chat, messages } = useChat();
  const pathname = usePathname();
  const scrollRef = useRef<HTMLDivElement>(null);
  const streamingAnswer = messages.find(message => message.status === "streaming");

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
          {messages.map((message, index) => {
            return (
              <div key={message.id}>
                {message.type === "question" ? (
                  <div className="flex justify-end">
                    <div className="relative inline-block max-w-[80%] break-words rounded-2xl border border-secondary/50 bg-secondary/50 p-4 text-left">
                      <div className="prose max-w-none prose-pre:m-0 prose-pre:bg-transparent prose-pre:p-0 dark:prose-invert">
                        {message.text}
                      </div>
                    </div>
                  </div>
                ) : (
                  message.status === "pending" ?
                  (
                    pending
                  ) :
                  message.status === "streaming" ?
                  (
                    <div className="flex justify-start">
                      <div className="relative w-full max-w-full break-words">
                        <div className="space-y-4 prose max-w-none prose-pre:m-0 prose-pre:bg-transparent prose-pre:p-0 dark:prose-invert">
                          <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{streamingAnswer?.text}</ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4 justify-start group">
                      <div className="relative w-full max-w-full break-words">
                        <div className="space-y-4 prose max-w-none prose-pre:m-0 prose-pre:bg-transparent prose-pre:p-0 dark:prose-invert">
                          <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{message.text}</ReactMarkdown>
                        </div>
                      </div>
                      <Branch className="opacity-0 group-hover:opacity-100" chat={chat} index={index} />
                    </div>
                  )
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}