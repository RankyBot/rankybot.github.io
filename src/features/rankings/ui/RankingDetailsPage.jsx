import React, {useEffect, useMemo, useState} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {useAuth} from '../../../shared/context/AuthContext';
import Breadcrumb from '../../../shared/ui/Breadcrumb';
import LoadingSpinner from '../../../shared/ui/LoadingSpinner';
import {
  fetchMutualGuilds,
  fetchSpecificFlexQRanking,
  fetchSpecificRanking
} from '../../../services/api';
import RankTierIcon from './components/RankTierIcon';
import './RankingDetailsPage.css';

const TIER_SCORE = {
  UNRANKED: 0,
  IRON: 1,
  BRONZE: 2,
  SILVER: 3,
  GOLD: 4,
  PLATINUM: 5,
  EMERALD: 6,
  DIAMOND: 7,
  MASTER: 8,
  GRANDMASTER: 9,
  CHALLENGER: 10
};

const DIVISION_SCORE = {
  NONE: 0,
  IV: 1,
  III: 2,
  II: 3,
  I: 4
};

const QUEUE_TYPE = {
  SOLO: 'soloQ',
  FLEX: 'flexQ'
};

function extractEnumValue(value) {
  if (typeof value === 'string') {
    return value.trim().toUpperCase();
  }

  if (value && typeof value === 'object') {
    if (typeof value.value === 'string') {
      return value.value.trim().toUpperCase();
    }
    if (typeof value.name === 'string') {
      return value.name.trim().toUpperCase();
    }
  }

  return '';
}

function getLeaguePointsValue(rawRank, account) {
  if (Number.isFinite(rawRank?.leaguePoints)) {
    return rawRank.leaguePoints;
  }
  if (Number.isFinite(rawRank?.lp)) {
    return rawRank.lp;
  }
  if (Number.isFinite(account?.leaguePoints)) {
    return account.leaguePoints;
  }
  return 0;
}

function getWinrateValue(rawRank, account) {
  let source = {};

  if (rawRank?.winrate && typeof rawRank.winrate === 'object') {
    source = rawRank.winrate;
  } else if (account?.winrate && typeof account.winrate === 'object') {
    source = account.winrate;
  }

  const wins = Number.isFinite(source.wins) ? source.wins : 0;
  let losses = 0;
  if (Number.isFinite(source.losses)) {
    losses = source.losses;
  } else if (Number.isFinite(source.defeats)) {
    losses = source.defeats;
  }

  return {wins, losses};
}

function getAccountRank(account) {
  const rawRank = account?.rank && typeof account.rank === 'object'
      ? account.rank
      : {};

  const tier = extractEnumValue(rawRank.tier || account?.tier);
  const division = extractEnumValue(rawRank.division || account?.division);
  const leaguePoints = getLeaguePointsValue(rawRank, account);
  const winrate = getWinrateValue(rawRank, account);

  return {
    tier,
    division,
    leaguePoints,
    winrate
  };
}

function decodeRouteParam(value = '') {
  return decodeURIComponent(value);
}

function getRankScore(account) {
  const rank = getAccountRank(account);
  const tierScore = TIER_SCORE[rank.tier] || 0;
  const divisionScore = DIVISION_SCORE[rank.division] || 0;
  const lp = Number.isFinite(rank.leaguePoints) ? rank.leaguePoints : 0;
  return tierScore * 10000 + divisionScore * 1000 + lp;
}

function compareByEloDescending(accountA, accountB) {
  return getRankScore(accountB) - getRankScore(accountA);
}

function formatRank(account) {
  const rank = getAccountRank(account);
  if (!rank?.tier) {
    return 'Unranked';
  }

  const parts = [rank.tier];
  if (rank.division && rank.division !== 'NONE') {
    parts.push(rank.division);
  }

  if (Number.isFinite(rank.leaguePoints)) {
    parts.push(`${rank.leaguePoints} LP`);
  }

  return parts.join(' ');
}

