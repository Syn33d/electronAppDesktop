import React, { useState } from "react";
import ChatInput from "./chatInput";
import ChatMessage from "./chatMessage";
import './index.css';
import ChatList from "./chatList";

function ChatScreen() {
    const [messages, setMessages] = useState<string[]>([]);
    const [currentChannel, setCurrentChannel] = useState<string | null>(null);
    const channels = ['channel1', 'channel2', 'channel3']; // Replace with your actual channels

    return (
        <div>
            <h1>Chat Screen</h1>
            <div>
                {channels.map(channel => (
                    <button key={channel} className={`channel-button ${channel === currentChannel ? 'active' : ''}`} onClick={() => setCurrentChannel(channel)}>
                        {channel}
                    </button>
                ))}
            </div>
            <div>
                {currentChannel && <ChatMessage channelId={currentChannel}/>}
            </div>
            {currentChannel && <ChatInput channelId={currentChannel} />}
            {/* <ChatList channels={channels} activeChannel={currentChannel || ''} /> */}
        </div>
    );
}

export default ChatScreen;