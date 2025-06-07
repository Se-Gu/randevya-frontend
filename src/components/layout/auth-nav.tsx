"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  Settings,
  Users,
  User,
  LayoutDashboard,
  Scissors,
} from "lucide-react";
import { AdaptiveNav } from "./adaptive-nav";
import { getAuthState } from "@/lib/auth";

const navItems = [
  {
    title: "Genel Bakış",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Randevular",
    href: "/dashboard/appointments",
    icon: Calendar,
  },
  {
    title: "Personel",
    href: "/dashboard/staff",
    icon: User,
  },
  {
    title: "Müşteriler",
    href: "/dashboard/customers",
    icon: Users,
  },
  {
    title: "Hizmetler",
    href: "/dashboard/services",
    icon: Scissors,
  },
  {
    title: "Ayarlar",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

// Hook to detect background brightness
function useBackgroundBrightness() {
  const [isDark, setIsDark] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      const heroHeight = window.innerHeight * 0.6;
      setIsDark(currentScrollY > heroHeight);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { isDark, scrollY };
}

export function AuthNav() {
  const { role } = getAuthState();
  return <AdaptiveNav isAuthenticated={true} role={role} />;
}
