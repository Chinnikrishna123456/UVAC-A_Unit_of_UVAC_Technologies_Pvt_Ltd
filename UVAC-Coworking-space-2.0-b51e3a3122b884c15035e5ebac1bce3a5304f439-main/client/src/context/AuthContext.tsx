  import { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { apiRequest } from '../lib/queryClient';
import { QueryClient, useQueryClient } from '@tanstack/react-query';

// Add debounce utility function
const debounce = <F extends (...args: any[]) => any>(func: F, wait: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<F>): Promise<ReturnType<F>> => {
    clearTimeout(timeout);
    return new Promise((resolve) => {
      timeout = setTimeout(() => resolve(func(...args)), wait);
    });
  };
};

interface User {
  id?: number | string;
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  company?: string;
  role?: string;
  profile_image?: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  company?: string;
  role: string;
  termsAccepted: boolean;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  token: string | null;
  loading: boolean;
  login: (login: string, password: string, setLocation: (path: string) => void) => Promise<boolean>;
  register: (data: RegisterData, setLocation: (path: string) => void) => Promise<any>;
  logout: () => Promise<boolean>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  });
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();

  const validateToken = (token: string | null): boolean => {
    if (!token) return false;
    if (typeof token !== 'string') return false;
    if (token.trim() === '') return false;
    // Basic JWT format validation
    const parts = token.split('.');
    return parts.length === 3 && parts.every(part => part.length > 0);
  };

  const checkAuth = useCallback(async () => {
    const storedToken = localStorage.getItem('token');
    
    // If no token, clear auth state and return
    if (!storedToken) {
      setUser(null);
      setToken(null);
      setLoading(false);
      return;
    }

    // If we already have a user and token, no need to check again
    if (user && token) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await apiRequest('GET', '/api/auth/user', undefined, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });

      if (response?.user) {
        setUser(response.user);
        setToken(storedToken);
      } else {
        // If no user in response, clear auth
        localStorage.removeItem('token');
        setUser(null);
        setToken(null);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      localStorage.removeItem('token');
      setUser(null);
      setToken(null);
    } finally {
      setLoading(false);
    }
  }, [user, token]);

  // Initial auth check on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Listen for token changes in localStorage with debounce
  useEffect(() => {
    const handleStorageChange = debounce(() => {
      const newToken = localStorage.getItem('token');
      if (newToken !== token) {
        checkAuth();
      }
    }, 500);

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [checkAuth, token]);

  const login = async (login: string, password: string, setLocation: (path: string) => void) => {
    try {
      // Check if login is an email or username
      const isEmail = login.includes('@');
      
      // Send both fields to match server expectations
      const payload = {
        username: login,
        email: login,
        password
      };

      const response = await apiRequest('POST', '/api/auth/login', payload);

      if (response?.success && response?.data?.token && response?.data?.user) {
        localStorage.setItem('token', response.data.token);
        setToken(response.data.token);
        setUser(response.data.user);
        queryClient.invalidateQueries();
        setLocation('/dashboard');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem('token');
      setUser(null);
      setToken(null);
      queryClient.invalidateQueries();
      return true;
    } catch (error) {
      console.error('Logout error:', error);
      return false;
    }
  };

  const register = useCallback(async (data: RegisterData) => {
    try {
      // Ensure company is properly formatted
      const formattedData = {
        ...data,
        company: data.company?.trim() || undefined
      };
      
      console.log('Registering user with data:', formattedData);
      
      const response = await apiRequest('POST', '/api/auth/register', formattedData);
      
      console.log('Registration response:', response);
      
      if (response?.token && response?.user) {
        localStorage.setItem('token', response.token);
        setUser(response.user);
        setToken(response.token);
        queryClient.invalidateQueries();
        return { success: true, data: response };
      }
      
      return { success: false, error: 'Registration failed' };
    } catch (error: unknown) {
      console.error('Registration error:', error);
      if (error instanceof Error) {
        if (error.message.includes('User already exists')) {
          throw new Error('This email is already registered');
        }
        throw error;
      }
      throw new Error('An unknown error occurred');
    }
  }, [queryClient]);

  const registerWithLocation = async (data: RegisterData, setLocation: (path: string) => void) => {
    const result = await register(data);
    if (result.success) {
      await new Promise(resolve => setTimeout(resolve, 300));
      setLocation('/dashboard');
    }
    return result;
  };

  const value = useMemo(() => ({
    user,
    setUser,
    token,
    loading,
    login,
    logout,
    checkAuth,
    register: registerWithLocation,
  }), [user, token, loading, login, logout, checkAuth, registerWithLocation]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
