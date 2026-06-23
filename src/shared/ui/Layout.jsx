import React from 'react';
import Header from './Header';
import Footer from './Footer';
import GuildSidebar from './GuildSidebar';
import './Layout.css';

export default function Layout({children}) {
  return (
      <div className="app-layout">
        <Header/>
        <main className="app-main">
          <GuildSidebar/>
          <div className="app-content">{children}</div>
        </main>
        <Footer/>
      </div>
  );
}

