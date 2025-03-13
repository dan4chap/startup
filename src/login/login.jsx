import React from 'react';
import './app.css';
import { BrowserRouter, Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';

export function Login() {
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const [authState, setAuthState] = React.useState(AuthState.Unknown);

  React.useEffect(() => {
    if (userName) {
      setAuthState(AuthState.Authenticated);
    } else {
      setAuthState(AuthState.Unauthenticated);
    }
  }, [userName]);

  function onAuthChange(userName, authState) {
    setUserName(userName);
    setAuthState(authState);
  }

  return (
    <div className="login-background">
      {authState === AuthState.Authenticated && (
        <Authenticated
          userName={userName}
          onLogout={() => onAuthChange('', AuthState.Unauthenticated)}
        />
      )}
      {authState === AuthState.Unauthenticated && (
        <Unauthenticated
          userName={userName}
          onLogin={(loginUserName) => onAuthChange(loginUserName, AuthState.Authenticated)}
        />
      )}
    </div>
  );
}
