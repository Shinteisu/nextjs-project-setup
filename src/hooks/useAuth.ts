import { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types';
import { mockUsers } from '../constants/mockData';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials extends LoginCredentials {
  username: string;
}

interface UseAuthReturn {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

// Simulated API delay
const MOCK_DELAY = 1000;

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      setError(null);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));

      // Mock authentication logic
      const foundUser = mockUsers.find(u => u.email === credentials.email);
      if (!foundUser) {
        throw new Error('Invalid email or password');
      }

      // Store auth token
      await AsyncStorage.setItem('auth_token', 'mock_token');
      await AsyncStorage.setItem('user', JSON.stringify(foundUser));

      setUser(foundUser);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to login');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (credentials: RegisterCredentials) => {
    try {
      setIsLoading(true);
      setError(null);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));

      // Mock registration validation
      if (mockUsers.some(u => u.email === credentials.email)) {
        throw new Error('Email already exists');
      }

      if (mockUsers.some(u => u.username === credentials.username)) {
        throw new Error('Username already taken');
      }

      // Create new user
      const newUser: User = {
        id: String(mockUsers.length + 1),
        username: credentials.username,
        email: credentials.email,
        followers: 0,
        following: 0,
        isStreaming: false,
        createdAt: new Date(),
      };

      // Store auth token and user data
      await AsyncStorage.setItem('auth_token', 'mock_token');
      await AsyncStorage.setItem('user', JSON.stringify(newUser));

      setUser(newUser);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to register');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));

      // Clear stored data
      await AsyncStorage.multiRemove(['auth_token', 'user']);

      setUser(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to logout');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const checkAuth = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to restore session');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Check authentication status on mount
  useState(() => {
    checkAuth();
  });

  return {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };
}
