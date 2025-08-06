import React from 'react';

export default function Layout({ children }) {
  return (
    <div style={{ padding: '20px' }}>
      <header>
        <h1>Ranky</h1>
      </header>
      <main>{children}</main>
    </div>
  );
}