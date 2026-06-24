import React from 'react';
import './LegalPage.css';

export default function PrivacyPage() {
  return (
      <main className="legal-page">
        <div className="legal-page__container">
          <span className="legal-page__eyebrow">Ranky Legal</span>
          <h1>Privacy Policy</h1>
          <p className="legal-page__lead">
            This Privacy Policy explains the main categories of information
            Ranky processes to operate the website and Discord bot features.
            Ranky is designed to use only the data needed to authenticate users,
            manage rankings, and display League of Legends account information.
          </p>
          <p className="legal-page__effective-date">
            Effective date: June 24, 2026
          </p>

          <div className="legal-page__sections">
            <section className="legal-page__section">
              <h2>Information We Process</h2>
              <ul>
                <li>Discord account information required for sign-in.</li>
                <li>Discord guild and ranking data created through Ranky.</li>
                <li>League of Legends account identifiers submitted for
                  rankings.
                </li>
                <li>Technical session and cache data needed to keep the service
                  working.
                </li>
              </ul>
            </section>

            <section className="legal-page__section">
              <h2>How We Use Information</h2>
              <p>
                Ranky uses this information to authenticate users, create and
                manage rankings and retrieve League of Legends related ranked
                data.
              </p>
            </section>

            <section className="legal-page__section">
              <h2>Third-Party Platforms</h2>
              <p>
                Ranky integrates with Discord and Riot Games APIs. Information
                made available through those services is also subject to their
                respective terms and privacy practices.
              </p>
            </section>

            <section className="legal-page__section">
              <h2>Data Retention</h2>
              <p>
                Data may be retained for as long as needed to provide the
                service, maintain rankings, protect against abuse, and satisfy
                operational or legal requirements.
              </p>
            </section>

            <section className="legal-page__section">
              <h2>Policy Updates</h2>
              <p>
                This Privacy Policy may be revised over time as Ranky develops.
                Updates will be published on this page with a refreshed
                effective date when appropriate.
              </p>
            </section>
          </div>
        </div>
      </main>
  );
}

