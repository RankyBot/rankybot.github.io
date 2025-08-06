const BASE_URL = 'https://api.ranky.top';

export async function fetchMutualGuilds() {
  const res = await fetch(`${BASE_URL}/rankings/mutual`, {
    credentials: 'include'
  });
  if (!res.ok) throw new Error('Error fetching mutual guilds');
  return res.json();
}

export async function fetchGuildRankings(guildId) {
  const res = await fetch(`${BASE_URL}/rankings/fromGuild/${guildId}`, {
    credentials: 'include'
  });
  if (!res.ok) throw new Error('Error fetching guild rankings');
  return res.json();
}

export async function fetchSpecificRanking(guildId, rankingId) {
  const res = await fetch(`${BASE_URL}/rankings/fromGuild/${guildId}/rankings/${rankingId}`, {
    credentials: 'include'
  });
  if (!res.ok) throw new Error('Error fetching specific ranking');
  return res.json();
}
