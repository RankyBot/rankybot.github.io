import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Home() {
  const { user } = useContext(AuthContext);

  const handleLogin = () => {
    window.location.href = 'https://api.ranky.top/auth';
  };

  return (
    <div>
      <h2>Bienvenido a Ranky</h2>
      {!user ? (
        <button onClick={handleLogin}>Iniciar Sesión con Discord</button>
      ) : (
        <p>Hola, {user.username}. <a href="/servers">Ver servidores</a>.</p>
      )}
    </div>
  );
}