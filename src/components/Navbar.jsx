import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user } = useContext(AuthContext);

  return (
    <nav className="px-6 md:container md:mx-auto md:px-8 py-4 flex items-center justify-between relative z-10">
      <Link
        to="/"
        className="group flex items-center gap-2 md:gap-3 relative transition-shadow duration-300 hover:shadow-[0_0_12px_2px_rgba(255,255,255,0.5)] rounded-lg">
        <img
          src="/ranky-logo.png"
          alt="Ranky logo"
          className="w-8 h-8 md:w-10 md:h-10 rounded-full"
        />
        <span className="text-xl md:text-3xl font-black tracking-tight bg-gradient-to-r from-yellow-400 via-yellow-300 to-gray-300 text-transparent bg-clip-text">
          Ranky
        </span>
      </Link>

      <div className="flex items-center gap-3 md:gap-4">
        {user && <Link to="/" className="hover:underline">Home</Link>}
        {user && <a href="https://api.ranky.top/auth/logout" className="hover:underline">Log out</a>}

        <a
          href="https://discord.com/oauth2/authorize?client_id=1005188427634966629&permissions=2952866832&scope=bot"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-50 text-amber-900 font-semibold px-3 md:px-4 py-2 rounded hover:brightness-110 hover:-translate-y-0.5 hover:shadow-[0_0_12px_2px_rgba(255,255,255,0.5)] transition-all duration-300 text-sm md:text-base"
        >
          Add Ranky to your Discord server
        </a>
      </div>
    </nav>
  );
}
