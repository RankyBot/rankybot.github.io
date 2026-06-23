import mockState from '../../../shared/services/mockState';

class MockAccountsService {
  static async addAccountsToRanking(guildId, rankingId, accounts) {
    return new Promise(resolve => {
      setTimeout(() => {
        if (!mockState.rankingDetails[guildId]) {
          mockState.rankingDetails[guildId] = {};
        }
        if (!mockState.rankingDetails[guildId][rankingId]) {
          mockState.rankingDetails[guildId][rankingId] = {
            name: rankingId,
            amountOfAccounts: 0,
            accounts: []
          };
        }

        // Add accounts
        accounts.forEach(account => {
          const exists = mockState.rankingDetails[guildId][rankingId].accounts.find(
              a => a.name === account.name && a.tag === account.tag
          );
          if (!exists) {
            mockState.rankingDetails[guildId][rankingId].accounts.push(account);
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
          mockState.rankingDetails[guildId][rankingId].accounts =
              mockState.rankingDetails[guildId][rankingId].accounts.filter(
                  a => !(a.name === account.name && a.tag === account.tag)
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
