import React from 'react';
import './app.css';

export function Login() {
    return (  
    <main className="container-fluid">
    <div className="login-background">
        <div className="container d-flex justify-content-center align-items-center" type="page-format">
        <div className="form-container">
            <form>
                <div className="mb-4">
                    <label htmlFor="exampleInputEmail1" className="form-label">Login</label>
                    <input type="email" className="form-control form-control-xl fs-2" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email"/>
                </div>
                <div className="mb-4">
                    <input type="password" className="form-control form-control-xl fs-2" id="exampleInputPassword1" placeholder="Password"/>
                    <div href="#" id="passwordHelp" className="form-text">Reset your password</div>
                </div>
                <button type="submit" className="btn btn-primary btn-lg btn-custom">Submit</button>
            </form>
        </div>
    </div>
    </div>
    </main>
    );
}