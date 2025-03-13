import React from 'react';
import './app.css';
import { BrowserRouter, Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';

export function Login({ setUser }) {
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