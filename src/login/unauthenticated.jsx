import React from 'react';
import Button from 'react-bootstrap/Button';
import { MessageDialog } from './messageDialog';
import { useNavigate } from 'react-router-dom';


export function Unauthenticated(props) {
  const navigate = useNavigate();
  const [userName, setUserName] = React.useState(props.userName);
  const [password, setPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);

  async function loginUser() {
    loginOrCreate(`/api/auth/login`);
  }

  async function createUser() {
    loginOrCreate(`/api/auth/create`);
  }

  async function loginOrCreate(endpoint) {
    const response = await fetch(endpoint, {
      method: 'post',
      body: JSON.stringify({ email: userName, password: password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (response?.status === 200) {
      localStorage.setItem('userName', userName);
      props.onLogin(userName);
      navigate('/dashboard');
    } else {
      const body = await response.json();
      setDisplayError(`⚠ Error: ${body.msg}`);
    }
  }

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="form-container">
        <h2 className="form-label">Login</h2>
        <input
          className="form-control form-control-xl"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder='your@email.com'
        />
        <input
          className="form-control form-control-xl mt-1"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='password'
        />
        <Button className="btn-custom mt-2 p-1" onClick={loginUser}>Submit</Button>
        <Button className="btn-custom mt-1 p-1" onClick={createUser}>Create</Button>
        <Button variant="link">Reset your password</Button>
        {displayError && <MessageDialog message={displayError} />}
      </div>
    </div>
  );
}
