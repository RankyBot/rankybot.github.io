import React from 'react';
import {HashRouter as Router, Route, Routes} from 'react-router-dom';
import {AuthProvider} from './shared/context/AuthContext';
import Layout from './shared/ui/Layout';
import HomePage from './features/auth/ui/HomePage';
import HowItWorksPage from './features/auth/ui/HowItWorksPage';
import PrivacyPage from './features/legal/ui/PrivacyPage';
import TermsPage from './features/legal/ui/TermsPage';
import GuildRankingsPage from './features/rankings/ui/GuildRankingsPage';
import RankingDetailsPage from './features/rankings/ui/RankingDetailsPage';
import './index.css';

function App() {
  return (
      <AuthProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage/>}/>
              <Route path="/how-it-works" element={<HowItWorksPage/>}/>
              <Route path="/terms" element={<TermsPage/>}/>
              <Route path="/privacy" element={<PrivacyPage/>}/>
              <Route path="/guilds" element={<GuildRankingsPage/>}/>
              <Route path="/guilds/:guildId/rankings/:rankingId"
                     element={<RankingDetailsPage/>}/>
            </Routes>
          </Layout>
        </Router>
      </AuthProvider>
  );
}

export default App;