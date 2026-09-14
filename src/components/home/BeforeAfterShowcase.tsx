"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { ArrowLeftRight, MapPin, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import styles from "./BeforeAfterShowcase.module.css";
import { useLanguage } from "@/context/LanguageContext";

interface BeforeAfterProject {
  id: string;
  tabLabel: { tr: string; en: string };
  title: { tr: string; en: string };
  location: { tr: string; en: string };
  status: { tr: string; en: string };
  techniques: { tr: string[]; en: string[] };
  beforeImage: string;
  afterImage: string;
  quoteType: string;
}

const showcaseProjects: BeforeAfterProject[] = [
  {
    id: "galata",
    tabLabel: {
      tr: "Taksim 360 Restorasyon",
      en: "Taksim 360 Restoration"
    },
    title: {
      tr: "Taksim 360 Levanten Yapısı Restorasyon & Konservasyon",
      en: "Taksim 360 Levantine Heritage Restoration & Conservation"
    },
    location: {
      tr: "361 Ada 3132 Parsel, Beyoğlu / İstanbul",
      en: "Block 361 Parcel 3132, Beyoğlu / Istanbul"
    },
    status: {
      tr: "Tescilli Kültür Varlığı",
      en: "Grade II Registered Heritage Asset"
    },
    techniques: {
      tr: ["Tescilli Cephe Restorasyonu", "Özgün Ahşap Cumba Rekonstrüksiyonu", "Dövme Demir Korkuluk Konservasyonu", "Ağır Çelik Askılama Tahkimatı"],
      en: ["Heritage Facade Restoration", "Authentic Timber Bay Reconstruction", "Wrought Iron Balustrade Conservation", "Heavy Steel Shoring Retention"]
    },
    beforeImage: "/projects/karma-isler/IMG-20231010-WA0025.JPG",
    afterImage: "/projects/taksim-360/IMG_2860.JPG",
    quoteType: "restoration"
  },
  {
    id: "minare",
    tabLabel: {
      tr: "Taş Minare & Cami",
      en: "Stone Minaret & Mosque"
    },
    title: {
      tr: "Tarihi Anıt Cami & Taş Minare Konservasyonu",
      en: "Historic Monumental Mosque & Stone Minaret Conservation"
    },
    location: {
      tr: "Fatih, Tarihi Yarımada / İstanbul",
      en: "Fatih, Historic Peninsula / Istanbul"
    },
    status: {
      tr: "1. Grup Tescilli Anıt Eser",
      en: "Grade I Registered Monumental Heritage"
    },
    techniques: {
      tr: ["Yüksek İrtifa Güvenlikli İskele", "Kesme Taş Gövde Çatlak Dikişi", "Şerefe Mukarnas Konservasyonu", "Geleneksel Külah Kurşun Kaplama"],
      en: ["High-Altitude Safety Scaffolding", "Ashlar Stone Shaft Crack Stitching", "Corbel Mucarnas Conservation", "Traditional Lead Cap Restoration"]
    },
    beforeImage: "/projects/karma-isler/IMG-20231101-WA0063.JPG",
    afterImage: "/projects/karma-isler/IMG-20231101-WA0062.JPG",
    quoteType: "restoration"
  },
  {
    id: "zemin",
    tabLabel: {
      tr: "Zemin & Güçlendirme",
      en: "Geotechnical & Reinforcement"
    },
    title: {
      tr: "Tarihi Yapı Geoteknik Zemin Sondajı & Temel Tahkimatı",
      en: "Historic Structure Geotechnical Core Drilling & Underpinning"
    },
    location: {
      tr: "Tarihi Yarımada / İstanbul",
      en: "Historic Peninsula / Istanbul"
    },
    status: {
      tr: "Deprem Güvenliği & Zemin İyileştirme",
      en: "Seismic Safety & Ground Consolidation"
    },
    techniques: {
      tr: ["Kompakt Paletli Mini Kazık Makinesi", "Temel Altı Enjeksiyon & Sondaj", "Yapısal Karot Donatı Analizi", "Sismik Yük Aktarımı"],
      en: ["Compact Crawler Micropiling Rig", "Sub-Foundation Grout Injection", "Structural Core Rebar Testing", "Seismic Load Distribution"]
    },
    beforeImage: "/projects/guclendirme/B72F58E1-9A83-46EE-8642-0FE84A786EBF.JPG",
    afterImage: "/projects/guclendirme/IMG_4386.JPG",
    quoteType: "strengthening"
  }
];

