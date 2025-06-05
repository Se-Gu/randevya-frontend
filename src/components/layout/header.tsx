"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAuthState, authStorage } from "@/lib/auth";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { isAuthenticated, user } = getAuthState();

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
            <Link
              href="/salons"
              className="text-foreground/60 hover:text-foreground transition-colors"
            >
              Kuaför Bul
            </Link>
            {isAuthenticated ? (
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
            ) : (
              <Link href="/login">
                <Button variant="default" size="sm">
                  Kuaför Girişi
                </Button>
              </Link>
            )}
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
              <Link
                href="/salons"
                className="text-foreground/60 hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Kuaför Bul
              </Link>
              {isAuthenticated ? (
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
              ) : (
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="default" size="sm" className="w-full">
                    Kuaför Girişi
                  </Button>
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
