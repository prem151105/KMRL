import React, { useState } from 'react';
import './Login.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'demo') {
      onLogin({ role: 'admin', name: 'Administrator' });
    } else if (username === 'controller' && password === 'demo') {
      onLogin({ role: 'controller', name: 'Station Controller' });
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>KMRL Intelligent Document Management</h1>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <select value={username} onChange={(e) => setUsername(e.target.value)}>
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="controller">Controller</option>
            </select>
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="demo"
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;