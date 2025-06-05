import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">
                  R
                </span>
              </div>
              <span className="font-bold text-xl">Randevya</span>
            </div>
            <p className="text-sm text-foreground/60">
              Favori kuaförlerinizde kolayca randevu alın.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Hızlı Bağlantılar</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/salons"
                  className="text-foreground/60 hover:text-foreground transition-colors"
                >
                  Kuaför Bul
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-foreground/60 hover:text-foreground transition-colors"
                >
                  Kuaför Girişi
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold">Destek</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/help"
                  className="text-foreground/60 hover:text-foreground transition-colors"
                >
                  Yardım Merkezi
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-foreground/60 hover:text-foreground transition-colors"
                >
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="font-semibold">Yasal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="text-foreground/60 hover:text-foreground transition-colors"
                >
                  Gizlilik Politikası
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-foreground/60 hover:text-foreground transition-colors"
                >
                  Kullanım Koşulları
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-foreground/60">
          <p>&copy; 2025 Randevya. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}
