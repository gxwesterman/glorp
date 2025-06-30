"use client";

import React, { useRef, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { usePathname } from "next/navigation";
import { useChat } from "@/contexts/ChatContext";
import { Dot } from "lucide-react";
import Branch from "@/components/Branch";
import Copy from "@/components/Copy";

const pending = (
  <div className="flex" key="pending">
    <Dot className="animate-ping" />
    <Dot className="animate-ping delay-150" />
    <Dot className="animate-ping delay-300" />
  </div>
);

export default function Chat() {

  const { chat, messages } = useChat();
  const pathname = usePathname();
  const scrollRef = useRef<HTMLDivElement>(null);
  const streamingAnswer = messages.find(message => message.status === "streaming");
  const doneAnswers = messages.filter(message => message.status === "done");

  useEffect(() => {
    document.querySelectorAll('[data-code]').forEach((el) => {
      const code = decodeURIComponent(el.getAttribute('data-code') ?? "");
      const language = el.getAttribute('data-lang');
      const mountPoint = document.createElement('div');
      mountPoint.className = "items-center bg-secondary/50 flex justify-between rounded-t-md p-1";
      el.prepend(mountPoint);
      const root = createRoot(mountPoint);
      root.render(
        <>
          <span className="font-mono text-muted-foreground ml-2">{language}</span>
          <Copy content={code} />
        </>
      );
    })
  }, [messages]);

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
                          <div dangerouslySetInnerHTML={{ __html: streamingAnswer?.html ?? "" }} />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4 justify-start group">
                      <div className="relative w-full max-w-full break-words">
                        <div className="space-y-4 prose max-w-none prose-pre:m-0 prose-pre:bg-transparent prose-pre:p-0 dark:prose-invert">
                          <div dangerouslySetInnerHTML={{ __html: message.html }} />
                        </div>
                      </div>
                      <div className="space-x-1 flex">
                        <Branch className="opacity-0 group-hover:opacity-100" chat={chat} index={index} />
                        <Copy className="opacity-0 group-hover:opacity-100" content={message.text} />
                      </div>
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