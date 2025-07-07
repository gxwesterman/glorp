import { db } from "@/lib/instant";
import { id } from "@instantdb/react";
import { Chat } from "@/lib/types";

export function startChat(title: string) {
  const cookies = document.cookie.split(';');
  const userIdCookie = cookies.find(cookie => cookie.trim().startsWith('g6_session='));
  const extractedUserId = userIdCookie ? userIdCookie.split('=')[1].trim() : '';
  const chatId = id();
  db.transact(
    db.tx.chats[chatId].update({
      urlId: chatId,
      sessionId: extractedUserId,
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