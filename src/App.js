import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('login');

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('login');
  };

  return (
    <div className="App">
      {currentView === 'login' && <Login onLogin={handleLogin} />}
      {currentView === 'dashboard' && <Dashboard user={user} onLogout={handleLogout} setCurrentView={setCurrentView} />}
    </div>
  );
}

export default App;