"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Calendar,
  Settings,
  Users,
  User,
  LayoutDashboard,
  Scissors,
} from "lucide-react";
import { getAuthState } from "@/lib/auth";

const ownerItems = [
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
  {
    title: "Personel",
    href: "/dashboard/staff",
    icon: Users,
  },
];

const staffItems = [
  {
    title: "Takvim",
    href: "/dashboard/staff/calendar",
    icon: Calendar,
  },
  {
    title: "Analizler",
    href: "/dashboard/staff/analytics",
    icon: LayoutDashboard,
  },
  {
    title: "Ayarlar",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export function DashboardNav() {
  const path = usePathname();
  const { role } = getAuthState();
  const navItems = role === "owner" ? ownerItems : staffItems;

  return (
    <nav className="grid items-start gap-2 p-4">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              path === item.href ? "bg-accent" : "transparent"
            )}
          >
            <Icon className="mr-2 h-4 w-4" />
            <span>{item.title}</span>
          </Link>
        );
      })}
    </nav>
  );
}
