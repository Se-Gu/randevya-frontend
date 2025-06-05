import { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Giriş Yap",
  description: "Hesabınıza giriş yapın",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Testimonial Section - Hidden on mobile, visible on lg screens */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div className="absolute inset-0 bg-zinc-900">
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-zinc-900/20" />
        </div>
        <div className="relative w-full flex flex-col justify-between p-10 text-white">
          <div className="flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
              aria-hidden="true"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Randevya
          </div>
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Bu platform, kuaför randevularımızı yönetme şeklimizi
              tamamen değiştirdi. Kullanımı kolay, verimli ve müşteri
              deneyimimizi önemli ölçüde iyileştirdi.&rdquo;
            </p>
            <footer className="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>
      </div>

      {/* Login Form Section - Full width on mobile, half width on lg screens */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
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
