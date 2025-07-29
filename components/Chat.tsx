"use client"

import Messages from "@/components/Messages";
import { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import Copy from "@/components/Copy";
import { usePathname } from "next/navigation";
import { useChat } from "@/contexts/ChatContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import NewChat from "@/components/NewChat";

export default function Chat() {
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { chat, chatKey, input } = useChat();
  const prevPathname = useRef(pathname);
  const prevMessageCount = useRef(chat.messages.length);

   useEffect(() => {
    if (!messagesRef.current) return;

    const hydrateCodeBlock = (el: Element) => {
      if (el.hasAttribute('data-hydrated')) return;
      if (el.getAttribute('data-status') !== 'done') return;

      el.setAttribute('data-hydrated', 'true');
      const code = decodeURIComponent(el.getAttribute('data-code') ?? "");
      const copy = el.querySelector('.code-copy');
      if (!copy) return;
      const root = createRoot(copy);
      root.render(
        <Copy content={code} />
      );
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            hydrateCodeBlock(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      {
        root: scrollRef.current,
        threshold: 0.1,
      }
    );

    const io = observer;

    const mutationObserver = new MutationObserver(() => {
      const codeBlocks = messagesRef.current!.querySelectorAll('[data-code]');
      codeBlocks.forEach((el) => {
        if (
          !el.hasAttribute('data-hydrated') &&
          el.getAttribute('data-status') === 'done'
        ) {
          io.observe(el);
        }
      });
    });

    const initialCodeBlocks = messagesRef.current.querySelectorAll('[data-code]');
    initialCodeBlocks.forEach((el) => {
      if (
        !el.hasAttribute('data-hydrated') &&
        el.getAttribute('data-status') === 'done'
      ) {
        io.observe(el);
      }
    });

    mutationObserver.observe(messagesRef.current, {
      childList: true,
      subtree: true,
    });

    return () => {
      mutationObserver.disconnect();
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!scrollRef.current) return;
    document.title = chat.title;

    let behavior: ScrollBehavior = "instant";

    if (pathname !== prevPathname.current) {
      behavior = "instant";
    } else if (chat.messages.length !== prevMessageCount.current) {
      behavior = "smooth";
    }

    const scrollArea = scrollRef.current?.querySelector(
      '[data-radix-scroll-area-viewport]'
    )
    if (scrollArea) {
      scrollArea.scroll({
        top: scrollArea.scrollHeight,
        behavior,
      })
    }

    prevPathname.current = pathname;
    prevMessageCount.current = chat.messages.length;
  }, [pathname, chat.messages.length]);

  if (pathname === "/chat" && !input) {
    return <NewChat key={chatKey} />;
  }

  return (
    <div className="absolute bottom-0 top-0 w-full">
      <ScrollArea
        ref={scrollRef}
        className="absolute inset-0 h-full"
      >
        <div ref={messagesRef} className="mx-auto flex w-full max-w-3xl flex-col space-y-12 p-4 mb-[144px]">
          <Messages />
        </div>
      </ScrollArea>
    </div>
  );
}
