import { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Giriş Yap",
  description: "Hesabınıza giriş yapın",
};

export default function LoginPage() {
  return (
    <div className="h-screen overflow-hidden flex">
      {/* Background Image Section - Hidden on mobile, visible on lg screens */}
      <div className="hidden lg:flex lg:w-1/2 relative h-screen items-center justify-center p-10 flex-shrink-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/salon-bg.jpg')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-zinc-900/20" />
        </div>
        <div className="relative z-10 text-white text-center max-w-md mt-12">
          <blockquote className="space-y-6">
            <p className="text-3xl italic font-serif leading-tight drop-shadow-md">
              &ldquo;Güzellik sadece dışarıda görünen değil, içeriden parlayan
              bir ışıktır.&rdquo;
            </p>
            <footer className="text-lg font-semibold">Estee Lauder</footer>
          </blockquote>
        </div>
      </div>

      {/* Login Form Section - Full width on mobile, half width on lg screens */}
      <div className="flex-1 flex items-center justify-center p-8 h-full overflow-y-auto">
        <div className="w-full max-w-sm space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight">Hoş Geldiniz</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Hesabınıza giriş yapmak için bilgilerinizi girin
            </p>
          </div>

          <LoginForm />

          <div className="text-center text-sm">
            <p className="text-muted-foreground">
              Hesabınız yok mu?{" "}
              <Link
                href="/register"
                className="font-medium text-primary hover:text-primary/90"
              >
                Kayıt Olun
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
