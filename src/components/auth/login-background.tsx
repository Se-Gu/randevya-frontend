"use client";

import { useState } from "react";
import Image from "next/image";

export function LoginBackground() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="hidden lg:flex lg:w-1/2 relative h-screen items-center justify-center p-10 flex-shrink-0 bg-zinc-900">
      <div className="absolute inset-0">
        <Image
          src="/images/salon-bg.jpg"
          alt="Salon background"
          fill
          priority
          className={`object-cover transition-opacity duration-700 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          sizes="50vw"
          onLoad={() => setIsLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-zinc-900/20" />
      </div>
      <div className="relative z-10 text-white text-center max-w-md mt-12">
        <blockquote className="space-y-6">
          <p className="text-3xl italic font-serif leading-tight drop-shadow-md">
            &ldquo;Güzellik sadece dışarıda görünen değil, içeriden parlayan bir
            ışıktır.&rdquo;
          </p>
          <footer className="text-lg font-semibold">Estee Lauder</footer>
        </blockquote>
      </div>
    </div>
  );
}
