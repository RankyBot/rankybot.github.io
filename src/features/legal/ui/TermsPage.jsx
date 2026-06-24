import React from 'react';
import './LegalPage.css';

export default function TermsPage() {
  return (
      <main className="legal-page">
        <div className="legal-page__container">
          <span className="legal-page__eyebrow">Ranky Legal</span>
          <h1>Terms of Service</h1>
          <p className="legal-page__lead">
            These Terms of Service govern your use of Ranky.top, the Ranky web
            application, and the Ranky Discord bot. By using Ranky, you agree to
            use the service responsibly and in accordance with applicable laws
            and platform rules.
          </p>
          <p className="legal-page__effective-date">
            Effective date: June 24, 2026
          </p>

          <div className="legal-page__sections">
            <section className="legal-page__section">
              <h2>Use of the Service</h2>
              <p>
                Ranky provides League of Legends ranking features for Discord
                communities. You agree not to misuse the service, attempt to
                disrupt availability, or use Ranky in a way that violates Riot
                Games, Discord, or applicable third-party terms.
              </p>
            </section>

            <section className="legal-page__section">
              <h2>Accounts and Community Data</h2>
              <p>
                Some features depend on Discord authentication and server-level
                permissions. You are responsible for ensuring you have the right
                to manage rankings or submit account information within the
                communities where you use Ranky.
              </p>
            </section>

            <section className="legal-page__section">
              <h2>Third-Party Services</h2>
              <p>
                Ranky relies on third-party services, including Discord and Riot
                Games. Service availability, data accuracy, and functionality
                may
                change if those services change their APIs, policies, or uptime.
              </p>
            </section>

            <section className="legal-page__section">
              <h2>Riot Games Notice</h2>
              <p>
                Ranky was created under Riot Games' <a
                  href="https://www.riotgames.com/en/legal"
                  target="_blank"
                  rel="noreferrer"
              >"Legal Jibber Jabber"</a> policy using assets owned by Riot
                Games. Riot Games does not endorse or sponsor this project.
              </p>
            </section>

            <section className="legal-page__section">
              <h2>Changes to These Terms</h2>
              <p>
                These terms may be updated as Ranky evolves. Continued use of
                the
                service after changes are published will constitute acceptance
                of
                the updated terms.
              </p>
            </section>
          </div>
        </div>
      </main>
  );
}

