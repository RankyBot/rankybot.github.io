import React, {createContext, useContext, useEffect, useState} from 'react';
import {fetchCurrentUser} from '../../services/api';
import MockAuthService
  from '../../features/auth/infrastructure/MockAuthService';

export const AuthContext = createContext();

export function AuthProvider({children}) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        // Check if in mock mode (local backend)
        if (MockAuthService.isMockMode()) {
          const mockUser = MockAuthService.getMockUser();
          if (mockUser) {
            setUser(mockUser);
          }
          setError(null);
        } else {
          // Real API call for deployed backend
          const userData = await fetchCurrentUser();
          setUser(userData);
          setError(null);
        }
      } catch (err) {
        setUser(null);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const value = {
    user,
    setUser,
    loading,
    error,
    isAuthenticated: !!user,
    isMockMode: MockAuthService.isMockMode()
  };

  return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
