// Profile-based environment configuration (Spring-style)
const PROFILE = process.env.REACT_APP_PROFILE || 'deployed';

const profiles = {
  local: {
    apiBaseUrl: 'http://localhost:8080',
    environment: 'development',
    mockMode: false
  },
  deployed: {
    apiBaseUrl: 'https://api.ranky.top',
    environment: 'production',
    mockMode: false
  },
  mock: {
    apiBaseUrl: 'http://localhost:3000',
    environment: 'development',
    mockMode: true
  }
};

const config = profiles[PROFILE] || profiles.deployed;

export default config;
