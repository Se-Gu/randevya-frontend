"use client";

import { useState, useEffect, useRef } from "react";
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

const ownerNavItems = [
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

const staffNavItems = [
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

export function AdaptiveNav({
  isAuthenticated = true,
  role = null,
}: {
  isAuthenticated?: boolean;
  role?: string | null;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const path = usePathname();
  const router = useRouter();
  const navItems = role === "owner" ? ownerNavItems : staffNavItems;

  useEffect(() => {
    setMounted(true);
    if (isAuthenticated) {
      const { user } = getAuthState();
      setUserEmail(user?.email || null);
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    authStorage.clear();
    router.push("/");
    router.refresh();
  };

  // Primary button styles (for Kuaför Girişi and Kuaför Bul)
  const getPrimaryButtonStyles = () => ({
    background: `linear-gradient(135deg, rgba(99, 102, 241, 0.9) 0%, rgba(139, 92, 246, 0.9) 100%)`,
    color: "white",
    textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
    boxShadow: "0 4px 15px rgba(99, 102, 241, 0.3)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
  });

  // Shared text styles for consistency
  const getTextStyles = () => ({
    color: "rgba(15, 23, 42, 0.8)",
    textShadow: `
      0 0 20px rgba(255, 255, 255, 0.9),
      0 2px 4px rgba(255, 255, 255, 0.7)
    `,
  });

  // Active nav item styles
  const getActiveNavStyles = () => ({
    color: "rgba(15, 23, 42, 0.95)",
    textShadow: `
      0 0 20px rgba(255, 255, 255, 0.9),
      0 2px 4px rgba(255, 255, 255, 0.7),
      0 1px 2px rgba(0, 0, 0, 0.1)
    `,
    background: `
      linear-gradient(135deg, 
        rgba(255, 255, 255, 0.4) 0%, 
        rgba(255, 255, 255, 0.2) 100%
      )
    `,
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
  });

  // Hover effect styles for nav items (including Çıkış Yap)
  const getHoverStyles = () => ({
    background: `
      linear-gradient(135deg, 
        rgba(255, 255, 255, 0.2) 0%, 
        rgba(255, 255, 255, 0.1) 100%
      )
    `,
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
  });

  return (
    <header
      ref={navRef}
      className="sticky top-0 z-50 w-full transition-all duration-500 ease-out"
      style={{
        background: `
          linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.1) 0%,
            rgba(255, 255, 255, 0.05) 50%,
            rgba(0, 0, 0, 0.05) 100%
          ),
          backdrop-filter: blur(20px)
        `,
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.18)",
        boxShadow: `
          0 8px 32px rgba(0, 0, 0, 0.1),
          inset 0 1px 0 rgba(255, 255, 255, 0.2),
          inset 0 -1px 0 rgba(0, 0, 0, 0.1)
        `,
      }}
    >
      {/* Adaptive text shadow overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(
              ellipse at center,
              rgba(0, 0, 0, 0.3) 0%,
              rgba(0, 0, 0, 0.1) 40%,
              transparent 70%
            )
          `,
          mixBlendMode: "multiply",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex h-16 items-center justify-between">
          {/* Logo with adaptive styling */}
          <Link
            href={isAuthenticated ? "/dashboard" : "/"}
            className="flex items-center space-x-2 group"
          >
            <div
              className="h-8 w-8 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110"
              style={{
                background: `
                  linear-gradient(135deg, 
                    rgba(99, 102, 241, 0.9) 0%, 
                    rgba(139, 92, 246, 0.9) 100%
                  )
                `,
                boxShadow: "0 4px 15px rgba(99, 102, 241, 0.3)",
              }}
            >
              <span
                className="font-bold text-lg transition-all duration-300"
                style={{
                  color: "white",
                  textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                }}
              >
                R
              </span>
            </div>
            <span
              className="font-bold text-xl transition-all duration-300 group-hover:scale-105"
              style={{
                color: "rgba(15, 23, 42, 0.9)",
                textShadow: `
                  0 0 20px rgba(255, 255, 255, 0.8),
                  0 2px 4px rgba(255, 255, 255, 0.6),
                  0 1px 2px rgba(0, 0, 0, 0.2)
                `,
                filter: "contrast(1.2)",
              }}
            >
              Randevya
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                {mounted &&
                  navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = path === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex items-center text-sm font-medium transition-all duration-300 px-3 py-2 rounded-lg group relative overflow-hidden",
                          isActive && "scale-105"
                        )}
                        style={
                          isActive ? getActiveNavStyles() : getTextStyles()
                        }
                      >
                        <Icon className="mr-2 h-4 w-4" />
                        {item.title}
                        {/* Hover effect overlay */}
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"
                          style={getHoverStyles()}
                        />
                      </Link>
                    );
                  })}
                <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-white/30">
                  <div
                    className="flex items-center space-x-2 transition-all duration-300"
                    style={getTextStyles()}
                  >
                    <User className="h-4 w-4" />
                    <span className="text-sm">
                      {mounted ? (
                        userEmail
                      ) : (
                        <span className="h-4 w-24 bg-white/30 animate-pulse rounded" />
                      )}
                    </span>
                  </div>
                  {/* Çıkış Yap button with IDENTICAL styling to nav items */}
                  <div className="relative group">
                    <button
                      onClick={handleLogout}
                      className="flex items-center text-sm font-medium transition-all duration-300 px-3 py-2 rounded-lg hover:scale-105 relative overflow-hidden"
                      style={getTextStyles()}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Çıkış Yap
                      {/* IDENTICAL hover effect overlay as nav items */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"
                        style={getHoverStyles()}
                      />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Kuaför Bul - IDENTICAL styling to Kuaför Girişi */}
                <Link href="/salons">
                  <Button
                    size="sm"
                    className="transition-all duration-300 hover:scale-105 rounded-lg border-0"
                    style={getPrimaryButtonStyles()}
                  >
                    Kuaför Bul
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    size="sm"
                    className="transition-all duration-300 hover:scale-105 rounded-lg border-0"
                    style={getPrimaryButtonStyles()}
                  >
                    Kuaför Girişi
                  </Button>
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden transition-all duration-300 hover:scale-110 rounded-lg border-0"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={getTextStyles()}
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
          <div
            className="md:hidden border-t py-4 transition-all duration-300"
            style={{
              borderColor: "rgba(255, 255, 255, 0.2)",
              background: `
                linear-gradient(135deg, 
                  rgba(255, 255, 255, 0.1) 0%, 
                  rgba(255, 255, 255, 0.05) 100%
                )
              `,
              backdropFilter: "blur(10px)",
              borderRadius: "0 0 12px 12px",
            }}
          >
            <nav className="flex flex-col space-y-4">
              {isAuthenticated ? (
                <>
                  {mounted &&
                    navItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = path === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center text-sm font-medium transition-all duration-300 px-3 py-2 rounded-lg"
                          onClick={() => setIsMenuOpen(false)}
                          style={
                            isActive ? getActiveNavStyles() : getTextStyles()
                          }
                        >
                          <Icon className="mr-2 h-4 w-4" />
                          {item.title}
                        </Link>
                      );
                    })}
                  <div
                    className="flex items-center space-x-2 text-sm pt-4 border-t"
                    style={{
                      borderColor: "rgba(255, 255, 255, 0.2)",
                      ...getTextStyles(),
                    }}
                  >
                    <User className="h-4 w-4" />
                    <span>
                      {mounted ? (
                        userEmail
                      ) : (
                        <span className="h-4 w-24 bg-white/30 animate-pulse rounded" />
                      )}
                    </span>
                  </div>
                  {/* Mobile Çıkış Yap - IDENTICAL styling to nav items */}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center text-sm font-medium transition-all duration-300 px-3 py-2 rounded-lg"
                    style={getTextStyles()}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Çıkış Yap
                  </button>
                </>
              ) : (
                <>
                  {/* Mobile Kuaför Bul - IDENTICAL styling to Kuaför Girişi */}
                  <Link href="/salons" onClick={() => setIsMenuOpen(false)}>
                    <Button
                      size="sm"
                      className="w-full transition-all duration-300 rounded-lg border-0"
                      style={getPrimaryButtonStyles()}
                    >
                      Kuaför Bul
                    </Button>
                  </Link>
                  <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button
                      size="sm"
                      className="w-full transition-all duration-300 rounded-lg border-0"
                      style={getPrimaryButtonStyles()}
                    >
                      Kuaför Girişi
                    </Button>
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
