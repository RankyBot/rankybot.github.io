import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user } = useContext(AuthContext);

  return (
    <nav className="bg-green-900 text-white shadow-md px-6 py-4 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2">
        <img
          src="/ranky-logo.png"
          alt="Ranky logo"
          className="w-8 h-8 rounded-full"
        />
        <span className="text-xl font-bold text-yellow-400">Ranky</span>
      </Link>

      <div className="flex items-center gap-4">
        {user && <Link to="/" className="hover:underline">Home</Link>}
        {user && <a href="https://api.ranky.top/auth/logout" className="hover:underline">Log out</a>}

        <a
          href="https://discord.com/oauth2/authorize?client_id=1005188427634966629&permissions=2952866832&scope=bot"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-green-800 font-semibold px-4 py-2 rounded hover:bg-green-100 transition"
        >
          Add Ranky to your Discord server
        </a>
      </div>
    </nav>
  );
}
