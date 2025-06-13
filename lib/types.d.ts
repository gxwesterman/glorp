export type Message = {
  id: string;
  chatId: string;
  text: string;
  type: string,
  status?: string,
}

export type Chat = {
  id: string;
  urlId: string;
  title: string;
  messages: Message[];
};