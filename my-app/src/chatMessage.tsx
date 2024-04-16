import React, { useEffect, useState } from "react";
import { useSocket } from "./providers/SocketProvider";

export function Message({ message }: { message: string }) {
  return (
    <div>
      <div>{message}</div>
    </div>
  );
}

function ChatMessage() {
  const [messages, setMessages] = useState([]);

  const socket = useSocket();
  useEffect(() => socket.onMessage((message) => {
    setMessages((messages) => [...messages, message]);
  }), [socket]);

  return (
    <div>
      {messages.map((message, index) => (
        <Message key={index} message={message} />
      ))}
    </div>
  );
}

export default ChatMessage;