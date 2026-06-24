import MockAuthService from '../../auth/infrastructure/MockAuthService';

class MockUserService {
  static async fetchCurrentUser() {
    return new Promise(resolve => {
      setTimeout(() => {
        const mockUser = MockAuthService.getMockUser();
        if (!mockUser) {
          resolve(null);
          return;
        }
        resolve({
          userId: mockUser.userId,
          username: mockUser.username,
          iconUrl: mockUser.iconUrl
        });
      }, 300);
    });
  }

  static async checkUserPowerAtGuild(guildId) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true); // Always return true for mock
      }, 200);
    });
  }
}

export default MockUserService;
