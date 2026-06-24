import React from 'react';
import {HashRouter as Router, Route, Routes} from 'react-router-dom';
import {AuthProvider} from './shared/context/AuthContext';
import Layout from './shared/ui/Layout';
import HomePage from './features/auth/ui/HomePage';
import GuildRankingsPage from './features/rankings/ui/GuildRankingsPage';
import './index.css';

function App() {
  return (
      <AuthProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage/>}/>
              <Route path="/guilds" element={<GuildRankingsPage/>}/>
            </Routes>
          </Layout>
        </Router>
      </AuthProvider>
  );
}

export default App;