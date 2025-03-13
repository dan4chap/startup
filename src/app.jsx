import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes, useNavigate } from 'react-router-dom'; // Import useNavigate
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { Accounts } from './accounts/accounts';
import { Navbar, Nav, Container } from 'react-bootstrap';

function AppContent() {
    const [userName, setUser] = React.useState(localStorage.getItem('userName') || '');
    const navigate = useNavigate(); // useNavigate is called inside the component

    // Logout function inside the AppContent component
    const logout = (event) => {
        event.preventDefault(); // Prevent default link behavior
        console.log('Logout function called'); // Verify if this is being logged unexpectedly

        
        fetch(`/api/auth/logout`, {
            method: 'delete',
        })
            .catch(() => {
            // Logout failed. Assuming offline
            })
            .finally(() => {
            localStorage.removeItem('userName');
            setUser(''); // Reset user state
            });
        navigate('/'); // Navigate to the home page
    };

    return (
        <div className="app">
            <header>
                <Navbar className="colorAccent" expand="lg">
                    <Container className="justPadding">
                    {/* Brand aligned to the left */}
                    <Navbar.Brand as={NavLink} to="/dashboard" className="me-auto">
                        Easy Expenses
                    </Navbar.Brand>

                    {/* Toggler button for mobile */}
                    <Navbar.Toggle aria-controls="navbarNavAltMarkup" />

                    {/* Nav items aligned to the right */}
                    <Navbar.Collapse id="navbarNavAltMarkup">
                        <Nav className="ms-auto">
                        {userName ? (
                            <Nav.Link as={NavLink} to="/" onClick={logout}>
                            Logout
                            </Nav.Link>
                        ) : (
                            <Nav.Link as={NavLink} to="/">
                            Login
                            </Nav.Link>
                        )}
                        {userName && (
                            <>
                            <Nav.Link as={NavLink} to="/dashboard">
                                Dashboard
                            </Nav.Link>
                            <Nav.Link as={NavLink} to="/accounts">
                                Connected Accounts
                            </Nav.Link>
                            </>
                        )}
                        </Nav>
                    </Navbar.Collapse>
                    </Container>
                </Navbar>
                </header>

            <Routes>
                <Route path='/' element={<Login setUser={setUser} />} exact />
                <Route path='/dashboard' element={<Dashboard user={userName} />} />
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
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <AppContent />
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