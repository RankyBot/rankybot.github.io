import React, {useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';
import {fetchMutualGuilds} from '../../services/api';
import './GuildSidebar.css';

export default function GuildSidebar() {
  const {isAuthenticated} = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isExpanded, setIsExpanded] = useState(false);
  const [guilds, setGuilds] = useState([]);
  const [guildsLoading, setGuildsLoading] = useState(false);
  const [guildsError, setGuildsError] = useState(null);
  const selectedGuildId = searchParams.get('guildId');

  useEffect(() => {
    if (!isAuthenticated) {
      setGuilds([]);
      setGuildsError(null);
      return;
    }

    const loadGuilds = async () => {
      try {
        setGuildsLoading(true);
        setGuildsError(null);
        const data = await fetchMutualGuilds();
        setGuilds(Array.isArray(data) ? data : []);
      } catch (error) {
        setGuildsError(error?.message || 'Error loading servers.');
      } finally {
        setGuildsLoading(false);
      }
    };

    loadGuilds();
  }, [isAuthenticated]);

  const handleOpenGuild = guildId => {
    navigate(`/guilds?guildId=${encodeURIComponent(guildId)}`);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
      <aside className={`guild-sidebar ${isExpanded ? 'is-expanded' : ''}`}>
        {!isExpanded && (
            <button
                className="guild-sidebar-toggle guild-sidebar-toggle-collapsed"
                onClick={() => setIsExpanded(true)}
                aria-label="Expand server list"
                title="Expand"
            >
          <span className="guild-sidebar-hamburger" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </span>
            </button>
        )}

        <div className="guild-sidebar-content">
          {isExpanded && (
              <div className="guild-sidebar-expanded-header">
                <p className="guild-sidebar-heading">Servers</p>
                <button
                    className="guild-sidebar-toggle guild-sidebar-toggle-close"
                    onClick={() => setIsExpanded(false)}
                    aria-label="Collapse server list"
                    title="Collapse"
                >
              <span className="guild-sidebar-hamburger is-open"
                    aria-hidden="true">
                <span></span>
                <span></span>
                <span></span>
              </span>
                </button>
              </div>
          )}
          {guildsLoading && <p className="guild-sidebar-state">...</p>}
          {!guildsLoading && guildsError && (
              <p className="guild-sidebar-state guild-sidebar-error">!</p>
          )}
          {!guildsLoading && !guildsError && guilds.length === 0 && (
              <p className="guild-sidebar-state">0</p>
          )}

          {!guildsLoading && !guildsError && guilds.length > 0 && (
              <div className="guild-sidebar-list">
                {guilds.map(guild => (
                    <button
                        key={guild.id}
                        className={`guild-sidebar-item ${selectedGuildId
                        === guild.id ? 'is-active' : ''}`}
                        onClick={() => handleOpenGuild(guild.id)}
                        title={guild.name}
                    >
                      <img
                          src={guild.iconUrl || '/ranky-logo.png'}
                          alt={guild.name}
                          className="guild-sidebar-avatar"
                      />
                      {isExpanded && <span
                          className="guild-sidebar-name">{guild.name}</span>}
                    </button>
                ))}
              </div>
          )}
        </div>
      </aside>
  );
}





