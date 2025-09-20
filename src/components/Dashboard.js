import React, { useState } from 'react';
import './Dashboard.css';
import Upload from './Upload';
import Library from './Library';
import Analytics from './Analytics';

function Dashboard({ user, onLogout, setCurrentView }) {
  const [activeView, setActiveView] = useState('upload');

  const renderView = () => {
    switch (activeView) {
      case 'upload':
        return <Upload user={user} />;
      case 'library':
        return <Library user={user} />;
      case 'analytics':
        return <Analytics user={user} />;
      default:
        return <Upload user={user} />;
    }
  };

  return (
    <div className="dashboard">
      <header>
        <div className="header-content">
          <h1>KMRL Document Management</h1>
          <div className="user-info">
            <span>Welcome, {user.name}</span>
            <button onClick={onLogout}>Logout</button>
          </div>
        </div>
      </header>
      <nav>
        <button
          className={activeView === 'upload' ? 'active' : ''}
          onClick={() => setActiveView('upload')}
        >
          Upload Document
        </button>
        <button
          className={activeView === 'library' ? 'active' : ''}
          onClick={() => setActiveView('library')}
        >
          Document Library
        </button>
        <button
          className={activeView === 'analytics' ? 'active' : ''}
          onClick={() => setActiveView('analytics')}
        >
          Analytics Dashboard
        </button>
      </nav>
      <main>
        {renderView()}
      </main>
    </div>
  );
}

export default Dashboard;