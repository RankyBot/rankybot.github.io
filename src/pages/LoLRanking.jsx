import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { fetchSpecificRanking } from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

export default function LoLRanking() {
  const { serverId, rankingId } = useParams();
  const { user } = useContext(AuthContext);
  const [ranking, setRanking] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return navigate('/');

    fetchSpecificRanking(serverId, rankingId)
      .then(setRanking)
      .catch(() => alert('Error cargando ranking'));
  }, [user, serverId, rankingId, navigate]);

  return (
    <Layout>
      <h2 className="text-3xl font-bold mb-6">Ranking</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left bg-gray-800 rounded-lg shadow">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Jugador</th>
              <th className="px-4 py-2">Puntos</th>
            </tr>
          </thead>
          <tbody>
            {ranking.map(({ position, playerName, points }) => (
              <tr key={playerName} className="hover:bg-gray-700 transition">
                <td className="px-4 py-2">{position}</td>
                <td className="px-4 py-2">{playerName}</td>
                <td className="px-4 py-2">{points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}