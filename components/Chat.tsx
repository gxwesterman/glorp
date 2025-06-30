"use client"

import Messages from "@/components/Messages";
import { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import Copy from "@/components/Copy";

export default function Chat() {
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      if (!scrollRef.current) return;
      const codeBlocks = scrollRef.current.querySelectorAll('[data-code]');
      if (!codeBlocks?.length) return;

      codeBlocks.forEach((el) => {
        if (el.hasAttribute('data-hydrated')) return;
        if (el.getAttribute('data-status') !== 'done') return;
        el.setAttribute('data-hydrated', 'true');
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
      scrollRef.current.scroll({
        top: scrollRef.current.scrollHeight,
        behavior: "instant"
      });
    });

    observer.observe(document, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);
    
  return (
    <div className="absolute bottom-0 top-0 w-full">
      <div
        ref={scrollRef}
        className="absolute inset-0 overflow-y-scroll pt-3.5 pb-[144px]"
      >
        <Messages />
      </div>
    </div>
  );
}
