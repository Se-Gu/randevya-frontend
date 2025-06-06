import { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";
import { LoginBackground } from "@/components/auth/login-background";

export const metadata: Metadata = {
  title: "Giriş Yap",
  description: "Hesabınıza giriş yapın",
};

export default function LoginPage() {
  return (
    <div className="h-screen overflow-hidden flex">
      {/* Background Image Section */}
      <LoginBackground />

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
