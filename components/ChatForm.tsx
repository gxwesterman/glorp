'use client'

import { db } from "@/lib/instant";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import React, { useRef, useState } from "react";
import { id } from '@instantdb/react';
import { usePathname } from 'next/navigation';
import { ArrowUp } from 'lucide-react';
import { useChat } from "@/contexts/ChatContext";

function startChat(id: string, title: string) {
  const cookies = document.cookie.split(';');
  const userIdCookie = cookies.find(cookie => cookie.trim().startsWith('g6_session='));
  const extractedUserId = userIdCookie ? userIdCookie.split('=')[1].trim() : '';
  db.transact(
    db.tx.chats[id].update({
      urlId: id,
      sessionId: extractedUserId,
      title
    }),
  );
}

export default function ChatForm() {
  const pathname = usePathname();
  let pageChatId = (pathname.split('/').pop() || '');
  const [input, setInput] = useState('');
  const [streamingDone, setStreamingDone] = useState(true);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { messages, startStream } = useChat();

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
    if (!streamingDone || input === '') {
      return;
    }
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
    }
    if (pageChatId === 'chat') {
        pageChatId = id();
        window.history.pushState({}, '', window.location.href + `/${pageChatId}`);
        startChat(pageChatId, input);
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
    <div className="absolute bottom-0 w-full">
      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col text-center">
        <div className="border border-border relative rounded-t-lg p-2 pb-0 backdrop-blur-lg">
          <form
            onSubmit={handleSubmit}
          >
            <div className="flex flex-grow flex-row items-start">
              <Textarea
                ref={textAreaRef}
                name="message"
                className="font-semibold grow resize-none border-none outline-none text-base shadow-none focus-visible:ring-0 max-h-80"
                placeholder="Type your message here..."
                onKeyDown={handleKeyDown}
                value={input}
                onChange={(e) => handleChange(e.target.value)}
              />
              <Button
                type="submit"
                className="transition-colors font-semibold shadow h-9 w-9"
              >
                <ArrowUp className="!size-5" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}