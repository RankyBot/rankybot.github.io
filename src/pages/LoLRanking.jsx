import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { fetchSpecificRanking } from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';

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
    <div>
      <h2>Ranking</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Jugador</th>
            <th>Puntos</th>
          </tr>
        </thead>
        <tbody>
          {ranking.map(({ position, playerName, points }) => (
            <tr key={playerName}>
              <td>{position}</td>
              <td>{playerName}</td>
              <td>{points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
