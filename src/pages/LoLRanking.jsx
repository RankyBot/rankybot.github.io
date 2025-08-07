// pages/LoLRanking.jsx
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { fetchSpecificRanking } from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Footer from '../components/Footer';

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
    <Layout>
      <h2 className="text-3xl font-bold mb-6">Ranking: {rankingId}</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left bg-emerald-950 rounded-lg shadow">
          <thead className="bg-emerald-800">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Player</th>
              <th className="px-4 py-2">Tier</th>
              <th className="px-4 py-2">LP</th>
              <th className="px-4 py-2">Win rate</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((acc, index) => (
              <tr key={acc.id} className="hover:bg-emerald-800 transition">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{acc.name}#{acc.tagLine}</td>
                <td className="px-4 py-2">{acc.rank.tier} {acc.rank.division}</td>
                <td className="px-4 py-2">{acc.rank.leaguePoints}</td>
                <td className="px-4 py-2">
                  {acc.rank.winrate.wins}W / {acc.rank.winrate.losses}L (
                  {getWinratePercentage(acc.rank.winrate).toFixed(2)}%)
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </Layout>
  );
}
