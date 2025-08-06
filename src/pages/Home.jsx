import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { fetchMutualGuilds } from '../services/api';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Footer from '../components/Footer';


export default function Home() {
  const { user } = useContext(AuthContext);
  const [servers, setServers] = useState([]);

  useEffect(() => {
    if (user) {
      fetchMutualGuilds()
        .then(setServers)
        .catch(() => alert('Error loading guilds'));
    }
  }, [user]);

  return (
    <Layout>
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold">Welcome to <span className="text-accent">Ranky</span></h1>
        {!user ? (
          <a href="https://api.ranky.top/auth">
            <Button>Log in with Discord</Button>
          </a>
        ) : (
          <div className="mt-8">
            <h2 className="text-2xl mb-4 font-semibold">Servers</h2>
            <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {servers.map(server => (
                <li key={server.id}>
                  <Link
                    to={`/servers/${server.id}/rankings`}
                    className="block bg-gray-800 hover:bg-gray-700 rounded-xl p-4 transition-colors duration-300 text-white text-center shadow"
                  >
                    {server.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <Footer />
    </Layout>
  );
}
