import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user } = useContext(AuthContext);

  return (
    <nav className="bg-gray-900 text-white shadow-md px-6 py-4 flex items-center justify-between">
      <Link to="/" className="text-xl font-bold text-accent">Ranky</Link>
      <div className="flex gap-4">
        {user && <Link to="/" className="hover:underline">Inicio</Link>}
        {user && <a href="https://api.ranky.top/auth/logout" className="hover:underline">Cerrar sesión</a>}
      </div>
    </nav>
  );
}