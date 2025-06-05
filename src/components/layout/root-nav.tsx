"use client";

import { usePathname } from "next/navigation";
import { NavWrapper } from "./nav-wrapper";

export function RootNav() {
  const pathname = usePathname();
  const isDashboardRoute = pathname?.startsWith("/dashboard");
  const isLoginPage = pathname === "/login";

  // Do not render the navbar on dashboard routes or the login page
  if (isDashboardRoute || isLoginPage) {
    return null;
  }

  return <NavWrapper />;
}
