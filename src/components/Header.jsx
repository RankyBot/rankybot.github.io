import React from 'react';
import Navbar from './Navbar';

export default function Header() {
  return (
    <div className="relative bg-emerald-950 shadow-xl">
      <Navbar />
      <div className="absolute inset-0 z-0 bg-ranky-texture bg-repeat bg-[length:80px] opacity-10 pointer-events-none" />
    </div>
  );
}
