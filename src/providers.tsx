"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getAuthState, authStorage } from "@/lib/auth";

interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  role: string | null;
  login: (user: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  role: null,
  login: () => {},
  logout: () => {},
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const { isAuthenticated, user, role } = getAuthState();
    setIsAuthenticated(isAuthenticated);
    setUser(user);
    setRole(role);
  }, []);

  const login = (userData: any) => {
    setIsAuthenticated(true);
    setUser(userData);
    setRole(userData?.role ?? null);
    if (userData?.role) {
      authStorage.setRole(userData.role);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setRole(null);
    authStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
