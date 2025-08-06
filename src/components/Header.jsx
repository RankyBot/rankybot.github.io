import React from 'react';
import Navbar from './Navbar';

export default function Header() {
  return (
    <div className="sticky top-0 z-50">
      <div className="relative bg-emerald-950 shadow-xl">
        <div className="absolute inset-0 bg-ranky-texture bg-repeat bg-[length:80px] opacity-10 pointer-events-none z-0" />

        <Navbar />
      </div>
    </div>
  );
}
