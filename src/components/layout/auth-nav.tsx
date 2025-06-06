"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  Settings,
  Users,
  LayoutDashboard,
  Scissors,
} from "lucide-react";
import { AdaptiveNav } from "./adaptive-nav";

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

      // Simple heuristic: assume darker backgrounds after scrolling past hero section
      // You can make this more sophisticated by actually sampling the background
      const heroHeight = window.innerHeight * 0.6; // Assume hero is 60% of viewport
      setIsDark(currentScrollY > heroHeight);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { isDark, scrollY };
}

export function AuthNav() {
  return <AdaptiveNav isAuthenticated={true} />;
}
