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
    `Merhaba Hastürk Mimarlık, anasayfa hesaplama motorunuz üzerinden bilgi almak istiyorum.\n\n` +
    `• Proje Türü: ${typeLabels[projectType].title}\n` +
    `• Yapı Alanı: ${area} m²\n` +
    `• Malzeme: ${materialLabels[material]}\n` +
    `• Bakanlık Sınıfı: ${quoteResult.ministryClass.name} (${quoteResult.ministryClass.code} - ${formatCurrencyTL(quoteResult.ministryClass.unitCostPerM2)}/m²)\n` +
    `• Yapı Yaklaşık Maliyeti (PYM): ${formatCurrencyTL(quoteResult.totalEstimatedCost)}\n` +
    `• Tahmini Proje Bedeli: ~${formatCurrencyTL(quoteResult.packageFees.comprehensive)}\n\n` +
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
          <span className={styles.tagline}>Resmî Gazete: 33157 Tebliği & TMMOB Normları</span>
          <h2 className={styles.title}>
            ÇŞİDB 2026 Birim Maliyetleri & <br />
            <span className="text-gold">Akıllı Mimari Teklif Motoru</span>
          </h2>
          <p className={styles.subtitle}>
            Çevre, Şehircilik ve İklim Değişikliği Bakanlığı 2026 Yapı Yaklaşık Birim Maliyetleri ve TMMOB yasal taban formülleriyle yapınızın proje bedelini anında simüle edin.
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
                *{quoteResult.ministryClass.name} ({quoteResult.ministryClass.code} - {formatCurrencyTL(quoteResult.ministryClass.unitCostPerM2)}/m²) ve TMMOB standartları esas alınmıştır.
              </p>
            </div>

            <div className={styles.statsRow}>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Bakanlık Yaklaşık Maliyeti (PYM)</span>
                <span className={styles.statVal}>{formatCurrencyTL(quoteResult.totalEstimatedCost)}</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>1.5× Uygulama Birim Fiyatı</span>
                <span className={styles.statVal} style={{ fontSize: "0.9rem", color: "var(--accent-gold)" }}>
                  {formatCurrencyTL(quoteResult.ministryClass.unitCostPerM2)}/m²
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
