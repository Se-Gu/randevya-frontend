"use client";

import Link from "next/link";
import {
  Search,
  Calendar,
  Clock,
  Scissors,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Footer } from "@/components/layout/footer";
import Image from "next/image";
import { useState, useEffect, useRef, type TouchEvent } from "react";

export default function HomePage() {
  const [activeSection, setActiveSection] = useState<"customer" | "business">(
    "customer"
  );
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const goToCustomer = () => setActiveSection("customer");
  const goToBusiness = () => setActiveSection("business");

  // Reset timer when user manually changes section
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSection((prev) =>
        prev === "customer" ? "business" : "customer"
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [activeSection]); // Dependency on activeSection resets timer when it changes

  // Handle touch events for swipe
  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const diffX = touchStartX.current - touchEndX.current;
    const threshold = 50; // Minimum swipe distance

    if (Math.abs(diffX) > threshold) {
      if (diffX > 0) {
        // Swipe left, go to business
        goToBusiness();
      } else {
        // Swipe right, go to customer
        goToCustomer();
      }
    }

    // Reset values
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Carousel Hero Section */}
        <section
          className="relative h-screen overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Customer Section */}
          <div
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              activeSection === "customer"
                ? "opacity-100 z-20 translate-y-0"
                : "opacity-0 z-10 translate-y-4"
            }`}
          >
            <div className="absolute inset-0">
              <Image
                src="/images/homepage-cta-bg.png"
                alt="Modern salon interior"
                fill
                priority
                style={{ objectFit: "cover" }}
                className="z-0"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-slate-800/30 to-slate-900/60" />
            </div>

            <div className="relative z-10 h-full flex items-center justify-center">
              <div className="container mx-auto px-4 text-center text-white">
                <div className="max-w-4xl mx-auto backdrop-blur-sm bg-black/30 p-8 rounded-xl">
                  <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                    <span className="block">Hemen</span>
                    <span className="block text-blue-400">
                      Randevunuzu Alın
                    </span>
                  </h1>
                  <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white/90 mb-8">
                    Bölgenizdeki en iyi kuaför ve berberlerde randevu bulun.
                    Kolay, hızlı ve pratik.
                  </p>
                  <Link href="/book">
                    <Button
                      size="lg"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Search className="mr-2 h-5 w-5" />
                      Randevu Bul
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Business Section */}
          <div
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              activeSection === "business"
                ? "opacity-100 z-20 translate-y-0"
                : "opacity-0 z-10 -translate-y-4"
            }`}
          >
            <div className="absolute inset-0">
              <Image
                src="/images/homepage-hero-bg.jpg"
                alt="Professional salon owner"
                fill
                priority
                style={{ objectFit: "cover", objectPosition: "center" }}
                className="z-0"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-slate-800/40 to-slate-900/70" />
            </div>

            <div className="relative z-10 h-full flex items-center">
              <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="text-white space-y-6 backdrop-blur-sm bg-black/30 p-8 rounded-xl">
                    <h2 className="text-5xl md:text-6xl font-bold tracking-tight">
                      <span className="block text-green-400">
                        İşletme Sahibi
                      </span>
                      <span className="block">misiniz?</span>
                    </h2>
                    <p className="text-xl md:text-2xl text-white/90">
                      Salonunuzu dijital dünyaya taşıyın. Randevularınızı
                      yönetin, müşterilerinizi artırın.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link href="/register">
                        <Button
                          size="lg"
                          className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <TrendingUp className="mr-2 h-5 w-5" />
                          Ücretsiz Başlayın
                        </Button>
                      </Link>
                      <Link href="/login">
                        <Button
                          variant="outline"
                          size="lg"
                          className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white px-8 py-4 text-lg"
                        >
                          <Scissors className="mr-2 h-5 w-5" />
                          Giriş Yapın
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className="hidden md:block"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Larger Carousel Navigation - Desktop Only */}
          <button
            onClick={goToCustomer}
            className={`hidden md:block absolute left-6 top-1/2 transform -translate-y-1/2 z-30 p-4 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 hover:scale-110 transition-all duration-300 shadow-lg ${
              activeSection === "customer"
                ? "opacity-50 cursor-not-allowed"
                : "opacity-100"
            }`}
            disabled={activeSection === "customer"}
          >
            <ChevronLeft className="h-8 w-8" />
          </button>

          <button
            onClick={goToBusiness}
            className={`hidden md:block absolute right-6 top-1/2 transform -translate-y-1/2 z-30 p-4 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 hover:scale-110 transition-all duration-300 shadow-lg ${
              activeSection === "business"
                ? "opacity-50 cursor-not-allowed"
                : "opacity-100"
            }`}
            disabled={activeSection === "business"}
          >
            <ChevronRight className="h-8 w-8" />
          </button>

          {/* Carousel Dots - All Devices */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
            <div className="flex space-x-3">
              <button
                onClick={goToCustomer}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  activeSection === "customer"
                    ? "bg-white scale-125"
                    : "bg-white/40 hover:bg-white/60"
                }`}
              />
              <button
                onClick={goToBusiness}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  activeSection === "business"
                    ? "bg-white scale-125"
                    : "bg-white/40 hover:bg-white/60"
                }`}
              />
            </div>
          </div>

          {/* Mobile Swipe Hint */}
          <div className="md:hidden absolute bottom-20 left-1/2 transform -translate-x-1/2 z-30">
            <div className="text-white/60 text-xs text-center">
              <div className="flex items-center space-x-2">
                <ChevronLeft className="h-3 w-3" />
                <span>Kaydırın</span>
                <ChevronRight className="h-3 w-3" />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
                Neden Randevya?
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Randevu almayı basit ve stressiz hale getiriyoruz
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <Card className="text-center hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Search className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-slate-900">
                    Kolay Keşif
                  </h3>
                  <p className="text-slate-600">
                    Sezgisel arama ve filtreleme sistemimizle size en uygun
                    kuaförü bulun.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-slate-900">
                    Anlık Rezervasyon
                  </h3>
                  <p className="text-slate-600">
                    Gerçek zamanlı müsaitlik kontrolü ile anında randevu alın.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-6 w-6 text-slate-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-slate-900">
                    Hesap Gerektirmez
                  </h3>
                  <p className="text-slate-600">
                    Hesap oluşturmadan randevu alın. Hızlı ve zahmetsiz.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 md:py-24 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
                Nasıl Çalışır?
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Randevu almak 1-2-3 kadar kolay
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl shadow-lg">
                  <Search className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-slate-900">
                  Kuaför Seçin
                </h3>
                <p className="text-slate-600">
                  Bölgenizdeki kuaförleri inceleyin, hizmetlerini, fiyatlarını
                  ve yorumlarını kontrol edin.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl shadow-lg">
                  <Calendar className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-slate-900">
                  Hizmet Seçin
                </h3>
                <p className="text-slate-600">
                  İstediğiniz hizmeti seçin ve tercih ettiğiniz tarih ve saati
                  belirleyin.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-slate-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl shadow-lg">
                  <Clock className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-slate-900">
                  Onaylayın ve Gidin
                </h3>
                <p className="text-slate-600">
                  Bilgilerinizi girin, randevunuzu onaylayın ve onay mesajını
                  alın.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
