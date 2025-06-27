"use client";

import { usePathname } from "next/navigation";
import { NavWrapper } from "./nav-wrapper";

export function RootNav() {
  const pathname = usePathname();
  const isDashboardRoute = pathname?.startsWith("/dashboard");
  const isAdminRoute = pathname?.startsWith("/admin");
  const isLoginPage = pathname === "/login";
  const isRegisterPage = pathname === "/register";

  // Do not render the navbar on dashboard routes or the login page
  if (isDashboardRoute || isAdminRoute || isLoginPage || isRegisterPage) {
    return null;
  }

  return <NavWrapper />;
}
