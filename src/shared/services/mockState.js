// Shared mock state across all domain services
let mockState = {
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
        name: 'SoloQ Diamond',
        amountOfAccounts: 25,
        accounts: [
          {name: 'Faker', tag: 'KR1'},
          {name: 'DoinB', tag: 'CN2'},
          {name: 'Khan', tag: 'KR3'},
          {name: 'Caps', tag: 'EUW4'},
          {name: 'Impact', tag: 'NA5'}
        ]
      },
      'FlexQ Platinum': {
        name: 'FlexQ Platinum',
        amountOfAccounts: 18,
        accounts: [
          {name: 'Bwipo', tag: 'EUW1'},
          {name: 'Jankos', tag: 'EUW2'},
          {name: 'Upset', tag: 'EUW3'}
        ]
      }
    }
  }
};

export default mockState;
