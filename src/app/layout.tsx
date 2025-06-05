import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Randevya - Mükemmel Randevunuzu Alın",
  description:
    "Bölgenizdeki en iyi kuaförlerde randevu bulun ve rezervasyon yapın. Kolay, hızlı ve pratik.",
  keywords: ["kuaför", "randevu", "rezervasyon", "güzellik", "kuaför", "spa"],
  authors: [{ name: "Randevya Ekibi" }],
  creator: "Randevya",
  publisher: "Randevya",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://randevya.com"),
  openGraph: {
    title: "Randevya - Mükemmel Randevunuzu Alın",
    description:
      "Bölgenizdeki en iyi kuaförlerde randevu bulun ve rezervasyon yapın.",
    url: "https://randevya.com",
    siteName: "Randevya",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Randevya - Mükemmel Randevunuzu Alın",
    description:
      "Bölgenizdeki en iyi kuaförlerde randevu bulun ve rezervasyon yapın.",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: "#6366f1",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={inter.className}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Randevya" />
      </head>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
