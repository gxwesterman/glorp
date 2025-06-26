"use client";

import React, { useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useChat } from "@/contexts/ChatContext";
import ReactMarkdown from "react-markdown";
import { Dot } from "lucide-react";
import rehypeHighlight from 'rehype-highlight'
import Branch from "@/components/Branch";
import Copy from "@/components/Copy";
import { cn } from "@/lib/utils";

const pending = (
  <div className="flex" key="pending">
    <Dot className="animate-ping" />
    <Dot className="animate-ping delay-150" />
    <Dot className="animate-ping delay-300" />
  </div>
);

function CustomMarkdown({ markdown }: { markdown: string | undefined }) {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeHighlight]}
      components={{
        code(props) {
          console.log(props);
          const { children, className, node, ...rest} = props;
          const match = /language-(\w+)/.exec(className || '');
          return match ? (
            <div>
              <div className="bg-secondary/50 px-2 py-1 flex justify-between items-center">
                {match[1]}
                <Copy content={''} />
              </div>
              <code {...rest} className={cn(className, "!font-mono")}>
                {children}
              </code>
            </div>
          ) : (
            <code {...rest} className={className}>
              {children}
            </code>
          )
        }
      }}
    >
      {markdown}
    </ReactMarkdown>
  )
}

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
                          <CustomMarkdown markdown={streamingAnswer?.text} />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4 justify-start group">
                      <div className="relative w-full max-w-full break-words">
                        <div className="space-y-4 prose max-w-none prose-pre:m-0 prose-pre:bg-transparent prose-pre:p-0 dark:prose-invert">
                          <CustomMarkdown markdown={message.text} />
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