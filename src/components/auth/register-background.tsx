"use client";

import { useState } from "react";
import Image from "next/image";
import { Sparkles, TrendingUp, Users, Calendar } from "lucide-react";

export function RegisterBackground() {
  const [isLoaded, setIsLoaded] = useState(false);

  const features = [
    {
      icon: Calendar,
      title: "Online Randevu",
      description: "7/24 randevu alımı",
    },
    {
      icon: Users,
      title: "Müşteri Yönetimi",
      description: "Kolay takip sistemi",
    },
    {
      icon: TrendingUp,
      title: "Gelir Artışı",
      description: "Daha fazla müşteri",
    },
  ];

  return (
    <div className="hidden md:flex md:w-1/2 relative h-screen items-center justify-center p-10 flex-shrink-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="absolute inset-0">
        <Image
          src="/images/register-bg.jpg"
          alt="Professional salon owner"
          fill
          priority
          className={`object-cover transition-opacity duration-700 ${
            isLoaded ? "opacity-60" : "opacity-0"
          }`}
          sizes="50vw"
          onLoad={() => setIsLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 via-blue-900/60 to-indigo-900/80" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-purple-400/20 rounded-full animate-float-subtle" />
        <div className="absolute top-40 right-16 w-16 h-16 bg-blue-400/20 rounded-full animate-float-subtle-delayed" />
        <div className="absolute bottom-32 left-20 w-12 h-12 bg-indigo-400/20 rounded-full animate-float-subtle-slow" />
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-pink-400/20 rounded-full animate-float-subtle" />
      </div>

      <div className="relative z-10 text-white text-center max-w-md space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <Sparkles className="h-8 w-8 text-yellow-400 animate-twinkle" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              Dijital Dönüşüm
            </h1>
            <Sparkles className="h-8 w-8 text-yellow-400 animate-twinkle animation-delay-300" />
          </div>
          <p className="text-xl text-purple-100 leading-relaxed">
            Salonunuzu geleceğe taşıyın. Müşterileriniz artık 7/24 randevu
            alabilsin.
          </p>
        </div>

        {/* Features */}
        <div className="space-y-4">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="flex items-center space-x-4 p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-white">{feature.title}</h3>
                <p className="text-sm text-purple-200">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="space-y-3">
          <div className="p-4 rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30">
            <p className="text-green-200 font-medium">✨ Ücretsiz başlayın</p>
            <p className="text-sm text-green-300">İlk 30 gün tamamen bedava</p>
          </div>

          <blockquote className="text-sm italic text-purple-200 border-l-2 border-purple-400 pl-4">
            "Randevya sayesinde müşteri sayımız %40 arttı!"
            <footer className="text-xs text-purple-300 mt-1">
              - Ayşe K., Salon Sahibi
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
