import config from '../../../config';

// Different avatar styles from DiceBear
const AVATAR_STYLES = [
  'avataaars',
  'pixel-art',
  'lorelei',
  'notionists',
  'fun-emoji'
];

// Different image formats to simulate various user avatar types
const IMAGE_FORMATS = ['svg', 'png', 'jpg', 'gif', 'webp'];

// Mock user for local development
function generateMockUser() {
  const randomStyle = AVATAR_STYLES[Math.floor(
      Math.random() * AVATAR_STYLES.length)];
  const randomFormat = IMAGE_FORMATS[Math.floor(
      Math.random() * IMAGE_FORMATS.length)];
  const randomSeed = Math.random().toString(36).substring(2, 15);

  let iconUrl;

  // GIFs come from Robohash, others from DiceBear
  if (randomFormat === 'gif') {
    iconUrl = `https://robohash.org/${randomSeed}.gif?size=256x256`;
  } else {
    iconUrl = `https://api.dicebear.com/7.x/${randomStyle}/${randomFormat}?seed=${randomSeed}`;
  }

  return {
    userId: '123456789',
    username: 'MockUser',
    iconUrl
  };
}

class MockAuthService {
  static isMockMode() {
    return config.apiBaseUrl === 'http://localhost:8080';
  }

  static loginWithDiscordMock() {
    // Generate new mock user with random avatar
    const mockUser = generateMockUser();

    // Set mock user in localStorage
    localStorage.setItem('_mock_user', JSON.stringify(mockUser));
    localStorage.setItem('_mock_session', 'MOCK_SESSION_TOKEN');

    // Reload to trigger auth context update
    window.location.reload();
  }

  static logoutMock() {
    localStorage.removeItem('_mock_user');
    localStorage.removeItem('_mock_session');
    window.location.reload();
  }

  static getMockUser() {
    const user = localStorage.getItem('_mock_user');
    return user ? JSON.parse(user) : null;
  }

  static isMockAuthenticated() {
    return !!localStorage.getItem('_mock_session');
  }
}

export default MockAuthService;
