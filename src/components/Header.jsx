import React from 'react';
import Navbar from './Navbar';

export default function Header() {
  return (
    <div className="sticky top-0 z-50">
      <div className="relative bg-black shadow-xl overflow-hidden border-b border-white shadow-[0_4px_8px_0_rgba(255,255,255,0.6)]">
        <Navbar />
      </div>
    </div>
  );
}
