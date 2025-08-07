import React from 'react';
import Navbar from './Navbar';

export default function Header() {
  return (
    <div className="sticky top-0 z-50">
      <div className="relative bg-black shadow-xl overflow-hidden border-b border-white transition-shadow duration-300 hover:shadow-[0_4px_8px_0_rgba(255,255,255,0.6)]">
        <div className="absolute top-0 left-0 w-12 h-full bg-gradient-to-r from-emerald-950 via-transparent to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-12 h-full bg-gradient-to-l from-emerald-950 via-transparent to-transparent z-10 pointer-events-none" />
        <Navbar />
      </div>
    </div>
  );
}