export default function BeforeAfterShowcase() {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderPosition = useMotionValue(50);

  const clipPathValue = useTransform(sliderPosition, (val) => `inset(0 ${100 - val}% 0 0)`);
  const handleLeft = useTransform(sliderPosition, (val) => `${val}%`);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = Math.round((x / rect.width) * 100);
    sliderPosition.set(percentage);
  }, [sliderPosition]);

  // Pointer & Mouse move
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  // Touch move support
  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      updatePosition(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleGlobalPointerUp = () => setIsDragging(false);
    window.addEventListener("pointerup", handleGlobalPointerUp);
    return () => window.removeEventListener("pointerup", handleGlobalPointerUp);
  }, []);

  const project = showcaseProjects[activeTab];

  return (
    <section className={styles.section}>
      {/* Section Header */}
      <div className={styles.header}>
        <div className={styles.badge}>
          <Sparkles size={14} /> {t("ba_badge", "KORUMA & RESTORASYON FELSEFEMİZ")}
        </div>
        <h2 className={styles.title}>
          {t("ba_title", "Tarihin Ruhuna Saygıyla, Geleceğe Güvenle")}
        </h2>
        <p className={styles.subtitle}>
          {t("ba_subtitle", "Restorasyon geçmişin izlerini silmek değil; eserin özgün kimliğini ve yaşanmışlığını koruyarak, modern mühendisliğin getirdiği güvenle asırlar sonrasına aktarmaktır.")}
        </p>
      </div>

      {/* Project Switcher Tabs */}
      <div className={styles.tabsContainer}>
        {showcaseProjects.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            className={`${styles.tabBtn} ${activeTab === idx ? styles.tabBtnActive : ""}`}
            onClick={() => {
              setActiveTab(idx);
              sliderPosition.set(50);
            }}
          >
            <ShieldCheck size={16} />
            <span>{item.tabLabel[language]}</span>
          </button>
        ))}
      </div>

      {/* Interactive Split-Screen Slider */}
      <div className={styles.sliderWrapper}>
        <div 
          className={styles.sliderContainer}
          ref={containerRef}
          onPointerDown={(e) => {
            setIsDragging(true);
            updatePosition(e.clientX);
          }}
          onPointerMove={handlePointerMove}
          onTouchMove={handleTouchMove}
        >
          {/* After Image (Background) */}
          <img 
            src={project.afterImage} 
            alt={project.title[language]} 
            className={styles.image} 
          />
          <div className={`${styles.label} ${styles.labelAfter}`}>
            {t("ba_label_after", "Restorasyon Sonrası")}
          </div>

          {/* Before Image (Clipped Overlay) */}
          <motion.div 
            className={styles.beforeImageContainer}
            style={{ width: "100%", clipPath: clipPathValue }}
          >
            <img 
              src={project.beforeImage} 
              alt={project.title[language]} 
              className={styles.image} 
            />
            <div className={`${styles.label} ${styles.labelBefore}`}>
              {t("ba_label_before", "Restorasyon Öncesi")}
            </div>
          </motion.div>

          {/* Draggable Divider Handle */}
          <motion.div 
            className={styles.handleContainer}
            style={{ left: handleLeft, x: "-50%" }}
          >
            <div className={styles.handle}>
              <ArrowLeftRight size={20} />
            </div>
          </motion.div>
        </div>

        {/* Project Metadata Card */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={project.id}
            className={styles.projectMetaCard}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.metaInfo}>
              <h3 className={styles.projectTitle}>{project.title[language]}</h3>
              <div className={styles.projectDetails}>
                <span>
                  <MapPin size={13} color="var(--accent-gold)" />
                  {project.location[language]}
                </span>
                <span>• {project.status[language]}</span>
              </div>
              <div className={styles.techPills}>
                {project.techniques[language].map((tech, i) => (
                  <span key={i} className={styles.techPill}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <Link 
              href={`/teklif-al?type=${project.quoteType}`} 
              className={styles.ctaBtn}
            >
              <span>{t("ba_cta_button", "Bu Proje Benzeri Yapınız İçin Teklif Alın")}</span>
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
