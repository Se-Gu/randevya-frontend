"use client";

import { useAuth } from "@/providers";
import { PublicNav } from "./public-nav";
import { AuthNav } from "./auth-nav";

export function NavWrapper() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <AuthNav /> : <PublicNav />;
}
