import React from 'react';
import {HashRouter as Router, Route, Routes} from 'react-router-dom';
import {AuthProvider} from './shared/context/AuthContext';
import HomePage from './features/auth/ui/HomePage';
import './index.css';

function App() {
  return (
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
          </Routes>
        </Router>
      </AuthProvider>
  );
}

export default App;