function getWinrateSummary(account) {
  const winrate = getAccountRank(account).winrate;
  const wins = Number.isFinite(winrate?.wins) ? winrate.wins : 0;
  const losses = Number.isFinite(winrate?.losses) ? winrate.losses : 0;
  const totalGames = wins + losses;
  if (totalGames === 0) {
    return {label: 'No games', detail: '0W / 0L'};
  }

  const percentage = Math.round((wins / totalGames) * 100);
  return {
    label: `${percentage}% WR`,
    detail: `${wins}W / ${losses}L`
  };
}

function formatQueueLabel(queueType) {
  if (queueType === QUEUE_TYPE.FLEX) {
    return 'FlexQ';
  }
  return 'SoloQ';
}

async function fetchRankingByQueue(guildId, rankingId, queueType) {
  if (queueType === QUEUE_TYPE.FLEX) {
    return fetchSpecificFlexQRanking(guildId, rankingId);
  }
  return fetchSpecificRanking(guildId, rankingId);
}

export default function RankingDetailsPage() {
  const {isAuthenticated, loading: authLoading} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const {guildId: guildIdParam, rankingId: rankingIdParam} = useParams();

  const guildId = decodeRouteParam(guildIdParam || '');
  const rankingId = decodeRouteParam(rankingIdParam || '');

  const [guildName, setGuildName] = useState(location.state?.guildName || '');
  const [ranking, setRanking] = useState(null);
  const [selectedQueue, setSelectedQueue] = useState(QUEUE_TYPE.SOLO);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const rankingDisplayName = ranking?.id || ranking?.name || rankingId;

  const sortedAccounts = useMemo(() => {
    if (!ranking?.accounts || !Array.isArray(ranking.accounts)) {
      return [];
    }

    return [...ranking.accounts].sort(compareByEloDescending);
  }, [ranking]);

  const breadcrumbItems = useMemo(() => {
    const items = [{label: 'Ranky', path: '/'}];

    if (guildName) {
      items.push({label: guildName, path: `/guilds?guildId=${guildId}`});
    } else if (guildId) {
      items.push({label: 'Server', path: `/guilds?guildId=${guildId}`});
    }

    items.push({label: rankingDisplayName || 'Ranking', isCurrent: true});
    return items;
  }, [guildId, guildName, rankingDisplayName]);

  const handleBreadcrumbBack = () => {
    navigate(`/guilds?guildId=${guildId}`);
  };

  useEffect(() => {
    if (!isAuthenticated || !guildId || !rankingId) {
      setRanking(null);
      setError('');
      setLoading(false);
      return;
    }

    let isCancelled = false;

    const loadDetails = async () => {
      setLoading(true);
      setError('');

      try {
        const [rankingResult, mutualGuilds] = await Promise.all([
          fetchRankingByQueue(guildId, rankingId, selectedQueue),
          fetchMutualGuilds()
        ]);

        if (isCancelled) {
          return;
        }

        setRanking(rankingResult);

        const selectedGuild = Array.isArray(mutualGuilds)
            ? mutualGuilds.find(guild => guild.id === guildId)
            : null;
        setGuildName(selectedGuild?.name || location.state?.guildName || '');
      } catch (err) {
        if (!isCancelled) {
          setError(err?.message || `Error loading ${formatQueueLabel(
              selectedQueue)} ranking details.`);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    loadDetails();

    return () => {
      isCancelled = true;
    };
  }, [guildId, isAuthenticated, location.state?.guildName, rankingId,
    selectedQueue]);

  if (authLoading) {
    return (
        <div className="ranking-details-page ranking-details-loading-page">
          <LoadingSpinner message="Loading session..."/>
        </div>
    );
  }

  if (!isAuthenticated) {
    return (
        <div className="ranking-details-page ranking-details-state">
          Login to view ranking details.
        </div>
    );
  }

  if (!guildId || !rankingId) {
    return (
        <div className="ranking-details-page ranking-details-state">
          Select a ranking from the server rankings page.
        </div>
    );
  }

  if (loading) {
    return (
        <section className="ranking-details-page">
          <div className="ranking-details-breadcrumb-nav">
            <button
                className="ranking-details-back-arrow"
                onClick={handleBreadcrumbBack}
                title="Back to server rankings"
                aria-label="Back to server rankings"
            >
              &lsaquo;
            </button>
            <Breadcrumb items={breadcrumbItems}/>
            <div className="ranking-queue-toggle"
                 aria-label="Ranked queue toggle">
              <button
                  type="button"
                  className={`ranking-queue-toggle-button ${selectedQueue
                  === QUEUE_TYPE.SOLO
                      ? 'is-active' : ''}`}
                  onClick={() => setSelectedQueue(QUEUE_TYPE.SOLO)}
                  aria-pressed={selectedQueue === QUEUE_TYPE.SOLO}
              >
                SoloQ
              </button>
              <button
                  type="button"
                  className={`ranking-queue-toggle-button ${selectedQueue
                  === QUEUE_TYPE.FLEX
                      ? 'is-active' : ''}`}
                  onClick={() => setSelectedQueue(QUEUE_TYPE.FLEX)}
                  aria-pressed={selectedQueue === QUEUE_TYPE.FLEX}
              >
                FlexQ
              </button>
            </div>
          </div>
          <div className="ranking-details-loading">
            <LoadingSpinner message={`Loading ${formatQueueLabel(
                selectedQueue)} ranking...`}/>
          </div>
        </section>
    );
  }

  return (
      <section className="ranking-details-page">
        <div className="ranking-details-breadcrumb-nav">
          <button
              className="ranking-details-back-arrow"
              onClick={handleBreadcrumbBack}
              title="Back to server rankings"
              aria-label="Back to server rankings"
          >
            &lsaquo;
          </button>
          <Breadcrumb items={breadcrumbItems}/>
          <div className="ranking-queue-toggle"
               aria-label="Ranked queue toggle">
            <button
                type="button"
                className={`ranking-queue-toggle-button ${selectedQueue
                === QUEUE_TYPE.SOLO
                    ? 'is-active' : ''}`}
                onClick={() => setSelectedQueue(QUEUE_TYPE.SOLO)}
                aria-pressed={selectedQueue === QUEUE_TYPE.SOLO}
            >
              SoloQ
            </button>
            <button
                type="button"
                className={`ranking-queue-toggle-button ${selectedQueue
                === QUEUE_TYPE.FLEX
                    ? 'is-active' : ''}`}
                onClick={() => setSelectedQueue(QUEUE_TYPE.FLEX)}
                aria-pressed={selectedQueue === QUEUE_TYPE.FLEX}
            >
              FlexQ
            </button>
          </div>
        </div>


        <section className="ranking-details-leaderboard"
                 aria-label="Ranking accounts">

          {!error && sortedAccounts.length > 0 && (
              <ul className="ranking-details-list">
                {sortedAccounts.map((account, index) => {
                  const rank = getAccountRank(account);
                  const winrateSummary = getWinrateSummary(account);
                  return (
                      <li
                          key={`${account.id || account.name
                          || 'account'}-${index}`}
                          className="ranking-account-card"
                      >
                        <div className="ranking-account-position">{index
                            + 1}</div>
                        <div className="ranking-account-profile">
                          <h2>{account.name || 'Unknown summoner'}</h2>
                          <p>{account.tagLine || account.tag || '-'}</p>
                        </div>
                        <div className="ranking-account-league">
                          <RankTierIcon tier={rank.tier}/>
                          <div>
                            <p className="ranking-account-rank">{formatRank(
                                account)}</p>
                            <p className="ranking-account-lp">
                              {`${rank.leaguePoints} LP`}
                            </p>
                          </div>
                        </div>
                        <div className="ranking-account-winrate">
                          <p>{winrateSummary.label}</p>
                          <span>{winrateSummary.detail}</span>
                        </div>
                      </li>
                  );
                })}
              </ul>
          )}
        </section>

        {error && (
            <p className="ranking-details-state ranking-details-error">{error}</p>
        )}

        {!error && sortedAccounts.length === 0 && (
            <p className="ranking-details-state">
              No accounts found in this ranking.
            </p>
        )}
      </section>
  );
}


