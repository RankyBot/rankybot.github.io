import React from 'react';
import Header from './Header';

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background text-white font-sans px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </>
  );
}