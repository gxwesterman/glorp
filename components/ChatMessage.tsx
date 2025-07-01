import { memo } from "react";
import Branch from "@/components/Branch";
import Copy from "@/components/Copy";
import { Message, Chat } from "@/lib/types";

export const ChatMessage = memo(function ChatMessage({ message, chat, index }: {
  message: Message,
  chat: Chat,
  index: number
}) {
  return (
    <div className="flex flex-col justify-start group">
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
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.message.id === nextProps.message.id &&
    prevProps.message.status === nextProps.message.status &&
    prevProps.message.html === nextProps.message.html &&
    prevProps.message.text === nextProps.message.text
  );
});