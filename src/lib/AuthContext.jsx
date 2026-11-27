import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { base44 } from '@/api/base44Client';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [authError, setAuthError] = useState(null);

  const checkAuth = useCallback(async () => {
    setIsLoadingAuth(true);
    try {
      const me = await base44.auth.me();
      setUser(me);
      setIsAuthenticated(true);
      setAuthError(null);
    } catch (error) {
      const status = error?.status ?? error?.response?.status;
      const reason = error?.data?.extra_data?.reason ?? error?.data?.reason;
      setUser(null);
      setIsAuthenticated(false);
      if (status === 401) {
        // Not signed in: the protected route sends the visitor to /login.
        setAuthError(null);
      } else if (status === 403 || reason === 'user_not_registered') {
        setAuthError({ type: 'user_not_registered', message: error?.message });
      } else {
        setAuthError({ type: 'unknown', message: error?.message || 'Unable to check your session' });
      }
    } finally {
      setIsLoadingAuth(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const logout = useCallback((redirectUrl) => base44.auth.logout(redirectUrl), []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoadingAuth, authError, checkAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};