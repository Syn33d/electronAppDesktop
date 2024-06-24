import React, { useState } from 'react';
import './index.css';
import { useSocket } from './providers/SocketProvider';

const ChatInput = ({ channelId }: {channelId: string}) => {
  const [message, setMessage] = useState('');
  const socket = useSocket();

  const sendMessage = (event: any) => {
    event.preventDefault();
    console.log('Sending message:', message);
    socket.emit(channelId, message);
    setMessage('');
  };

  return (
    <form onSubmit={sendMessage}>
      <input
        type="text"
        className="chat-input"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default ChatInput;