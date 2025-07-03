import { memo, useMemo } from "react";
import Branch from "@/components/Branch";
import Copy from "@/components/Copy";
import { Message, Chat } from "@/lib/types";

const Chunk = memo(({ html }: { html: string }) => (
  <div dangerouslySetInnerHTML={{ __html: html }} />
), (prev, next) => prev.html === next.html);

export const ChatMessage = memo(function ChatMessage({ message, chat, index }: {
  message: Message,
  chat: Chat,
  index: number
}) {

  const chunks = useMemo(() => message.html.split('<!-- __BLOCK__ -->'), [message.html]);
  return (
    <div className="flex flex-col justify-start group">
      <div className="relative w-full max-w-full break-words">
        <div className="space-y-4 prose max-w-none prose-pre:m-0 prose-pre:bg-transparent prose-teal prose-pre:p-0 dark:prose-invert">
          {chunks.map((chunk, index) => (
            <Chunk key={index} html={chunk} />
          ))}
        </div>
      </div>
      <div className="space-x-1 flex">
        <Branch className="opacity-0 group-hover:opacity-100" chat={chat} index={index} />
        <Copy className="opacity-0 group-hover:opacity-100" content={message.text} />
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.message.id === nextProps.message.id &&
    prevProps.message.status === nextProps.message.status &&
    prevProps.message.html === nextProps.message.html &&
    prevProps.message.text === nextProps.message.text
  );
});