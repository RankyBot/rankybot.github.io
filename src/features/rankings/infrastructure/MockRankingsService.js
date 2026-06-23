import mockState from '../../../shared/services/mockState';

class MockRankingsService {
  static async fetchGuildRankings(guildId) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mockState.rankings[guildId] ? [...mockState.rankings[guildId]]
            : []);
      }, 300);
    });
  }

  static async fetchSpecificRanking(guildId, rankingId) {
    return new Promise(resolve => {
      setTimeout(() => {
        const ranking = mockState.rankingDetails[guildId]?.[rankingId] || {
          name: rankingId,
          amountOfAccounts: 0,
          accounts: []
        };
        resolve({...ranking, accounts: [...ranking.accounts]});
      }, 300);
    });
  }

  static async fetchSpecificFlexQRanking(guildId, rankingId) {
    return new Promise(resolve => {
      setTimeout(() => {
        const ranking = mockState.rankingDetails[guildId]?.[rankingId] || {
          name: rankingId,
          amountOfAccounts: 0,
          accounts: []
        };
        resolve({...ranking, accounts: [...ranking.accounts]});
      }, 300);
    });
  }

  static async createRanking(guildId, name) {
    return new Promise(resolve => {
      setTimeout(() => {
        if (!mockState.rankings[guildId]) {
          mockState.rankings[guildId] = [];
        }
        if (!mockState.rankingDetails[guildId]) {
          mockState.rankingDetails[guildId] = {};
        }

        // Add new ranking
        mockState.rankings[guildId].push({name, amountOfAccounts: 0});
        mockState.rankingDetails[guildId][name] = {
          name,
          amountOfAccounts: 0,
          accounts: []
        };

        resolve({name, amountOfAccounts: 0});
      }, 400);
    });
  }

  static async deleteRanking(guildId, name) {
    return new Promise(resolve => {
      setTimeout(() => {
        if (mockState.rankings[guildId]) {
          mockState.rankings[guildId] = mockState.rankings[guildId].filter(
              r => r.name !== name);
        }
        if (mockState.rankingDetails[guildId]) {
          delete mockState.rankingDetails[guildId][name];
        }
        resolve(true);
      }, 300);
    });
  }
}

export default MockRankingsService;
