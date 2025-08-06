import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { fetchMutualGuilds } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';

export default function Servers() {
  const { user } = useContext(AuthContext);
  const [servers, setServers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return navigate('/');

    fetchMutualGuilds()
      .then(setServers)
      .catch(() => alert('Error cargando servidores'));
  }, [user, navigate]);

  return (
    <div>
      <h2>Tus servidores</h2>
      <ul>
        {servers.map(server => (
          <li key={server.id}>
            <Link to={`/servers/${server.id}/rankings`}>{server.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}