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

const items = [
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

export function DashboardNav() {
  const path = usePathname();

  return (
    <nav className="grid items-start gap-2 p-4">
      {items.map((item) => {
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
