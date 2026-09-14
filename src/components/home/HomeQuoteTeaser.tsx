"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./HomeQuoteTeaser.module.css";
import { 
  Building2, 
  PenTool, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Calculator, 
  MessageCircle, 
  Clock 
} from "lucide-react";
import { 
  ProjectType, 
  BuildingMaterial, 
  calculateQuote, 
  formatCurrencyTL, 
  getServicesForType 
} from "@/lib/quoteEngine";

export default function HomeQuoteTeaser() {
  const [projectType, setProjectType] = useState<ProjectType>("restoration");
  const [area, setArea] = useState<number>(350);
  const [material, setMaterial] = useState<BuildingMaterial>("stone_masonry");

  // Calculate live results using the official Hastürk quote engine
  const quoteResult = useMemo(() => {
    const recommendedServices = getServicesForType(projectType)
      .filter(s => s.isRecommended)
      .map(s => s.id);

    return calculateQuote({
      projectType,
      areaSquareMeters: area,
      buildingMaterial: material,
      heritageStatus: "grade_2",
      locationArea: "istanbul_fatih",
      selectedServices: recommendedServices
    });
  }, [projectType, area, material]);

  const typeLabels: Record<ProjectType, { title: string; icon: React.ReactNode }> = {
    restoration: {
      title: "Restorasyon & Rölöve",
      icon: <Building2 size={22} strokeWidth={1.5} />
    },
    new_architecture: {
      title: "Yeni Mimari Tasarım",
      icon: <PenTool size={22} strokeWidth={1.5} />
    },
    strengthening: {
      title: "Statik Güçlendirme",
      icon: <ShieldCheck size={22} strokeWidth={1.5} />
    }
  };

  const materialLabels: Record<BuildingMaterial, string> = {
    stone_masonry: "Yığma Taş / Kagir",
    wood: "Geleneksel Ahşap",
    composite: "Karma (Bağdadi/Taş)",
    concrete: "Betonarme"
  };

  // Pre-filled WhatsApp link with calculated preview details
  const whatsappMsg = encodeURIComponent(
    `Merhaba Hastürk Mimarlık, anasayfa hesaplama aracınız üzerinden bilgi almak istiyorum.\n\n` +
    `Proje Türü: ${typeLabels[projectType].title}\n` +
    `Yapı Alanı: ${area} m²\n` +
    `Malzeme: ${materialLabels[material]}\n` +
    `Tahmini Proje Bedeli: ~${formatCurrencyTL(quoteResult.packageFees.comprehensive)}\n\n` +
    `Detaylı keşif ve teklif için görüşebilir miyiz?`
  );

  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <span className={styles.tagline}>Şeffaf & Yasal Metodoloji</span>
          <h2 className={styles.title}>
            TMMOB 2026 Asgari Bedel & <br />
            <span className="text-gold">Akıllı Proje Hesaplayıcı</span>
          </h2>
          <p className={styles.subtitle}>
            Tarihi tescilli yapınız veya yeni mimari projeniz için resmi mevzuata ve Hastürk mühendislik standartlarına uygun yaklaşık proje maliyetini saniyeler içinde simüle edin.
          </p>
        </motion.div>

        <motion.div 
          className={styles.calculatorCard}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Controls Column */}
          <div className={styles.inputsCol}>
            
            {/* Project Type */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                <span>1. Proje Türünü Seçin</span>
              </label>
              <div className={styles.typeSelector}>
                {(Object.keys(typeLabels) as ProjectType[]).map((type) => (
                  <button
                    key={type}
                    type="button"
                    className={`${styles.typeBtn} ${projectType === type ? styles.typeBtnActive : ""}`}
                    onClick={() => setProjectType(type)}
                  >
                    {typeLabels[type].icon}
                    <span>{typeLabels[type].title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Area Slider */}
            <div className={styles.formGroup}>
              <div className={styles.label}>
                <span>2. Toplam İnşaat / Kapalı Alan:</span>
                <span className={styles.sliderValue}>{area} m²</span>
              </div>
              <div className={styles.sliderContainer}>
                <input 
                  type="range"
                  min={50}
                  max={1500}
                  step={25}
                  value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                  className={styles.rangeInput}
                  aria-label="Yapı Alanı m2"
                />
              </div>
            </div>

            {/* Material */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                <span>3. Mevcut / Hedef Yapı Strüktürü</span>
              </label>
              <div className={styles.materialSelector}>
                {(Object.keys(materialLabels) as BuildingMaterial[]).map((mat) => (
                  <button
                    key={mat}
                    type="button"
                    className={`${styles.materialBtn} ${material === mat ? styles.materialBtnActive : ""}`}
                    onClick={() => setMaterial(mat)}
                  >
                    {materialLabels[mat]}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Result Output Column */}
          <div className={styles.resultsCol}>
            <div>
              <span className={styles.resultTitle}>Tahmini Mimari & Mühendislik Bedeli</span>
              <div className={styles.mainFee}>
                {formatCurrencyTL(quoteResult.packageFees.comprehensive)}
              </div>
              <p className={styles.mainFeeDesc}>
                *TMMOB 2026 asgari taban bedeli ve 3D Lidar belgeleme standartları baz alınmıştır.
              </p>
            </div>

            <div className={styles.statsRow}>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Yapı Yaklaşık Maliyeti</span>
                <span className={styles.statVal}>{formatCurrencyTL(quoteResult.totalEstimatedCost)}</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Tahmini Süreç</span>
                <span className={styles.statVal}>
                  <Clock size={16} style={{ display: "inline", verticalAlign: "middle", marginRight: "4px", color: "var(--accent-gold)" }} />
                  {quoteResult.estimatedDurationWeeks.min}-{quoteResult.estimatedDurationWeeks.max} Hafta
                </span>
              </div>
            </div>

            <div className={styles.includedFeatures}>
              <div className={styles.featureItem}>
                <CheckCircle2 size={16} className={styles.checkIcon} />
                <span>3D Lazer Lidar Tarama & Nokta Bulutu Modelleme</span>
              </div>
              <div className={styles.featureItem}>
                <CheckCircle2 size={16} className={styles.checkIcon} />
                <span>Kültür Varlıkları Koruma Kurulu Dosya Yönetimi</span>
              </div>
              <div className={styles.featureItem}>
                <CheckCircle2 size={16} className={styles.checkIcon} />
                <span>Milimetrik Hasar Analizi ve Restitüsyon Raporu</span>
              </div>
            </div>

            <div className={styles.actionBtns}>
              <Link href="/teklif-al" className={styles.primaryCta}>
                <Calculator size={18} />
                <span>Detaylı Rapor & Teklif Al</span>
                <ArrowRight size={18} />
              </Link>
              
              <a 
                href={`https://wa.me/905404278875?text=${whatsappMsg}`}
                target="_blank"
                rel="noreferrer"
                className={styles.secondaryCta}
              >
                <MessageCircle size={17} style={{ color: "#25D366" }} />
                <span>Bu Hesaplamayı WhatsApp ile Danış</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
