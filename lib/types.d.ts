export type Message = {
  id: string;
  chatId: string;
  text: string;
  type: string,
}

export type Chat = {
  id: string;
  urlId: string;
  title: string;
  messages: Message[];
};