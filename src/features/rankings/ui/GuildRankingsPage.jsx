import React, {useEffect, useMemo, useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {useAuth} from '../../../shared/context/AuthContext';
import Breadcrumb from '../../../shared/ui/Breadcrumb';
import LoadingSpinner from '../../../shared/ui/LoadingSpinner';
import {fetchGuildRankings, fetchMutualGuilds} from '../../../services/api';
import './GuildRankingsPage.css';

export default function GuildRankingsPage() {
  const {isAuthenticated, loading: authLoading} = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const guildId = searchParams.get('guildId');

  const [rankings, setRankings] = useState([]);
  const [guildName, setGuildName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const headingGuildName = useMemo(() => {
    if (guildName) {
      return guildName;
    }
    return 'Server';
  }, [guildName]);

  const breadcrumbItems = useMemo(() => {
    const items = [{label: 'Ranky', path: '/'}];
    if (guildName) {
      items.push({label: guildName, isCurrent: true});
    }
    return items;
  }, [guildName]);

  const handleBreadcrumbBack = () => {
    navigate('/');
  };

  useEffect(() => {
    if (!isAuthenticated || !guildId) {
      setRankings([]);
      setGuildName('');
      setError('');
      setLoading(false);
      return;
    }

    const loadGuildData = async () => {
      setLoading(true);
      setError('');

      try {
        const [guildRankings, mutualGuilds] = await Promise.all([
          fetchGuildRankings(guildId),
          fetchMutualGuilds()
        ]);

        setRankings(Array.isArray(guildRankings) ? guildRankings : []);

        const selectedGuild = Array.isArray(mutualGuilds)
            ? mutualGuilds.find(guild => guild.id === guildId)
            : null;
        setGuildName(selectedGuild?.name || '');
      } catch (err) {
        setError(err?.message || 'Error loading rankings for this server.');
      } finally {
        setLoading(false);
      }
    };

    loadGuildData();
  }, [guildId, isAuthenticated]);

  if (authLoading) {
    return (
        <div className="guild-rankings-page guild-rankings-loading-page">
          <LoadingSpinner message="Loading session..."/>
        </div>
    );
  }

  if (!isAuthenticated) {
    return (
        <div className="guild-rankings-page guild-rankings-state">
          Login to view server rankings.
        </div>
    );
  }

  if (!guildId) {
    return (
        <div className="guild-rankings-page guild-rankings-state">
          Select a server from the left sidebar to view its rankings.
        </div>
    );
  }

  if (loading) {
    return (
        <section className="guild-rankings-page">
          <div className="guild-rankings-breadcrumb-nav">
            <button
                className="guild-rankings-back-arrow"
                onClick={handleBreadcrumbBack}
                title="Back to home"
                aria-label="Back to home"
            >
              ‹
            </button>
            <Breadcrumb items={breadcrumbItems}/>
          </div>
          <header className="guild-rankings-header">
          </header>
          <div className="guild-rankings-loading">
            <LoadingSpinner message="Loading rankings..."/>
          </div>
        </section>
    );
  }

  return (
      <section className="guild-rankings-page">
        <div className="guild-rankings-breadcrumb-nav">
          <button
              className="guild-rankings-back-arrow"
              onClick={handleBreadcrumbBack}
              title="Back to home"
              aria-label="Back to home"
          >
            ‹
          </button>
          <Breadcrumb items={breadcrumbItems}/>
        </div>
        <header className="guild-rankings-header">
          <h1>{headingGuildName} rankings</h1>
          <p>
            Browse all available rankings configured for this Discord server.
          </p>
        </header>

        {error && (
            <p className="guild-rankings-state guild-rankings-error">{error}</p>
        )}

        {!error && rankings.length === 0 && (
            <p className="guild-rankings-state">
              No rankings found for this server yet.
            </p>
        )}

        {!error && rankings.length > 0 && (
            <div className="guild-rankings-grid">
              {rankings.map((ranking, index) => (
                  <article
                      key={`${ranking.name}-${index}`}
                      className="guild-ranking-card"
                  >
                    <h2>{ranking.name}</h2>
                    <p>
                      {ranking.amountOfAccounts || 0} tracked accounts
                    </p>
                  </article>
              ))}
            </div>
        )}
      </section>
  );
}

