import React from 'react';
import Navbar from './Navbar';

export default function Header() {
  return (
    <div className="sticky top-0 z-50">
      <div className="relative bg-black overflow-hidden relative border-b border-white after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-white after:blur-sm after:opacity-70">
        <Navbar />
      </div>
    </div>
  );
}
