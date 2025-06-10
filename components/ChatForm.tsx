'use client'

import { db } from '@/lib/instant';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import React, { useEffect, useRef, useState } from "react";
import { id } from '@instantdb/react';
import { usePathname } from 'next/navigation';
import { ArrowUp } from 'lucide-react';

export default function ChatForm({
  messages,
}: {
  messages: { [x: string]: string; id: string; }[],
}) {
  const pathname = usePathname();
  let pageChatId = (pathname.split('/').pop() || '');
  const [input, setInput] = useState('');
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [streamingDone, setStreamingDone] = useState(true);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const requestRef = useRef<number>(null);
  const [answerId, setAnswerId] = useState('');
  const [output, setOutput] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    const streamText = () => {
      if (currentIndex < text.length) {
        setOutput([...output, <span key={`${Date.now()}`}>{text[currentIndex]}</span>]);
        //updateMessage(answerId, [...output, <span key={`${Date.now()}`}>{buffer}</span>]);
        setCurrentIndex(currentIndex + 1);
      }
    };

    if (text.length === 0) return;
    if (streamingDone && currentIndex === text.length) {
      setOutput([]);
      setText('');
      setCurrentIndex(0);
    };

    const startStreaming = () => {
      requestRef.current = requestAnimationFrame(() => {
        streamText();
      });
    };

    startStreaming();

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [text, currentIndex, answerId, setOutput, streamingDone, output]);

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
    }
    const newAnswerId = id();
    setAnswerId(newAnswerId);
    setInput('');
    setStreamingDone(false);
    try {
        const response = await fetch('/api', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: input,
            messages: messages,
            chatId: pageChatId,
          }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to get AI response');
        }

        if (response.body) {
          const reader = response.body.getReader();
          const decoder = new TextDecoder();
          let done = false;
          let result = '';
            
          while (!done) {
            const { value, done: readerDone } = await reader.read();
            done = readerDone;
            result += decoder.decode(value, { stream: true });
            setText(result);
          }
          setStreamingDone(true);
        }

      } catch (error) {
        console.error('Error:', error);
      }
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