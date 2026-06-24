import React from 'react';
import './HowItWorksPage.css';

const DISCORD_BOT_INVITE_URL = 'https://discord.com/oauth2/authorize?client_id=1005188427634966629&permissions=2952866832&scope=bot';

export default function HowItWorksPage() {
  return (
      <main className="how-page">
        <div className="how-page__container">
          <h1>Why Ranky Exists</h1>
          <p className="how-page__lead">
            Ranky solves a common Discord community problem: tracking League of
            Legends
            rankings for groups of players is usually manual, noisy, and hard to
            keep current.
            Ranky automates the process by combining Discord workflows with Riot
            ranked data.
          </p>

          <div className="how-page__sections">
            <section className="how-page__section">
              <h2>The Problem</h2>
              <ul>
                <li>Server members want shared rankings for specific groups of
                  accounts.
                </li>
                <li>Manual ranking lists become outdated quickly.</li>
                <li>Communities need one place to view rankings from Discord and
                  the web.
                </li>
              </ul>
            </section>

            <section className="how-page__section">
              <h2>How Ranky Solves It</h2>
              <ul>
                <li>Connects with Riot APIs to retrieve ranked information.</li>
                <li>Lets your server create custom rankings for selected
                  accounts.
                </li>
                <li>Shows rankings in Discord and on the Ranky web app.</li>
                <li>Supports queue-specific views for SoloQ and FlexQ.</li>
              </ul>
            </section>

            <section className="how-page__section">
              <h2>How to Use Ranky</h2>
              <ol>
                <li>Add the Ranky bot to your Discord server.</li>
                <li>Login with Discord on the Ranky web app.</li>
                <li>Select one of your shared servers.</li>
                <li>Create a ranking and add League accounts.</li>
                <li>Open a ranking to see the current leaderboard.</li>
              </ol>
              <a className="how-page__cta" href={DISCORD_BOT_INVITE_URL}
                 target="_blank" rel="noreferrer">
                Add Ranky to Discord
              </a>
            </section>

            <section className="how-page__section">
              <h2>Typical Use Cases</h2>
              <ul>
                <li>Friend groups tracking internal SoloQ races.</li>
                <li>Communities comparing multiple account pools by role or
                  team.
                </li>
                <li>Tournament or club servers keeping a shared ranked
                  snapshot.
                </li>
              </ul>
            </section>
          </div>
        </div>
      </main>
  );
}

