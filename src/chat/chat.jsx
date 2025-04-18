import React from 'react';
import ReactDOM from 'react-dom/client';



export function Chat({ webSocket }) {
    const [name, setName] = React.useState('');

    return (
    <main>
        <Name updateName={setName} />
        <Message name={name} webSocket={webSocket} />
        <Conversation webSocket={webSocket} />
    </main>
    );
}

export function Name({ updateName }) {
    return (
    <div>
        <div className='name'>
            <fieldset id='name-controls'>
            <legend>My Name</legend>
            <input onChange={(e) => updateName(e.target.value)} id='my-name' type='text' />
            </fieldset>
        </div>
    </div>
    );
}

export function Message({ name, webSocket }) {
    const [message, setMessage] = React.useState('');

    function doneMessage(e) {
        if (e.key === 'Enter') {
        sendMsg();
        }
    }

    function sendMsg() {
        webSocket.sendMessage(name, message);
        setMessage('');
    }

    const disabled = name === '' || !webSocket.connected;
    return (
    <div>
        <fieldset id='chat-controls'>
            <legend>Chat</legend>
            <input disabled={disabled} onKeyDown={(e) => doneMessage(e)} value={message} onChange={(e) => setMessage(e.target.value)} type='text' />
            <button disabled={disabled || !message} onClick={sendMsg}>
            Send
            </button>
        </fieldset>
    </div>
    );
}


export function Conversation({ webSocket }) {
    const [chats, setChats] = React.useState([]);

    React.useEffect(() => {
        const observer = (chat) => {
            setChats((prevMessages) => [...prevMessages, chat]);
        };

        webSocket.addObserver(observer);

        return () => {
            // Remove observer when component unmounts or re-renders
            webSocket.observers = webSocket.observers.filter((obs) => obs !== observer);
        };
    }, [webSocket]);

    const chatEls = chats.map((chat, index) => (
        <div key={index}>
            <span className={chat.event}>{chat.from}</span> {chat.msg}
        </div>
    ));

    return <div id='chat-text'>{chatEls}</div>;
}



class ChatClient {
    observers = [];
    connected = false;
    
    constructor() {
        // Adjust the webSocket protocol to what is being used for HTTP
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
    
        // Display that we have opened the webSocket
        this.socket.onopen = (event) => {
        this.notifyObservers('system', 'Chat', 'connected');
        this.connected = true;
        };
    
        // Display messages we receive from our friends
        this.socket.onmessage = async (event) => {
        const text = await event.data.text();
        const chat = JSON.parse(text);
        this.notifyObservers('received', chat.name, chat.msg);
        };
    
        // If the webSocket is closed then disable the interface
        this.socket.onclose = (event) => {
        this.notifyObservers('system', 'Chat', 'disconnected');
        this.connected = false;
        };
    }
    
    // Send a message over the webSocket
    sendMessage(name, msg) {
        this.notifyObservers('sent', 'me', msg);
        this.socket.send(JSON.stringify({ name, msg }));
    }
    
    addObserver(observer) {
        this.observers.push(observer);
    }
    
    notifyObservers(event, from, msg) {
        this.observers.forEach((h) => h({ event, from, msg }));
    }
}
export default Chat;
export { ChatClient };
//const root = ReactDOM.createRoot(document.getElementById('root'));
//root.render(<Chat webSocket={new ChatClient()} />);