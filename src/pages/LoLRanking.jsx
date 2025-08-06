// pages/LoLRanking.jsx
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { fetchSpecificRanking } from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';

export default function LoLRanking() {
  const { serverId, rankingId } = useParams();
  const { user } = useContext(AuthContext);
  const [accounts, setAccounts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return navigate('/');

    fetchSpecificRanking(serverId, rankingId)
      .then(data => {
        const sorted = [...data.accounts].sort(compareAccounts);
        setAccounts(sorted);
      })
      .catch(() => alert('Error cargando ranking'));
  }, [user, serverId, rankingId, navigate]);

  function compareAccounts(a, b) {
    const tiers = [
      'UNRANKED', 'IRON', 'BRONZE', 'SILVER', 'GOLD',
      'PLATINUM', 'EMERALD', 'DIAMOND',
      'MASTER', 'GRANDMASTER', 'CHALLENGER'
    ];

    const divisions = { 'NONE': 0, 'IV': 1, 'III': 2, 'II': 3, 'I': 4 };

    const tierDiff = tiers.indexOf(b.rank.tier) - tiers.indexOf(a.rank.tier);
    if (tierDiff !== 0) return tierDiff;

    const divDiff = divisions[b.rank.division.trim()] - divisions[a.rank.division.trim()];
    if (divDiff !== 0) return divDiff;

    const lpDiff = b.rank.leaguePoints - a.rank.leaguePoints;
    if (lpDiff !== 0) return lpDiff;

    const wrA = getWinratePercentage(a.rank.winrate);
    const wrB = getWinratePercentage(b.rank.winrate);
    return wrB - wrA;
  }

  function getWinratePercentage(winrate) {
    const total = winrate.wins + winrate.losses;
    if (total === 0) return 0;
    return (winrate.wins / total) * 100;
  }

  return (
    <div>
      <h2>Ranking: {rankingId}</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Jugador</th>
            <th>Tier</th>
            <th>LP</th>
            <th>Winrate</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((acc, index) => (
            <tr key={acc.id}>
              <td>{index + 1}</td>
              <td>{acc.name}#{acc.tagLine}</td>
              <td>{acc.rank.tier} {acc.rank.division}</td>
              <td>{acc.rank.leaguePoints}</td>
              <td>
                {acc.rank.winrate.wins}W / {acc.rank.winrate.losses}L (
                {getWinratePercentage(acc.rank.winrate).toFixed(2)}%)
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
