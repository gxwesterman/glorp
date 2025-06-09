export type Chat = {
  id: string;
  urlId: string;
  title: string;
  messages: {
    id: string;
    text: string;
    type: 'question' | 'answer';
    createdAt: Date;
  }[];
};