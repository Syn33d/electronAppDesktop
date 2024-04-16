import React, { useState } from "react";
import ChatInput from "./chatInput";
import ChatMessage, { Message } from "./chatMessage";
import './index.css';

function ChatScreen() {
    const [messages, setMessages] = useState<string[]>([]);

    return (
        <div>
            <h1>Chat Screen</h1>
            <div>
                <ChatMessage/>
            </div>
            <ChatInput />
        </div>
    );
}

export default ChatScreen;