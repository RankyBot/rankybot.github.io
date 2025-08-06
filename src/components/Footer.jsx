import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-12 text-center text-sm text-gray-400 px-4 py-6 border-t border-gray-700">
      <p>
        Ranky was created under Riot Games'{" "}
        <a
          href="https://www.riotgames.com/en/legal"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-gray-200 transition"
        >
          "Legal Jibber Jabber"
        </a>{" "}
        policy using assets owned by Riot Games. Riot Games does not endorse or sponsor this project.
      </p>
    </footer>
  );
}