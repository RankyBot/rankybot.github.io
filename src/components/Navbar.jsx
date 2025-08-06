import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user } = useContext(AuthContext);

  return (
    <div className="relative">
      <nav className="bg-emerald-950 text-white px-6 py-4 flex items-center justify-between shadow-lg z-10 relative">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/ranky-logo.png"
            alt="Ranky logo"
            className="w-10 h-10 rounded-full"
          />
          <span className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-300 to-gray-300 text-transparent bg-clip-text">
            Ranky
          </span>
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

      <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-b from-emerald-950 to-transparent pointer-events-none z-0" />
    </div>
  );
}
