import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { Accounts } from './accounts/accounts';

export default function App() {
    const [user, setUser] = React.useState(localStorage.getItem('user') || null);

    // Function to handle logout
    const handleLogout = () => {
        localStorage.removeItem('user'); // Remove user from localStorage
        setUser(null); // Clear the user state
    };

    return (
        <BrowserRouter>
            <div className="app">
                <header>
                    <nav className="navbar navbar-expand-lg navbar-light">
                        <NavLink className="navbar-brand" to="">Easy Expenses</NavLink>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <ul className="navbar-nav">
                                <li className="nav-item active">
                                    {user ? (
                                        <NavLink className="nav-link" to="/" onClick={handleLogout}>Logout</NavLink>
                                    ) : (
                                        <NavLink className="nav-link" to="/">Login</NavLink>
                                    )}
                                </li>
                                {user && (
                                    <>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/accounts">Connected Accounts</NavLink>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </nav>
                </header>

                <Routes>
                    <Route path='/' element={<Login setUser={setUser} />} exact />
                    <Route path='/dashboard' element={<Dashboard user={user} />} />
                    <Route path='/accounts' element={<Accounts />} />
                </Routes>

                <footer className="footer text-center">
                    <div className="container p-2">
                        <section className="mb-1 d-flex align-items-center justify-content-center gap-3">
                            <a href="https://github.com/dan4chap/startup" target="_blank" rel="noopener noreferrer">
                                <img src="github_icon.png" alt="GitHub Icon" style={{ width: "30px", height: "30px" }} />
                            </a>
                            <span className="footer-name">Daniel Chapdelaine</span>
                        </section>
                    </div>
                </footer>
            </div>
        </BrowserRouter>
    );
}

function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}

/*
<Routes>
    <Route path='/' element={<Login />} exact />
    <Route path='/play' element={<Play />} />
    <Route path='/scores' element={<Scores />} />
    <Route path='/about' element={<About />} />
    <Route path='*' element={<NotFound />} />
</Routes>
*/