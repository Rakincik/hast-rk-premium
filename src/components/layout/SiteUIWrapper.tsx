"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import CustomCursor from "@/components/ui/CustomCursor";
import Footer from "@/components/layout/Footer";
import Preloader from "@/components/ui/Preloader";
import AuroraGlow from "@/components/ui/AuroraGlow";
import ArchitectRuler from "@/components/ui/ArchitectRuler";
import FloatingContactWidget from "@/components/ui/FloatingContactWidget";

export default function SiteUIWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const isTeklifAl = pathname === "/teklif-al";

  if (isAdmin) {
    return <main>{children}</main>;
  }

  return (
    <>
      <Preloader />
      <CustomCursor />
      <AuroraGlow />
      {!isTeklifAl && <ArchitectRuler />}
      {!isTeklifAl && <Navbar />}
      <main>{children}</main>
      {!isTeklifAl && <Footer />}
      {!isTeklifAl && <FloatingContactWidget />}
    </>
  );
}
