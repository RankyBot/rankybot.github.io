import React from 'react';
import { Link } from 'react-router-dom';

export default function RankingList({ rankings, serverId }) {
  return (
    <ul className="space-y-2">
      {rankings.map(rank => (
        <li key={rank.id}>
          <Link
            to={`/servers/${serverId}/ranking/${rank.name}`}
            className="block bg-white p-3 rounded shadow hover:bg-gray-100"
          >
            {rank.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}