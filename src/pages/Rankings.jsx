import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { fetchGuildRankings } from '../services/api';
import { Link, useParams, useNavigate } from 'react-router-dom';

export default function Rankings() {
  const { serverId } = useParams();
  const { user } = useContext(AuthContext);
  const [rankings, setRankings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return navigate('/');

    fetchGuildRankings(serverId)
      .then(setRankings)
      .catch(() => alert('Error cargando rankings'));
  }, [user, serverId, navigate]);

  return (
    <div>
      <h2>Rankings del servidor</h2>
      <ul>
        {rankings.map(rank => (
          <li key={rank.id}>
            <Link to={`/servers/${serverId}/ranking/${rank.name}`}>{rank.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}