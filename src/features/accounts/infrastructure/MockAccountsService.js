import mockState from '../../../shared/services/mockState';

function normalizeMockAccount(account) {
  const normalizedTag = account.tagLine || account.tag || '';
  return {
    id: account.id || `${account.name
    || 'account'}-${normalizedTag}`.toLowerCase(),
    name: account.name || '',
    tagLine: normalizedTag,
    rank: account.rank || {
      tier: 'UNRANKED',
      division: 'NONE',
      leaguePoints: 0,
      winrate: {wins: 0, losses: 0}
    }
  };
}

function isSameMockAccount(left, right) {
  return left.name === right.name && left.tagLine === right.tagLine;
}

function findExistingAccount(accounts, normalizedAccount) {
  return accounts.find(
      account => isSameMockAccount(account, normalizedAccount));
}

function removeMatchingAccount(accounts, normalizedAccount) {
  return accounts.filter(
      account => !isSameMockAccount(account, normalizedAccount));
}

class MockAccountsService {
  static async addAccountsToRanking(guildId, rankingId, accounts) {
    return new Promise(resolve => {
      setTimeout(() => {
        if (!mockState.rankingDetails[guildId]) {
          mockState.rankingDetails[guildId] = {};
        }
        if (!mockState.rankingDetails[guildId][rankingId]) {
          mockState.rankingDetails[guildId][rankingId] = {
            id: rankingId,
            name: rankingId,
            amountOfAccounts: 0,
            isPublic: false,
            accounts: []
          };
        }

        // Add accounts
        accounts.forEach(account => {
          const normalized = normalizeMockAccount(account);
          const exists = findExistingAccount(
              mockState.rankingDetails[guildId][rankingId].accounts,
              normalized
          );
          if (!exists) {
            mockState.rankingDetails[guildId][rankingId].accounts.push(
                normalized);
          }
        });

        // Update account count
        const newCount = mockState.rankingDetails[guildId][rankingId].accounts.length;
        mockState.rankingDetails[guildId][rankingId].amountOfAccounts = newCount;

        // Update in rankings list
        const rankingInList = mockState.rankings[guildId]?.find(
            r => r.name === rankingId);
        if (rankingInList) {
          rankingInList.amountOfAccounts = newCount;
        }

        resolve({
          name: rankingId,
          amountOfAccounts: newCount
        });
      }, 300);
    });
  }

  static async removeAccountsFromRanking(guildId, rankingId, accounts) {
    return new Promise(resolve => {
      setTimeout(() => {
        if (!mockState.rankingDetails[guildId]?.[rankingId]) {
          resolve({name: rankingId, amountOfAccounts: 0});
          return;
        }

        // Remove accounts
        accounts.forEach(account => {
          const normalized = normalizeMockAccount(account);
          mockState.rankingDetails[guildId][rankingId].accounts =
              removeMatchingAccount(
                  mockState.rankingDetails[guildId][rankingId].accounts,
                  normalized
              );
        });

        // Update account count
        const newCount = mockState.rankingDetails[guildId][rankingId].accounts.length;
        mockState.rankingDetails[guildId][rankingId].amountOfAccounts = newCount;

        // Update in rankings list
        const rankingInList = mockState.rankings[guildId]?.find(
            r => r.name === rankingId);
        if (rankingInList) {
          rankingInList.amountOfAccounts = newCount;
        }

        resolve({
          name: rankingId,
          amountOfAccounts: newCount
        });
      }, 300);
    });
  }
}

export default MockAccountsService;
