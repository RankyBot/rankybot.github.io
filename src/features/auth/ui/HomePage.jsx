import React from 'react';
import {useAuth} from '../../../shared/context/AuthContext';
import {loginWithDiscord, logout} from '../../../services/api';
import MockAuthService from '../infrastructure/MockAuthService';
import './HomePage.css';

// Discord bot invite URL - update with your bot's OAuth URL
const DISCORD_BOT_INVITE_URL = 'https://discord.com/oauth2/authorize?client_id=YOUR_BOT_CLIENT_ID&scope=bot&permissions=8';

export default function HomePage() {
  const {user, loading, isAuthenticated, isMockMode} = useAuth();

  const handleLogin = () => {
    if (isMockMode) {
      MockAuthService.loginWithDiscordMock();
    } else {
      loginWithDiscord();
    }
  };

  const handleLogout = () => {
    if (isMockMode) {
      MockAuthService.logoutMock();
    } else {
      logout();
    }
  };

  const handleAddBotToServer = () => {
    window.open(DISCORD_BOT_INVITE_URL, '_blank');
  };

  return (
      <div className="home-page">
        {/* Header/Navbar */}
        <header className="home-header">
          <div className="navbar-container">
            <div className="navbar-logo">
              <img src="/ranky-logo.png" alt="Ranky Logo" className="logo"/>
              <span>Ranky</span>
            </div>
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
                    <button className="btn-logout" onClick={handleLogout}>
                      Logout
                    </button>
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

        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <img src="/ranky-logo.png" alt="Ranky" className="hero-logo"/>
            <h1>Ranky</h1>
            <p className="hero-subtitle">Create Custom League of Legends
              Rankings</p>
            <p className="hero-description">
              Ranky is a Discord bot that allows you to create customized League
              of Legends
              rankings based on ranked modes. View and manage them directly here
              or in Discord.
            </p>

            {!isAuthenticated && !loading && (
                <button className="btn-primary" onClick={handleAddBotToServer}>
                  <span>➕</span> Add Ranky to your server
                </button>
            )}

            {isAuthenticated && (
                <button className="btn-primary"
                        onClick={() => window.location.href = '/#/guilds'}>
                  View Your Guilds
                </button>
            )}
          </div>

          <div className="hero-image">
            <img src="/banner.png" alt="League of Legends Rankings"
                 className="banner-img"/>
          </div>
        </section>

        {/* Features Section */}
        <section className="features">
          <h2>Why Ranky?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎮</div>
              <h3>Discord Integration</h3>
              <p>Seamlessly integrated Discord bot to manage your rankings.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Real-time Rankings</h3>
              <p>Automatically updated rankings from Riot Games API.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚙️</div>
              <h3>Customizable</h3>
              <p>Create rankings based on different game modes and criteria.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌐</div>
              <h3>Web & Discord</h3>
              <p>View your rankings both here and in your Discord server.</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="home-footer">
          <p>&copy; 2024 Ranky. League of Legends is a trademark of Riot Games,
            Inc.</p>
        </footer>
      </div>
  );
}
