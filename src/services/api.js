import config from '../config';
import MockAuthService from '../features/auth/infrastructure/MockAuthService';
import MockUserService from '../features/user/infrastructure/MockUserService';
import MockGuildsService
  from '../features/guilds/infrastructure/MockGuildsService';
import MockRankingsService
  from '../features/rankings/infrastructure/MockRankingsService';
import MockAccountsService
  from '../features/accounts/infrastructure/MockAccountsService';

const BASE_URL = config.apiBaseUrl;

// Check if we're in mock mode
const useMock = config.mockMode === true;

// Authentication endpoints
export function getLogoutUrl() {
  return `${BASE_URL}/auth/logout`;
}

export async function loginWithDiscord() {
  if (useMock) {
    return MockAuthService.loginWithDiscordMock();
  }
  window.location.href = `${BASE_URL}/auth`;
}

export async function logout() {
  if (useMock) {
    return MockAuthService.logoutMock();
  }
  // Use top-level navigation so backend logout redirect is honored by the browser.
  window.location.assign(getLogoutUrl());
}

// User endpoints
export async function fetchCurrentUser() {
  if (useMock) {
    return MockUserService.fetchCurrentUser();
  }
  const res = await fetch(`${BASE_URL}/me`, {
    credentials: 'include'
  });
  if (!res.ok) {
    throw new Error('Error fetching current user');
  }
  return res.json();
}

export async function checkUserPowerAtGuild(guildId) {
  if (useMock) {
    return MockUserService.checkUserPowerAtGuild(guildId);
  }
  const res = await fetch(`${BASE_URL}/me/atGuild/${guildId}`, {
    credentials: 'include'
  });
  if (!res.ok) {
    throw new Error('Error checking user permissions');
  }
  return res.json();
}

// Rankings - Retrieve endpoints
export async function fetchMutualGuilds() {
  if (useMock) {
    return MockGuildsService.fetchMutualGuilds();
  }
  const res = await fetch(`${BASE_URL}/rankings/mutual`, {
    credentials: 'include'
  });
  if (!res.ok) throw new Error('Error fetching mutual guilds');
  return res.json();
}

export async function fetchGuildRankings(guildId) {
  if (useMock) {
    return MockRankingsService.fetchGuildRankings(guildId);
  }
  const res = await fetch(`${BASE_URL}/rankings/fromGuild/${guildId}`, {
    credentials: 'include'
  });
  if (!res.ok) throw new Error('Error fetching guild rankings');
  return res.json();
}

export async function fetchSpecificRanking(guildId, rankingId) {
  if (useMock) {
    return MockRankingsService.fetchSpecificRanking(guildId,
        rankingId);
  }
  const res = await fetch(`${BASE_URL}/rankings/fromGuild/${guildId}/soloQ/${rankingId}`, {
    credentials: 'include'
  });
  if (!res.ok) {
    const msg = await res.text();
    throw {status: res.status, message: msg || 'Unknown error'};
  }
  return res.json();
}

export async function fetchSpecificFlexQRanking(guildId, rankingId) {
  if (useMock) {
    return MockRankingsService.fetchSpecificFlexQRanking(guildId,
        rankingId);
  }
  const res = await fetch(`${BASE_URL}/rankings/fromGuild/${guildId}/flexQ/${rankingId}`, {
    credentials: 'include'
  });
  if (!res.ok) {
    const msg = await res.text();
    throw {status: res.status, message: msg || 'Unknown error'};
  }
  return res.json();
}

// Rankings - Create/Delete endpoints
export async function createRanking(guildId, name) {
  if (useMock) {
    return MockRankingsService.createRanking(guildId, name);
  }
  const res = await fetch(
      `${BASE_URL}/rankings/forGuild/${guildId}/name/${encodeURIComponent(
          name)}`, {
        method: 'POST',
        credentials: 'include'
      });
  if (!res.ok) {
    const msg = await res.text();
    throw {status: res.status, message: msg || 'Error creating ranking'};
  }
  return res.json();
}

export async function deleteRanking(guildId, name) {
  if (useMock) {
    return MockRankingsService.deleteRanking(guildId, name);
  }
  const res = await fetch(
      `${BASE_URL}/rankings/forGuild/${guildId}/name/${encodeURIComponent(
          name)}`, {
        method: 'DELETE',
        credentials: 'include'
      });
  if (!res.ok) {
    const msg = await res.text();
    throw {status: res.status, message: msg || 'Error deleting ranking'};
  }
  return res.json();
}

// Accounts - Add/Remove endpoints
export async function addAccountsToRanking(guildId, rankingId, accounts) {
  if (useMock) {
    return MockAccountsService.addAccountsToRanking(guildId,
        rankingId, accounts);
  }
  const res = await fetch(
      `${BASE_URL}/rankings/forGuild/${guildId}/forRanking/${rankingId}/add`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(accounts)
      });
  if (!res.ok) {
    const msg = await res.text();
    throw {status: res.status, message: msg || 'Error adding accounts'};
  }
  return res.json();
}

export async function removeAccountsFromRanking(guildId, rankingId, accounts) {
  if (useMock) {
    return MockAccountsService.removeAccountsFromRanking(guildId,
        rankingId, accounts);
  }
  const res = await fetch(
      `${BASE_URL}/rankings/forGuild/${guildId}/forRanking/${rankingId}/remove`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(accounts)
      });
  if (!res.ok) {
    const msg = await res.text();
    throw {status: res.status, message: msg || 'Error removing accounts'};
  }
  return res.json();
}
