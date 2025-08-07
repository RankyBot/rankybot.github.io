import React from 'react';
import Navbar from './Navbar';

export default function Header() {
  return (
    <div className="sticky top-0 z-50">
      <div className="relative bg-emerald-950 shadow-xl overflow-hidden">
        <div className="absolute inset-0 bg-ranky-texture bg-repeat bg-[length:80px] opacity-50 pointer-events-none z-0" />
        <div className="absolute top-0 left-0 w-12 h-full bg-gradient-to-r from-emerald-950 via-transparent to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-12 h-full bg-gradient-to-l from-emerald-950 via-transparent to-transparent z-10 pointer-events-none" />
        <Navbar />
      </div>
    </div>
  );
}
