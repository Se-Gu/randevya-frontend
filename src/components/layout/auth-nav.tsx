"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import {
  User,
  LogOut,
  Calendar,
  Settings,
  Users,
  LayoutDashboard,
  Scissors,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAuthState, authStorage } from "@/lib/auth";
import { cn } from "@/lib/utils";

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

export function AuthNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const { user } = getAuthState();
    setUserEmail(user?.email || null);
  }, []);

  const handleLogout = () => {
    authStorage.clear();
    router.push("/");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">
                R
              </span>
            </div>
            <span className="font-bold text-xl">Randevya</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center text-sm font-medium text-foreground/60 hover:text-foreground transition-colors px-3 py-2 rounded-md",
                    path === item.href &&
                      "text-foreground bg-accent border-l-4 border-primary"
                  )}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Link>
              );
            })}
            <div className="flex items-center space-x-4 ml-4 pl-4 border-l">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span className="text-sm">
                  {mounted ? (
                    userEmail
                  ) : (
                    <span className="h-4 w-24 bg-secondary animate-pulse rounded" />
                  )}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-foreground/60 hover:text-foreground"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Çıkış Yap
              </Button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center text-sm font-medium text-foreground/60 hover:text-foreground transition-colors px-3 py-2 rounded-md",
                      path === item.href &&
                        "text-foreground bg-accent border-l-4 border-primary"
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {item.title}
                  </Link>
                );
              })}
              <div className="flex items-center space-x-2 text-sm pt-4 border-t">
                <User className="h-4 w-4" />
                <span>
                  {mounted ? (
                    userEmail
                  ) : (
                    <span className="h-4 w-24 bg-secondary animate-pulse rounded" />
                  )}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="justify-start text-foreground/60 hover:text-foreground"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Çıkış Yap
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
