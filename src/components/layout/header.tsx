"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAuthState, authStorage } from "@/lib/auth";

interface HeaderProps {
  containerClassName?: string;
}

export function Header({ containerClassName = "" }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { isAuthenticated, user } = getAuthState();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    authStorage.clear();
    router.push("/");
    router.refresh();
  };

  // Prevent hydration mismatch by not rendering auth-dependent content until mounted
  const renderAuthContent = () => {
    if (!mounted) {
      return (
        <div className="flex items-center space-x-4">
          <div className="h-4 w-24 bg-secondary animate-pulse rounded" />
          <div className="h-4 w-24 bg-secondary animate-pulse rounded" />
        </div>
      );
    }

    if (isAuthenticated) {
      return (
        <div className="flex items-center space-x-4">
          <Link
            href="/dashboard"
            className="text-foreground/60 hover:text-foreground transition-colors"
          >
            Kontrol Paneli
          </Link>
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span className="text-sm">{user?.email}</span>
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
      );
    }

    return (
      <Link href="/login">
        <Button variant="default" size="sm">
          Kuaför Girişi
        </Button>
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className={`container mx-auto px-4 ${containerClassName}`}>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">
                R
              </span>
            </div>
            <span className="font-bold text-xl">Randevya</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {!mounted ? (
              <div className="h-4 w-24 bg-secondary animate-pulse rounded" />
            ) : (
              !isAuthenticated && (
                <Link
                  href="/salons"
                  className="text-foreground/60 hover:text-foreground transition-colors"
                >
                  Kuaför Bul
                </Link>
              )
            )}
            {renderAuthContent()}
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
              {!mounted ? (
                <>
                  <div className="h-4 w-24 bg-secondary animate-pulse rounded" />
                  <div className="h-4 w-24 bg-secondary animate-pulse rounded" />
                </>
              ) : (
                <>
                  {!isAuthenticated && (
                    <Link
                      href="/salons"
                      className="text-foreground/60 hover:text-foreground transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Kuaför Bul
                    </Link>
                  )}
                  {isAuthenticated && (
                    <>
                      <Link
                        href="/dashboard"
                        className="text-foreground/60 hover:text-foreground transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Kontrol Paneli
                      </Link>
                      <div className="flex items-center space-x-2 text-sm">
                        <User className="h-4 w-4" />
                        <span>{user?.email}</span>
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
                    </>
                  )}
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
