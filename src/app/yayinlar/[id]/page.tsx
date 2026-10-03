import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import styles from "../../page.module.css";

export default function ArticlePage({ params }: { params: { id: string } }) {
  // Mock content for the article placeholder
  return (
    <div className={styles.main} style={{ paddingTop: "120px", paddingBottom: "100px", minHeight: "100vh" }}>
      <div className="container" style={{ maxWidth: "800px" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--accent-gold)", marginBottom: "40px", textDecoration: "none", fontWeight: 600 }}>
          <ArrowLeft size={18} /> Ana Sayfaya Dön
        </Link>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", marginBottom: "20px", lineHeight: 1.2 }}>
          Tarihi Yapılarda Horasan Harcının Önemi ve Kimyasal Analizleri
        </h1>
        <div style={{ display: "flex", gap: "20px", color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: "40px" }}>
          <span>Restorasyon Bilimi</span>
          <span>Ağustos 2026</span>
          <span>5 dk okuma</span>
        </div>
        
        <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", marginBottom: "40px", borderRadius: "12px", overflow: "hidden" }}>
          <img src="/projects/karma-isler/IMG-20231227-WA0044.JPG" alt="Makale" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>

        <div style={{ color: "#e0e0e0", fontSize: "1.1rem", lineHeight: 1.8 }}>
          <p style={{ marginBottom: "20px" }}>
            Geleneksel tuğla tozu ve kirecin bağlayıcı dansı: Tarihi kagir eserlerin özgün statik esnekliğini korumak için uygulanan laboratuvar formülasyonları son derece kritik bir öneme sahiptir.
          </p>
          <p style={{ marginBottom: "20px" }}>
            Restorasyon projelerimizde, yapının inşa edildiği dönemin harç analizlerini üniversitelerin laboratuvarlarında gerçekleştirerek aynı kimyasal ve fiziksel mukavemet oranlarına sahip modern muadilleri hazırlıyoruz.
          </p>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.8rem", margin: "40px 0 20px", color: "#fff" }}>Statik Esneklik ve Koruma</h2>
          <p style={{ marginBottom: "20px" }}>
            Horasan harcının en büyük özelliği, deprem gibi yatay yüklerde yapıya bir miktar esneklik payı tanımasıdır. Çimentonun aksine, yapının nefes almasını sağlayan bu harç, tarihi dokunun yüz yıllar boyunca ayakta kalmasının temel sırrıdır.
          </p>
        </div>
      </div>
    </div>
  );
}
