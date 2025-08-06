import React from 'react';

export default function RankingTable({ ranking }) {
  return (
    <table className="min-w-full bg-white shadow rounded overflow-hidden">
      <thead className="bg-indigo-600 text-white">
        <tr>
          <th className="px-4 py-2 text-left">#</th>
          <th className="px-4 py-2 text-left">Jugador</th>
          <th className="px-4 py-2 text-left">Puntos</th>
        </tr>
      </thead>
      <tbody>
        {ranking.map(({ position, playerName, points }) => (
          <tr key={playerName} className="border-b hover:bg-gray-50">
            <td className="px-4 py-2">{position}</td>
            <td className="px-4 py-2">{playerName}</td>
            <td className="px-4 py-2">{points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}