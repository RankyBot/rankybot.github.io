const MOCK_GUILDS = [
  {
    id: '111111111111111111',
    name: 'League Legends Community',
    iconUrl: 'https://cdn.discordapp.com/icons/111111111111111111/a_abcd1234.gif'
  },
  {
    id: '222222222222222222',
    name: 'Valorant Squad',
    iconUrl: 'https://cdn.discordapp.com/icons/222222222222222222/defg5678.png'
  },
  {
    id: '333333333333333333',
    name: 'Gaming Central',
    iconUrl: null
  }
];

class MockGuildsService {
  static async fetchMutualGuilds() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(MOCK_GUILDS);
      }, 400);
    });
  }
}

export default MockGuildsService;
