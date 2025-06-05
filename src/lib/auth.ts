"use client";

export interface User {
  id: string;
  email: string;
  role: string;
  salonId?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export const authStorage = {
  getToken: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("auth_token");
  },

  setToken: (token: string): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem("auth_token", token);
  },

  removeToken: (): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("auth_token");
  },

  getUser: (): User | null => {
    if (typeof window === "undefined") return null;
    const userStr = localStorage.getItem("auth_user");
    return userStr ? JSON.parse(userStr) : null;
  },

  setUser: (user: User): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem("auth_user", JSON.stringify(user));
  },

  removeUser: (): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("auth_user");
  },

  clear: (): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
  },
};

export const getAuthState = (): AuthState => {
  const token = authStorage.getToken();
  const user = authStorage.getUser();

  return {
    token,
    user,
    isAuthenticated: !!(token && user),
  };
};
