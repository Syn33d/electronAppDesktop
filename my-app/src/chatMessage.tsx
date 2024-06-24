import React, { useEffect, useState } from "react";
import { useSocket } from "./providers/SocketProvider";

export function Message({ message }: { message: string }) {
  return (
    <div>
      <div className="chat-message">{message}</div>
    </div>
  );
}

const ChatMessage = ({ channelId }: { channelId: string }) => {
  const [messages, setMessages] = useState([]);
  const socket = useSocket();

  useEffect(() => {
    const removeListener = socket.onMessage(channelId, (message) => {
      console.log("Received message:", message);
      setMessages((messages) => ({
        ...messages,
        [channelId]: [...(messages[channelId] || []), message],
      }));
    });

    socket.emit('join', channelId);

    return () => {
      console.log("Cleaning up socket message listener");
      removeListener();
    };
  }, [socket, channelId]);

  return (
    <div>
      {(messages[channelId] || []).map((message, index) => (
        <Message key={index} message={`${message.event}: ${message.args ? message.args.join(', ') : ''}`} />
      ))}
    </div>
  );
}

export default ChatMessage;
