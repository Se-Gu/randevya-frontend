import Link from "next/link";
import { Button } from "@/components/ui/button";

export const layout = false;

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center px-4 py-16 sm:px-6 lg:px-8">
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
    </div>
  );
}
