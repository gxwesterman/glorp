export type Message = {
  id: string;
  chatId: string,
  text: string,
  type: 'question' | 'answer',
}

export type Chat = {
  id: string;
  urlId: string;
  title: string;
  messages: Message[];
};