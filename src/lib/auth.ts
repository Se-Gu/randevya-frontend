"use client";

import { User, LoginResponse } from "@/types";
import Cookies from "js-cookie";

const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";
const ROLE_KEY = "auth_role";

export const authStorage = {
  getToken: () => {
    return Cookies.get(TOKEN_KEY) || null;
  },

  setToken: (token: string) => {
    Cookies.set(TOKEN_KEY, token, {
      expires: 7, // 7 days
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
  },

  removeToken: () => {
    Cookies.remove(TOKEN_KEY);
  },

  getUser: (): User | null => {
    const user = Cookies.get(USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  setUser: (user: User) => {
    Cookies.set(USER_KEY, JSON.stringify(user), {
      expires: 7, // 7 days
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
  },

  removeUser: () => {
    Cookies.remove(USER_KEY);
  },

  getRole: (): string | null => {
    return Cookies.get(ROLE_KEY) || null;
  },

  setRole: (role: string) => {
    Cookies.set(ROLE_KEY, role, {
      expires: 7,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
  },

  removeRole: () => {
    Cookies.remove(ROLE_KEY);
  },

  set: (data: LoginResponse) => {
    authStorage.setToken(data.access_token);
    authStorage.setUser(data.user);
    if (data.user.role) {
      authStorage.setRole(data.user.role);
    }
  },

  clear: () => {
    authStorage.removeToken();
    authStorage.removeUser();
    authStorage.removeRole();
  },
};

export function getAuthState() {
  const token = authStorage.getToken();
  const user = authStorage.getUser();
  const role = authStorage.getRole();

  return {
    isAuthenticated: !!token,
    user,
    role,
  };
}
