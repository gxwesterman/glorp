"use client"

import Messages from "@/components/Messages";
import { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import Copy from "@/components/Copy";
import { usePathname } from "next/navigation";

export default function Chat() {
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

   useEffect(() => {
    if (!messagesRef.current) return;

    const hydrateCodeBlock = (el: Element) => {
      if (el.hasAttribute('data-hydrated')) return;
      if (el.getAttribute('data-status') !== 'done') return;

      el.setAttribute('data-hydrated', 'true');
      const code = decodeURIComponent(el.getAttribute('data-code') ?? "");
      const language = el.getAttribute('data-lang') ?? "";
      const header = el.querySelector('.code-header');
      const copy = el.querySelector('.code-copy');
      if (!copy || !header) return;
      header.innerHTML = language;
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
    scrollRef.current.scroll({
      top: scrollRef.current.scrollHeight,
      behavior: "instant"
    });
  }, [pathname]);

  return (
    <div className="absolute bottom-0 top-0 w-full">
      <div
        ref={scrollRef}
        className="absolute inset-0 overflow-y-scroll pt-3.5 pb-[144px]"
      >
        <div ref={messagesRef} className="mx-auto flex w-full max-w-3xl flex-col space-y-12 p-4 pb-8">
          <Messages />
        </div>
      </div>
    </div>
  );
}
