import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            404
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Aradığınız sayfa bulunamadı
          </p>
          <div className="mt-8">
            <Link href="/">
              <Button size="lg">Ana Sayfaya Dön</Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
