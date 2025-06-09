import { Chat } from "@/lib/types";

export const chats: Chat[] = [
  {
    id: "chat-1",
    urlId: "chat-one",
    title: "Chat about JavaScript",
    messages: [
      {
        id: "msg-1",
        text: "What is the difference between var, let, and const?",
        type: "question",
        createdAt: new Date("2025-06-01T09:00:00Z")
      },
      {
        id: "msg-2",
        text: "The difference is mainly in scope. `var` is function-scoped, while `let` and `const` are block-scoped.",
        type: "answer",
        createdAt: new Date("2025-06-01T09:05:00Z")
      },
      {
        id: "msg-3",
        text: "Are there any scenarios where you would prefer to use `var` over `let` or `const`?",
        type: "question",
        createdAt: new Date("2025-06-01T09:10:00Z")
      },
      {
        id: "msg-4",
        text: "`var` is less commonly used nowadays, but it may be preferred in cases where you need function-scoped variables, though it's generally better to use `let` or `const`.",
        type: "answer",
        createdAt: new Date("2025-06-01T09:15:00Z")
      },
      {
        id: "msg-5",
        text: "What about `const`? When is it appropriate to use?",
        type: "question",
        createdAt: new Date("2025-06-01T09:20:00Z")
      },
      {
        id: "msg-6",
        text: "`const` is used when you want to declare a variable whose value will not be reassigned after initialization. However, it doesn't make the value immutable — for example, objects declared with `const` can still have their properties modified.",
        type: "answer",
        createdAt: new Date("2025-06-01T09:25:00Z")
      }
    ]
  },
  {
    id: "chat-2",
    urlId: "chat-two",
    title: "React Hooks Discussion",
    messages: [
      {
        id: "msg-7",
        text: "What are React hooks and why are they important?",
        type: "question",
        createdAt: new Date("2025-06-02T10:00:00Z")
      },
      {
        id: "msg-8",
        text: "React hooks are functions that let you use state and other React features without writing a class component. They allow you to manage state, side effects, and context in a more functional way.",
        type: "answer",
        createdAt: new Date("2025-06-02T10:05:00Z")
      },
      {
        id: "msg-9",
        text: "Can you explain the `useState` hook in detail?",
        type: "question",
        createdAt: new Date("2025-06-02T10:10:00Z")
      },
      {
        id: "msg-10",
        text: "`useState` is a hook that allows you to add state to functional components. It returns an array with two elements: the current state and a function to update it.",
        type: "answer",
        createdAt: new Date("2025-06-02T10:15:00Z")
      },
      {
        id: "msg-11",
        text: "What happens when you call the setter function returned by `useState`?",
        type: "question",
        createdAt: new Date("2025-06-02T10:20:00Z")
      },
      {
        id: "msg-12",
        text: "Calling the setter function causes React to re-render the component with the new state value. This re-render is scheduled asynchronously, so React batches multiple updates for performance.",
        type: "answer",
        createdAt: new Date("2025-06-02T10:25:00Z")
      }
    ]
  },
  {
    id: "chat-3",
    urlId: "chat-three",
    title: "General Web Development",
    messages: [
      {
        id: "msg-13",
        text: "How do I optimize the performance of my web application?",
        type: "question",
        createdAt: new Date("2025-06-03T11:00:00Z")
      },
      {
        id: "msg-14",
        text: "You can optimize performance by lazy-loading assets, minimizing HTTP requests, and using efficient algorithms. Also, make sure to use the `async` and `defer` attributes for script tags.",
        type: "answer",
        createdAt: new Date("2025-06-03T11:05:00Z")
      },
      {
        id: "msg-15",
        text: "What about CSS and JavaScript bundling?",
        type: "question",
        createdAt: new Date("2025-06-03T11:10:00Z")
      },
      {
        id: "msg-16",
        text: "Bundling CSS and JavaScript files reduces the number of requests made to the server. Tools like Webpack or Parcel allow you to bundle, minify, and even split your code for optimal delivery.",
        type: "answer",
        createdAt: new Date("2025-06-03T11:15:00Z")
      },
      {
        id: "msg-17",
        text: "How can I reduce the time it takes for the page to load initially?",
        type: "question",
        createdAt: new Date("2025-06-03T11:20:00Z")
      },
      {
        id: "msg-18",
        text: "To reduce the initial load time, you can prioritize loading critical resources, defer non-essential scripts, and use techniques like server-side rendering or static site generation.",
        type: "answer",
        createdAt: new Date("2025-06-03T11:25:00Z")
      }
    ]
  }
];
