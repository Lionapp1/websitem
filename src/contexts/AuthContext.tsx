import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { AdminCredentials } from '../types';

interface AuthContextType {
  isAuthenticated: boolean;
  credentials: AdminCredentials;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  updateCredentials: (creds: Partial<AdminCredentials>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const DEFAULT_CREDS: AdminCredentials = {
  email: 'admin@skdesignsx.com',
  password: 'SkDx2026!',
  displayName: 'SK Designs X',
};

const CREDS_KEY = 'skdx_admin_creds';
const AUTH_KEY = 'skdx_admin_auth';

function loadCredentials(): AdminCredentials {
  try {
    const raw = localStorage.getItem(CREDS_KEY);
    if (raw) return { ...DEFAULT_CREDS, ...JSON.parse(raw) };
  } catch { /* ignore */ }
  return { ...DEFAULT_CREDS };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState<AdminCredentials>(DEFAULT_CREDS);

  useEffect(() => {
    setCredentials(loadCredentials());
    if (localStorage.getItem(AUTH_KEY) === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (email: string, password: string) => {
    const creds = loadCredentials();
    if (
      email.trim().toLowerCase() === creds.email.toLowerCase() &&
      password === creds.password
    ) {
      localStorage.setItem(AUTH_KEY, 'true');
      setIsAuthenticated(true);
      setCredentials(creds);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
  };

  const updateCredentials = (partial: Partial<AdminCredentials>) => {
    const next = { ...loadCredentials(), ...partial };
    localStorage.setItem(CREDS_KEY, JSON.stringify(next));
    setCredentials(next);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, credentials, login, logout, updateCredentials }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
