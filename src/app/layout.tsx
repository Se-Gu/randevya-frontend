import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: {
    default: "Randevya",
    template: "%s | Randevya",
  },
  description: "Kuaför randevu yönetim platformu",
  openGraph: {
    title: "Randevya",
    description: "Kuaför randevu yönetim platformu",
    url: "https://randevya.com",
    siteName: "Randevya",
    locale: "tr_TR",
    type: "website",
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/icons/icon-512x512.png",
    shortcut: "/icons/icon-512x512.png",
    apple: "/icons/icon-512x512.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <meta
          name="theme-color"
          content="#ffffff"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#000000"
          media="(prefers-color-scheme: dark)"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Randevya" />
        <link rel="apple-touch-icon" href="/icons/icon-512x512.png" />
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
