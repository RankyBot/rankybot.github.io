import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { fetchGuildRankings } from '../services/api';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Footer from '../components/Footer';

export default function Rankings() {
  const { serverId } = useParams();
  const { user } = useContext(AuthContext);
  const [rankings, setRankings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return navigate('/');

    fetchGuildRankings(serverId)
      .then(setRankings)
      .catch(() => alert('Error cargando rankings'));
  }, [user, serverId, navigate]);

  return (
    <Layout>
      <h2 className="text-3xl font-bold mb-6">Rankings del servidor</h2>
      <ul className="space-y-4">
        {rankings.map(rank => (
          <li key={rank.id}>
            <Link
              to={`/servers/${serverId}/ranking/${rank.name}`}
              className="block bg-gray-800 hover:bg-gray-700 rounded-lg p-4 transition duration-300 shadow"
            >
              {rank.name}
            </Link>
          </li>
        ))}
      </ul>
      <Footer />
    </Layout>
  );
}