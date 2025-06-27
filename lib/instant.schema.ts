// instant.schema.ts
import { i } from '@instantdb/core';

const schema = i.schema({
  entities: {
    $users: i.entity({
      email: i.string().unique().indexed(),
    }),
    chats: i.entity({
      urlId: i.string(),
      sessionId: i.string(),
      title: i.string(),
    }),
    messages: i.entity({
      chatId: i.string(),
      text: i.string(),
      html: i.string(),
      type: i.string(),
      status: i.string().optional(),
    }),
  },
  links: {
    messageChat: {
      forward: { on: 'messages', has: 'one', label: 'chats' },
      reverse: { on: 'chats', has: 'many', label: 'messages' },
    }
  }
});

export default schema;