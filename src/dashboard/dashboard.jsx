import React, { useState, useEffect } from 'react';
import './app.css';

export function Dashboard({ user }) {
    const [transaction1, setTransaction1] = useState(0);
    const [transaction2, setTransaction2] = useState(0);
    const [progress, setProgress] = useState(0);
    const [goals, setGoals] = useState([
        { name: 'Emergency Fund', goal: 1000, progress: 0 }
    ]);

    useEffect(() => {
        const storedTransaction1 = localStorage.getItem('transaction1');
        const storedTransaction2 = localStorage.getItem('transaction2');
        const storedProgress = localStorage.getItem('progress');

        if (storedTransaction1) setTransaction1(parseFloat(storedTransaction1));
        if (storedTransaction2) setTransaction2(parseFloat(storedTransaction2));
        if (storedProgress) setProgress(parseFloat(storedProgress));
    }, []);

    const addNewGoal = () => {
        setGoals([...goals, { name: 'New Goal', goal: 1000, progress: 0 }]);
    };

    return (  
    <main className="container-fluid bg-tan p-5">
        <div className="row gy-3">
            <div className="col-md-6 col-lg-6 d-flex flex-column">
                <div className="bg-green p-3 text-black text-center rounded shadow-sm flex-grow-1">
                    <h1>{user}</h1>
                </div>
                <div className="bg-green mt-3 text-black text-center rounded shadow-sm p-4 flex-grow-1">
                    <h3>Recent Transactions</h3>
                    <ul>
                        <li>Transaction 1: ${transaction1.toFixed(2)}</li>
                        <li>Transaction 2: ${transaction2.toFixed(2)}</li>
                    </ul>
                </div>
                <div className="bg-green mt-3 text-black text-center rounded shadow-sm p-4 flex-grow-1" id="graph-placeholder">
                    <p>Recent Transaction Graph will be displayed here</p>
                </div>
            </div>
    
            <div className="col-md-6 col-lg-3 d-flex flex-column">
                <div className="bg-green p-4 rounded shadow-sm flex-grow-1 d-flex flex-column">
                    <h2 className="text-center text-dark">Budgeting Goals</h2>
                    {goals.map((goal, index) => (
                        <div key={index} className="goal mb-4 flex-grow-1">
                            <h4 className="text-primary">{goal.name}</h4>
                            <p>Goal: ${goal.goal}</p>
                            <div className="progress" style={{ height: "20px" }}>
                                <div className="progress-bar bg-success" style={{ width: `${goal.progress}%`}}></div>
                            </div>
                            <p>Progress: ${goal.progress * 10} / ${goal.goal}</p>
                        </div>
                    ))}
                    <button className="btn btn-primary w-100 mt-auto" onClick={addNewGoal}>Add New Goal</button>
                </div>
            </div>
    
            <div className="col-md-6 col-lg-3 d-flex flex-column">
                <div id="chat-box-placeholder" className="bg-white p-4 rounded shadow-sm d-flex flex-column h-100">
                    <div className="bg-primary text-white p-3 text-center rounded-top">
                        Chat Box
                    </div>
                    <div className="flex-grow-1 p-3 overflow-auto">
                        <div className="message mb-3">
                            <div className="bg-light p-2 rounded">
                                Hello! This is a placeholder for chat messages.
                            </div>
                        </div>
                        <div className="message mb-3 text-end">
                            <div className="bg-primary text-white p-2 rounded">
                                Hi! Thanks for the placeholder!
                            </div>
                        </div>
                    </div>
                    <div className="d-flex p-2 border-top">
                        <input type="text" className="form-control me-2" placeholder="Type a message..."/>
                        <button className="btn btn-primary">➤</button>
                    </div>
                </div>
            </div>
        </div>
    </main>
    );
}