import React, { useState, useEffect } from 'react';
import GoalManager from './goalmanager';
import './app.css';

export function Dashboard({ user }) {
    let displayName = user.split('@')[0];
    const [transaction1, setTransaction1] = useState(0);
    const [transaction2, setTransaction2] = useState(0);
    const [progress, setProgress] = useState(0);
    const [goals, setGoals] = useState([
        { name: 'Emergency Fund', goal: 1000, progress: 0 }
    ]);
    const [goalName, setGoalName] = useState('');
    const [goalAmount, setGoalAmount] = useState('');
    const [goalProgress, setGoalProgress] = useState('');
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        const storedTransaction1 = localStorage.getItem('transaction1');
        const storedTransaction2 = localStorage.getItem('transaction2');
        const storedProgress = localStorage.getItem('progress');

        if (storedTransaction1) setTransaction1(parseFloat(storedTransaction1));
        if (storedTransaction2) setTransaction2(parseFloat(storedTransaction2));
        if (storedProgress) setProgress(parseFloat(storedProgress));
    }, []);

    const addNewGoal = () => {
        setGoals([...goals, { name: goalName, goal: parseFloat(goalAmount), progress: parseFloat(goalProgress) }]);
        setGoalName('');
        setGoalAmount('');
        setGoalProgress('');
    };

    const removeGoal = (index) => {
        setGoals(goals.filter((_, i) => i !== index));
    };

    const addMessage = () => {
        setMessages([...messages, newMessage]);
        setNewMessage('');
    };

    const fetchGraphData = async () => {
        setIsFetching(true);
        // Simulate a fetch call
        await new Promise(resolve => setTimeout(resolve, 5000));
        setIsFetching(false);
    };

    useEffect(() => {
        fetchGraphData();
    }, []);

    return (  
    <main className="container-fluid bg-tan p-5">
        <div className="row gy-3">
            <div className="col-md-6 col-lg-6 d-flex flex-column">
                <div className="bg-green p-3 text-black text-center rounded shadow-sm flex-grow-1">
                    <h1>Welcome, {displayName}</h1>
                </div>
                <div className="bg-green mt-3 text-black text-center rounded shadow-sm p-4 flex-grow-1">
                    <h3>Recent Transactions</h3>
                    <ul>
                        <li>Transaction 1: ${transaction1.toFixed(2)}</li>
                        <li>Transaction 2: ${transaction2.toFixed(2)}</li>
                    </ul>
                </div>
                <div className="bg-green mt-3 text-black text-center rounded shadow-sm p-4 flex-grow-1" id="graph-placeholder">
                    {isFetching ? (
                        <img className="loadingimg" src="stock_icon.png" alt="Loading..." />
                    ) : (
                        <p>Recent Transaction Graph will be displayed here</p>
                    )}
                </div>
            </div>

            <GoalManager user={user} />
    
            <div className="col-md-6 col-lg-3 d-flex flex-column">
                <div id="chat-box-placeholder" className="bg-white p-4 rounded shadow-sm d-flex flex-column h-100">
                    <div className="bg-primary text-white p-3 text-center rounded-top">
                        Chat Box
                    </div>
                    <div className="flex-grow-1 p-3 overflow-auto">
                        {messages.map((message, index) => (
                            <div key={index} className={`message mb-3 ${index % 2 === 0 ? '' : 'text-end'}`}>
                                <div className={`bg-${index % 2 === 0 ? 'light' : 'primary'} text-${index % 2 === 0 ? 'black' : 'white'} p-2 rounded`}>
                                    {message}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="d-flex p-2 border-top">
                        <input type="text" className="form-control me-2" placeholder="Type a message..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
                        <button className="btn btn-primary" onClick={addMessage}>➤</button>
                    </div>
                </div>
            </div>
        </div>
    </main>
    );
}