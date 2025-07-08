import { db } from "@/lib/instant";
import { id } from "@instantdb/react";
import { Chat } from "@/lib/types";
import { useChat } from "@/contexts/ChatContext";

export function startChat(title: string, userId: string) {
  const chatId = id();
  db.transact(
    db.tx.chats[chatId].update({
      userId,
      urlId: chatId,
      title
    }),
  );
  return chatId;
}

export function addMessage(text: string, html: string, type: string, chatId: string, answerId?: string, status?: string) {
  db.transact(
    db.tx.messages[answerId || id()].update({
      chatId,
      text,
      html,
      type,
      status,
    }).link({ chats: chatId }),
  );
}

export function deleteChat(
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  chat: Chat
) {
  e.stopPropagation();
  db.transact(db.tx.chats[chat.id].delete());
  db.transact(chat.messages.map((m) => db.tx.messages[m.id].delete()));
};

export function editChat(id: string, title: string) {
  db.transact(
    db.tx.chats[id].update({
        title
      }
    )
  )
};