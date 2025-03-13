import React from 'react';
import './app.css';
import { BrowserRouter, Routes, Route, NavLink, useNavigate } from 'react-router-dom';

export function Login({ setUser }) {
    const [text, setText] = React.useState('');
    const navigate = useNavigate();
    const [userName, setUserName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [displayError, setDisplayError] = React.useState(null);

    async function loginUser() {
        loginOrCreate(`/api/auth/login`);
    }

    async function createUser() {
        loginOrCreate(`/api/auth/create`);
    }

    function textChange(e) {
        setText(e.target.value);
    }

    async function loginOrCreate(endpoint) {
        try {
            const response = await fetch(endpoint, {
            method: 'post',
            body: JSON.stringify({ email: userName, password: password }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            });
        
            if (response?.status === 200) {
                const body = await response.json();
                console.log('Login/create response:', body);
                localStorage.setItem('userName', body.email); // Store user email
                setUser(body.email); // Update user state
                navigate('/dashboard');
            } else {
                const body = await response.json();
                setDisplayError(`⚠ Error: ${body.msg}`);
            }
        } catch (error) {
            console.error('Error during login/create:', error);
        }
    }
        

    return (  
    <main className="container-fluid">
    <div className="login-background">
        <div className="container d-flex justify-content-center align-items-center" type="page-format">
        <div className="form-container">
                <div className="mb-4">
                    <label htmlFor="exampleInputEmail1" className="form-label">Login</label>
                    <input type="email" className="form-control form-control-xl fs-2" id="exampleInputEmail1" aria-describedby="emailHelp" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder='your@email.com'/>
                </div>
                <div className="mb-4">
                    <input type="password" className="form-control form-control-xl fs-2" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)} placeholder='password'/>
                    <div href="#" id="passwordHelp" className="form-text">Reset your password</div>
                </div>
                <button type="submit" className="btn btn-primary btn-lg btn-custom" onClick={loginUser}>Submit</button>
                <button type="submit" className="btn btn-primary btn-lg btn-custom" onClick={createUser}>Create</button>
        </div>
    </div>
    </div>
    </main>
    );
}