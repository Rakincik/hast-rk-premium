import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: "Hastürk Sanat ve Mimarlık | Restorasyon & Rölöve",
  description: "Tarihi dokuya saygı, modern mühendislik. Restorasyon, Rölöve, Mimari Tasarım, Taahhüt ve Güçlendirme hizmetleri.",
};

import Navbar from "@/components/layout/Navbar";
import CustomCursor from "@/components/ui/CustomCursor";
import Footer from "@/components/layout/Footer";
import Preloader from "@/components/ui/Preloader";
import AuroraGlow from "@/components/ui/AuroraGlow";
import ArchitectRuler from "@/components/ui/ArchitectRuler";
import FloatingContactWidget from "@/components/ui/FloatingContactWidget";
import { LanguageProvider } from "@/context/LanguageContext";
import { SiteContentProvider } from "@/context/SiteContentContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${inter.variable} ${playfair.variable}`}>
        <SiteContentProvider>
          <LanguageProvider>
            <Preloader />
            <CustomCursor />
            <AuroraGlow />
            <ArchitectRuler />
            <Navbar />
            <main>{children}</main>
            <Footer />
            <FloatingContactWidget />
          </LanguageProvider>
        </SiteContentProvider>
      </body>
    </html>
  );
}
