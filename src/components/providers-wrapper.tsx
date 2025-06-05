"use client";

import { Providers } from "@/components/providers";
import { RootNav } from "@/components/layout/root-nav";
import { Toaster } from "@/components/ui/toaster";

export function ProvidersWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <RootNav />
      {children}
      <Toaster />
    </Providers>
  );
}
