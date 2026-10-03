import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: {
    default: "Hastürk Sanat ve Mimarlık | Restorasyon & Rölöve",
    template: "%s | Hastürk Sanat ve Mimarlık",
  },
  description: "Tarihi dokuya saygı, modern mühendislik. Eski eser rölöve, restitüsyon, restorasyon, mimari tasarım, taahhüt ve güçlendirme hizmetleri.",
  keywords: [
    // Core Services
    "restorasyon firması", "rölöve", "restitüsyon projesi", "mimari tasarım", "mimari taahhüt firması", "kagir yapı güçlendirme", 
    "tarihi eser restorasyonu", "tarihi bina güçlendirme", "anıtlar kurulu onaylı proje", "2863 sayılı kanun restorasyon", 
    "ahşap köşk restorasyonu", "tarihi köşk restorasyonu", "taş ev restorasyonu", "yalı restorasyonu",
    
    // Process & Legal (High Intent)
    "koruma kurulu süreçleri", "koruma kurulu proje onayı", "anıtlar kurulu ruhsat", "eski eser projelendirme", 
    "tescilli yapı tadilatı", "tescilli bina ruhsat", "tarihi bina tadilat izni", "röleve restitüsyon restorasyon projeleri",
    "kentsel sit alanı inşaat", "tarihi eser statik raporu", "bina güçlendirme maliyeti hesaplama", "mimari proje çizimi fiyatları",
    
    // Engineering & Contracting
    "karbon fiber güçlendirme", "cfrp güçlendirme", "çelik mantolama", "kargir bina güçlendirme", "temel tahkimat",
    "taşıyıcı sistem güçlendirmesi", "eski eser şantiye yönetimi", "anahtar teslim restorasyon", "inşaat taahhüt hizmetleri",
    
    // Location Based (Local SEO)
    "istanbul restorasyon firmaları", "tarihi yarımada restorasyon", "beyoğlu restorasyon mimarlık", "kadıköy restorasyon projeleri",
    "boğaziçi yalı restorasyon", "fatih tarihi eser restorasyonu", "balat restorasyon", "galata restorasyon firması", 
    "beşiktaş eski eser güçlendirme", "üsküdar tescilli yapı restorasyon",
    
    // Brand
    "hastürk sanat ve mimarlık", "okan hastürk", "hastürk mimarlık restorasyon", "hastürk mimarlık taahhüt"
  ],
  authors: [{ name: "Okan Hastürk" }],
  creator: "Hastürk Sanat ve Mimarlık",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://hasturkmimarlik.com",
    siteName: "Hastürk Sanat ve Mimarlık",
    title: "Hastürk Sanat ve Mimarlık | Geleceğin İmzası",
    description: "Tarihi eserlerin restorasyonu ve modern mimari tasarımlarda uzmanlaşmış mimarlık ofisi.",
    images: [
      {
        url: "/logo-gold.png",
        width: 800,
        height: 600,
        alt: "Hastürk Mimarlık Logo",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

import { LanguageProvider } from "@/context/LanguageContext";
import { SiteContentProvider } from "@/context/SiteContentContext";
import SiteUIWrapper from "@/components/layout/SiteUIWrapper";
import GoogleTags from "@/components/layout/GoogleTags";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ArchitecturalFirm",
    name: "Hastürk Sanat ve Mimarlık",
    image: "https://hasturkmimarlik.com/logo-gold.png",
    "@id": "https://hasturkmimarlik.com",
    url: "https://hasturkmimarlik.com",
    telephone: "+905404278875",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Gümüşsuyu, Beyoğlu",
      addressLocality: "İstanbul",
      addressCountry: "TR",
    },
    sameAs: [
      "https://www.instagram.com/hasturkmimarlik",
    ],
  };

  return (
    <html lang="tr">
      <body className={`${inter.variable} ${playfair.variable}`}>
        {/* Structured Data (JSON-LD) for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SiteContentProvider>
          <LanguageProvider>
            <GoogleTags />
            <SiteUIWrapper>{children}</SiteUIWrapper>
          </LanguageProvider>
        </SiteContentProvider>
      </body>
    </html>
  );
}
