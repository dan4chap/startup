import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './app.css';

export function Authenticated(props) {
  const navigate = useNavigate();

  function logout() {
    fetch(`/api/auth/logout`, {
      method: 'delete',
    })
      .catch(() => {
        // Logout failed. Assuming offline
      })
      .finally(() => {
        localStorage.removeItem('userName');
        props.onLogout();
      });
  }

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="form-container">
        <h2 className="form-label">{props.userName}</h2>
        <Button className="btn-custom" onClick={logout}>Logout</Button>
      </div>
    </div>
  );
}
