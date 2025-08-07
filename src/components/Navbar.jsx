import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user } = useContext(AuthContext);

  return (
    <nav className="px-6 md:container md:mx-auto md:px-8 py-4 flex items-center justify-between relative z-10">
      <Link
        to="/"
        className="group flex items-center gap-2 md:gap-3"
      >
        <img
          src="/ranky-logo.png"
          alt="Ranky logo"
          className="w-12 h-12 md:w-10 md:h-10 border border-white rounded-full transition-shadow duration-400 group-hover:shadow-[0_0_8px_2px_rgba(255,255,255,0.5)]"
        />
      </Link>

      <div className="flex items-center gap-3 md:gap-4">
        {user && <a href="https://api.ranky.top/auth/logout" className="bg-white text-black font-semibold px-3 md:px-4 py-2 rounded hover:bg-gray-200 hover:shadow-[0_0_12px_2px_rgba(255,255,255,0.5)] transition-all duration-400 text-sm md:text-base">Log out</a>}

        <a
          href="https://discord.com/oauth2/authorize?client_id=1005188427634966629&permissions=2952866832&scope=bot"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-white via-emerald-100 to-emerald-200 text-emerald-950 font-semibold px-3 md:px-4 py-2 rounded hover:brightness-110 hover:shadow-[0_0_12px_2px_rgba(255,255,255,0.5)] transition-all duration-400 text-sm md:text-base"
        >
          Add Ranky to your Discord server
        </a>
      </div>
    </nav>
  );
}
