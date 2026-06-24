import React from 'react';
import {Link} from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
      <footer className="app-footer">
        <p className="footer-copyright">
          © 2020-2026 Ranky.top. All rights reserved.
        </p>
        <p className="footer-legal-nav">
          <Link to="/terms" className="footer-link">Terms</Link>
          <span className="footer-separator">•</span>
          <Link to="/privacy" className="footer-link">Privacy</Link>
        </p>
        <p className="footer-disclaimer">
          <span className="footer-disclaimer-text">
            Ranky was created under Riot Games' <a
              href="https://www.riotgames.com/en/legal"
              target="_blank"
              rel="noreferrer"
              className="footer-link"
          >"Legal Jibber Jabber"</a> policy using assets owned by Riot Games.
            Riot Games does not endorse or sponsor this project.
          </span>
        </p>
      </footer>
  );
}

