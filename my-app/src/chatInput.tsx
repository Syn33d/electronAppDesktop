import React, { useState } from 'react';
import './index.css';
import { useSocket } from './providers/SocketProvider';

function ChatInput() {
    const [message, setMessage] = useState('');
    const socket = useSocket();

    const handleChangeMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.currentTarget.value)
    }

  return (
    <form onSubmit={(event) => {
        event.preventDefault()
        socket.send(message)
        setMessage('')
    }}>
      <input value={message} onChange={handleChangeMessage}/>
      <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Send</button>
    </form>
  );
}

export default ChatInput;