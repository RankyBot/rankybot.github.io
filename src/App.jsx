import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';

import Home from './pages/Home';
import Servers from './pages/Servers';
import Rankings from './pages/Rankings';
import LoLRanking from './pages/LoLRanking';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/servers" element={<Layout><Servers /></Layout>} />
          <Route path="/servers/:serverId/rankings" element={<Layout><Rankings /></Layout>} />
          <Route path="/servers/:serverId/rankings/lol" element={<Layout><LoLRanking /></Layout>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}