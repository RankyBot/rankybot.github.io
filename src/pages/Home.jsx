import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { fetchMutualGuilds } from '../services/api';
import { Link } from 'react-router-dom';

export default function Home() {
  const { user } = useContext(AuthContext);
  const [servers, setServers] = useState([]);

  useEffect(() => {
    if (user) {
      fetchMutualGuilds()
        .then(setServers)
        .catch(() => alert('Error cargando servidores'));
    }
  }, [user]);

  return (
    <div>
      <h1>Bienvenido a Ranky</h1>
      {!user ? (
        <a href="https://api.ranky.top/auth">
          <button>Iniciar sesión con Discord</button>
        </a>
      ) : (
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
      )}
    </div>
  );
}