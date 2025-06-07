"use client";

import { AdaptiveNav } from "./adaptive-nav";
import { getAuthState } from "@/lib/auth";

export function AuthNav() {
  const { role } = getAuthState();
  return <AdaptiveNav isAuthenticated={true} role={role} />;
}
