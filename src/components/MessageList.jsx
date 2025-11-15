import React from "react";
import { useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";

export default function MessageList({ messages }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((message, index) => (
        <ChatMessage key={index} message={message} />
      ))}
      <div ref={messagesEndRef}></div>
    </div>
  );
}
