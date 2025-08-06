import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-indigo-700 text-white p-4 shadow-md">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/">Ranky</Link>
        </h1>
        <nav>
          <a
            href="https://api.ranky.top/auth"
            className="bg-white text-indigo-700 px-4 py-2 rounded hover:bg-gray-100 transition"
          >
            Iniciar sesión con Discord
          </a>
        </nav>
      </div>
    </header>
  );
}