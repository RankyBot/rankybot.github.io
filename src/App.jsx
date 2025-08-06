import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';

import Home from './pages/Home';
import Rankings from './pages/Rankings';
import LoLRanking from './pages/LoLRanking';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/servers/:serverId/rankings" element={<Layout><Rankings /></Layout>} />
          <Route path="/servers/:serverId/ranking/:rankingId" element={<Layout><LoLRanking /></Layout>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}