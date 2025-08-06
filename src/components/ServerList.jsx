import React from 'react';
import { Link } from 'react-router-dom';

export default function ServerList({ servers }) {
  return (
    <ul className="space-y-2">
      {servers.map(server => (
        <li key={server.id}>
          <Link
            to={`/servers/${server.id}/rankings`}
            className="block bg-white p-3 rounded shadow hover:bg-gray-100"
          >
            {server.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}