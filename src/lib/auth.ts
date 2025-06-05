"use client";

import { User, LoginResponse } from "@/types";
import Cookies from "js-cookie";

const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

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

  set: (data: LoginResponse) => {
    authStorage.setToken(data.access_token);
    authStorage.setUser(data.user);
  },

  clear: () => {
    authStorage.removeToken();
    authStorage.removeUser();
  },
};

export function getAuthState() {
  const token = authStorage.getToken();
  const user = authStorage.getUser();

  return {
    isAuthenticated: !!token,
    user,
  };
}
