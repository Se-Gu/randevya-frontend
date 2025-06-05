import Link from "next/link";
import { Search, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/20 py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Mükemmel
              <span className="text-primary block">Randevunuzu Alın</span>
            </h1>
            <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
              Bölgenizdeki en iyi kuaförlerde randevu bulun ve rezervasyon
              yapın. Kolay, hızlı ve pratik.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/salons">
                <Button size="lg" className="w-full sm:w-auto">
                  <Search className="mr-2 h-5 w-5" />
                  Kuaför Bul
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Kuaför Sahibi? Giriş Yap
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Neden Randevya?
              </h2>
              <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
                Randevu almayı basit ve stressiz hale getiriyoruz
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Search className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Kolay Keşif</h3>
                  <p className="text-foreground/70">
                    Sezgisel arama ve filtreleme sistemimizle size en uygun
                    kuaförü bulun.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Anlık Rezervasyon
                  </h3>
                  <p className="text-foreground/70">
                    Gerçek zamanlı müsaitlik kontrolü ile anında randevu alın.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Hesap Gerektirmez
                  </h3>
                  <p className="text-foreground/70">
                    Hesap oluşturmadan randevu alın. Hızlı ve zahmetsiz.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 md:py-24 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Nasıl Çalışır?
              </h2>
              <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
                Randevu almak 1-2-3 kadar kolay
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold text-xl">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-2">Kuaför Seçin</h3>
                <p className="text-foreground/70">
                  Bölgenizdeki kuaförleri inceleyin, hizmetlerini, fiyatlarını
                  ve yorumlarını kontrol edin.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold text-xl">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-2">Hizmet Seçin</h3>
                <p className="text-foreground/70">
                  İstediğiniz hizmeti seçin ve tercih ettiğiniz tarih ve saati
                  belirleyin.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold text-xl">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Onaylayın ve Gidin
                </h3>
                <p className="text-foreground/70">
                  Bilgilerinizi girin, randevunuzu onaylayın ve onay mesajını
                  alın.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Bir Sonraki Randevunuzu Almaya Hazır mısınız?
            </h2>
            <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
              Güzellik ihtiyaçları için Randevya'ya güvenen binlerce mutlu
              müşteriye katılın.
            </p>
            <Link href="/salons">
              <Button size="lg">Hemen Başlayın</Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
