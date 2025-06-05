"use client";

import { usePathname } from "next/navigation";
import { NavWrapper } from "./nav-wrapper";

export function RootNav() {
  const pathname = usePathname();
  const isDashboardRoute = pathname?.startsWith("/dashboard");

  if (isDashboardRoute) {
    return null;
  }

  return <NavWrapper />;
}
