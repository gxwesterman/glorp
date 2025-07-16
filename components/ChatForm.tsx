'use client'

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import React, { useRef, useState } from "react";
import { usePathname } from 'next/navigation';
import { ArrowUp } from 'lucide-react';
import { useChat } from "@/contexts/ChatContext";
import { startChat } from "@/lib/chat-utils";
import { cn } from "@/lib/utils";

export default function ChatForm() {
  const pathname = usePathname();
  let pageChatId = (pathname.split('/').pop() || '');
  const [input, setInput] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { user, messages, startStream } = useChat();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      ((e.key === 'Enter' || e.key === 'NumpadEnter') && !e.shiftKey)
    ) {
      e.preventDefault()
      e.currentTarget.form?.requestSubmit()
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input === '') {
      return;
    }
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
    }
    if (pageChatId === 'chat') {
        pageChatId = startChat(input, user.id);
        window.history.pushState({}, '', window.location.href + `/${pageChatId}`);
    }
    setInput('');
    startStream(pageChatId, input, messages);
  }

  const handleChange = (input: string) => {
    setInput(input);
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }

  return (
    <div className="absolute bottom-0 w-full px-4 pointer-events-none">
      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col text-center pointer-events-auto">
        <div className="relative rounded-lg p-2 pb-0 backdrop-blur-lg bg-secondary/70 shadow shadow-background">
          <form
            onSubmit={handleSubmit}
          >
            <div className="flex flex-grow flex-row items-start">
              <Textarea
                ref={textAreaRef}
                name="message"
                className="min-h-25 dark:bg-transparent font-medium grow resize-none border-none outline-none text-base shadow-none focus-visible:ring-0 max-h-80"
                placeholder="Type your message here..."
                onKeyDown={handleKeyDown}
                value={input}
                onChange={(e) => handleChange(e.target.value)}
              />
              <Button
                type="submit"
                variant="secondary"
                className={cn(!input ? "opacity-50 hover:cursor-not-allowed" : "hover:to-teal-700", "h-9 w-9")}
              >
                <ArrowUp className="!size-5" />
              </Button>
            </div>
          </form>
        </div>
        <div className="bg-background bg-[url(../public/noise.png)] bg-repeat mx-auto w-full h-5" />
      </div>
    </div>
  );
}