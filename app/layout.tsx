import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PROFILE } from "@/lib/profile";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#0B0F19",
};

export const metadata: Metadata = {
  title: `${PROFILE.name} — Ox4Labs`,
  description: PROFILE.ogDescription,
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://card.ox4labs.com"),
  openGraph: {
    type: "profile",
    title: `${PROFILE.name} — CEO & Founder, Ox4Labs`,
    description: PROFILE.ogDescription,
    url: process.env.NEXT_PUBLIC_APP_URL || "https://card.ox4labs.com",
    siteName: "Ox4Labs",
    images: [
      {
        url: "/icons/icon-512.png",
        width: 512,
        height: 512,
        alt: "Ox4Labs logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: `${PROFILE.name} — Ox4Labs`,
    description: PROFILE.ogDescription,
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Mohamed",
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/icon-192.png", sizes: "192x192" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
