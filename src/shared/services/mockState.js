// Shared mock state across all domain services
const mockState = {
  rankings: {
    '111111111111111111': [
      {name: 'SoloQ Diamond', amountOfAccounts: 25},
      {name: 'FlexQ Platinum', amountOfAccounts: 18},
      {name: 'Emergents', amountOfAccounts: 42}
    ],
    '222222222222222222': [
      {name: 'Top Players', amountOfAccounts: 15},
      {name: 'Rising Stars', amountOfAccounts: 30}
    ],
    '333333333333333333': [
      {name: 'Main Roster', amountOfAccounts: 50}
    ]
  },
  rankingDetails: {
    '111111111111111111': {
      'SoloQ Diamond': {
        id: 'SoloQ Diamond',
        name: 'SoloQ Diamond',
        amountOfAccounts: 25,
        isPublic: false,
        accounts: [
          {
            id: 'faker-kr1',
            name: 'Faker',
            tagLine: 'KR1',
            rank: {
              tier: 'CHALLENGER',
              division: 'I',
              leaguePoints: 950,
              winrate: {wins: 430, losses: 210}
            }
          },
          {
            id: 'caps-euw4',
            name: 'Caps',
            tagLine: 'EUW4',
            rank: {
              tier: 'GRANDMASTER',
              division: 'I',
              leaguePoints: 620,
              winrate: {wins: 312, losses: 201}
            }
          },
          {
            id: 'doinb-cn2',
            name: 'DoinB',
            tagLine: 'CN2',
            rank: {
              tier: 'MASTER',
              division: 'I',
              leaguePoints: 410,
              winrate: {wins: 298, losses: 190}
            }
          },
          {
            id: 'khan-kr3',
            name: 'Khan',
            tagLine: 'KR3',
            rank: {
              tier: 'DIAMOND',
              division: 'II',
              leaguePoints: 77,
              winrate: {wins: 240, losses: 182}
            }
          },
          {
            id: 'impact-na5',
            name: 'Impact',
            tagLine: 'NA5',
            rank: {
              tier: 'EMERALD',
              division: 'I',
              leaguePoints: 12,
              winrate: {wins: 182, losses: 170}
            }
          }
        ]
      },
      'FlexQ Platinum': {
        id: 'FlexQ Platinum',
        name: 'FlexQ Platinum',
        amountOfAccounts: 18,
        isPublic: false,
        accounts: [
          {
            id: 'bwipo-euw1',
            name: 'Bwipo',
            tagLine: 'EUW1',
            rank: {
              tier: 'PLATINUM',
              division: 'I',
              leaguePoints: 86,
              winrate: {wins: 158, losses: 130}
            }
          },
          {
            id: 'jankos-euw2',
            name: 'Jankos',
            tagLine: 'EUW2',
            rank: {
              tier: 'PLATINUM',
              division: 'III',
              leaguePoints: 48,
              winrate: {wins: 141, losses: 129}
            }
          },
          {
            id: 'upset-euw3',
            name: 'Upset',
            tagLine: 'EUW3',
            rank: {
              tier: 'GOLD',
              division: 'I',
              leaguePoints: 92,
              winrate: {wins: 134, losses: 126}
            }
          }
        ]
      }
    }
  }
};

export default mockState;
