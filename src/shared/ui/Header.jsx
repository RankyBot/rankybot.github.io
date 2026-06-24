import React from 'react';
import {Link} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';
import {getLogoutUrl, loginWithDiscord, logout} from '../../services/api';
import './Header.css';

export default function Header() {
  const {user, loading, isAuthenticated, isMockMode} = useAuth();

  const handleLogin = () => {
    loginWithDiscord();
  };

  const handleLogout = () => {
    logout();
  };

  return (
      <header className="app-header">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo"
                aria-label="Go to Ranky home page">
            <img src="/ranky-logo.png" alt="Ranky Logo" className="logo"/>
            <span>Ranky</span>
          </Link>
          <nav className="navbar-actions">
            {loading ? (
                <span className="loading">Loading...</span>
            ) : isAuthenticated ? (
                <>
                  <div className="user-info">
                    {user?.iconUrl && (
                        <img src={user.iconUrl} alt={user.username}
                             className="user-avatar"/>
                    )}
                    <span
                        className="user-welcome">Welcome, {user?.username}</span>
                  </div>
                  {isMockMode ? (
                      <button className="btn-logout" onClick={handleLogout}>
                        Logout
                      </button>
                  ) : (
                      <a className="btn-logout" href={getLogoutUrl()}>
                        Logout
                      </a>
                  )}
                </>
            ) : (
                <button className="btn-discord-login" onClick={handleLogin}>
                  <span className="discord-icon">💜</span>
                  {isMockMode ? 'Mock Login' : 'Login with Discord'}
                </button>
            )}
          </nav>
        </div>
        {isMockMode && (
            <div className="mock-banner">
              🧪 Development Mode - Using Mock Login (Local Backend)
            </div>
        )}
      </header>
  );
}

