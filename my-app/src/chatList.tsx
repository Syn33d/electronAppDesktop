import React, { useEffect, useState } from "react";
import { useSocket } from "./providers/SocketProvider";

const ChatList = ({ channels, activeChannel }: { channels: string[], activeChannel: string }) => {
  console.log("Rendering ChatList")
  const [newMessageChannels, setNewMessageChannels] = useState([]);
  const socket = useSocket();
  console.log('Socket in ChatList:', socket);

  useEffect(() => {
    const removeListener = socket.onMessage('allChannel', (message) => {
      console.log("Setting up message listener for allChannels");

      if (message.channel !== activeChannel) {
        setNewMessageChannels((channels) => [...channels, message.channel]);
      }
    });

    return () => {
      console.log("Cleaning up socket message listeners");
      removeListener();
    };
  }, [socket, activeChannel]);

  return (
    <div>
      {channels.map((channel) => (
        <div key={channel}>
          <h2>{channel}</h2>
          {newMessageChannels.includes(channel) && <p>New message!</p>}
        </div>
      ))}
    </div>
  );
};

export default ChatList;