import React, { useState, useEffect } from 'react';
import './app.css';
import Chat, {ChatClient} from './chat';

export function ChatPage() {
    const [chatClient] = useState(new ChatClient());

    return (  
    <main>
    <Chat webSocket={chatClient} />
    </main>
    );
}