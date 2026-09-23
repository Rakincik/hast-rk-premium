"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { ArrowLeftRight, MapPin, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import styles from "./BeforeAfterShowcase.module.css";
import { useLanguage } from "@/context/LanguageContext";
import { Language } from "@/lib/translations";

interface BeforeAfterProject {
  id: string;
  tabLabel: Record<Language, string>;
  title: Record<Language, string>;
  location: Record<Language, string>;
  status: Record<Language, string>;
  techniques: Record<Language, string[]>;
  beforeImage: string;
  afterImage: string;
  quoteType: string;
}

const showcaseProjects: BeforeAfterProject[] = [
  {
    id: "galata",
    tabLabel: {
      tr: "Taksim 360 Restorasyon",
      en: "Taksim 360 Restoration",
      de: "Taksim 360 Sanierung",
      ar: "ترميم تقسيم 360"
    },
    title: {
      tr: "Taksim 360 Levanten Yapısı Restorasyon & Konservasyon",
      en: "Taksim 360 Levantine Heritage Restoration & Conservation",
      de: "Taksim 360 Levantinisches Gebäude Sanierung & Konservierung",
      ar: "ترميم وصيانة مبنى ليفانتيني تاريخي في تقسيم 360"
    },
    location: {
      tr: "361 Ada 3132 Parsel, Beyoğlu / İstanbul",
      en: "Block 361 Parcel 3132, Beyoğlu / Istanbul",
      de: "Block 361 Parzelle 3132, Beyoğlu / Istanbul",
      ar: "المربع 361 القطعة 3132، بيوغلو / إسطنبول"
    },
    status: {
      tr: "Tescilli Kültür Varlığı",
      en: "Grade II Registered Heritage Asset",
      de: "Denkmalgeschütztes Kulturgut",
      ar: "معلم ثقافي وتاريخي مسجل"
    },
    techniques: {
      tr: ["Tescilli Cephe Restorasyonu", "Özgün Ahşap Cumba Rekonstrüksiyonu", "Dövme Demir Korkuluk Konservasyonu", "Ağır Çelik Askılama Tahkimatı"],
      en: ["Heritage Facade Restoration", "Authentic Timber Bay Reconstruction", "Wrought Iron Balustrade Conservation", "Heavy Steel Shoring Retention"],
      de: ["Fassadenrestaurierung", "Historischer Holzerker-Wiederaufbau", "Schmiedeeiserne Geländerkonservierung", "Schwere Stahlabstützung"],
      ar: ["ترميم الواجهة المسجلة", "إعادة بناء المشربية الخشبية التراثية", "صيانة درابزين الحديد المطروق", "تدعيم إنشائي بهياكل فولاذية"]
    },
    beforeImage: "/projects/karma-isler/IMG-20231010-WA0025.JPG",
    afterImage: "/projects/taksim-360/IMG_2860.JPG",
    quoteType: "restoration"
  },
  {
    id: "minare",
    tabLabel: {
      tr: "Taş Minare & Cami",
      en: "Stone Minaret & Mosque",
      de: "Steinminarett & Moschee",
      ar: "المئذنة الحجرية والمسجد"
    },
    title: {
      tr: "Tarihi Anıt Cami & Taş Minare Konservasyonu",
      en: "Historic Monumental Mosque & Stone Minaret Conservation",
      de: "Historische Monumental-Moschee & Minarett-Konservierung",
      ar: "صيانة مسجد أثري ومئذنة حجرية تاريخية"
    },
    location: {
      tr: "Fatih, Tarihi Yarımada / İstanbul",
      en: "Fatih, Historic Peninsula / Istanbul",
      de: "Fatih, Historische Halbinsel / Istanbul",
      ar: "الفاتح، شبه الجزيرة التاريخية / إسطنبول"
    },
    status: {
      tr: "1. Grup Tescilli Anıt Eser",
      en: "Grade I Registered Monumental Heritage",
      de: "Klasse 1 Registriertes Baudenkmal",
      ar: "معلم أثري مسجل من الفئة الأولى"
    },
    techniques: {
      tr: ["Yüksek İrtifa Güvenlikli İskele", "Kesme Taş Gövde Çatlak Dikişi", "Şerefe Mukarnas Konservasyonu", "Geleneksel Külah Kurşun Kaplama"],
      en: ["High-Altitude Safety Scaffolding", "Ashlar Stone Shaft Crack Stitching", "Corbel Mucarnas Conservation", "Traditional Lead Cap Restoration"],
      de: ["Höhensicherheitsgerüst", "Werkstein-Rissvernähung", "Konsol-Muqarnas-Restaurierung", "Traditionelle Bleiverkleidung"],
      ar: ["سقالات أمان للارتفاعات العالية", "خياطة وتدعيم شروخ الحجر المنحوت", "صيانة مقرنصات الشرفة", "تصفيح القبة بالرصاص التقليدي"]
    },
    beforeImage: "/projects/karma-isler/IMG-20231101-WA0063.JPG",
    afterImage: "/projects/karma-isler/IMG-20231101-WA0062.JPG",
    quoteType: "restoration"
  },
  {
    id: "zemin",
    tabLabel: {
      tr: "Zemin & Güçlendirme",
      en: "Geotechnical & Reinforcement",
      de: "Baugrund & Ertüchtigung",
      ar: "التربة والتدعيم"
    },
    title: {
      tr: "Tarihi Yapı Geoteknik Zemin Sondajı & Temel Tahkimatı",
      en: "Historic Structure Geotechnical Core Drilling & Underpinning",
      de: "Baugrundsondierung & Fundamentunterfangung Historischer Bauten",
      ar: "حفر جيوتقني وتدعيم أساسات المباني التاريخية"
    },
    location: {
      tr: "Tarihi Yarımada / İstanbul",
      en: "Historic Peninsula / Istanbul",
      de: "Historische Halbinsel / Istanbul",
      ar: "شبه الجزيرة التاريخية / إسطنبول"
    },
    status: {
      tr: "Deprem Güvenliği & Zemin İyileştirme",
      en: "Seismic Safety & Ground Consolidation",
      de: "Erdbebensicherheit & Baugrundverbesserung",
      ar: "الأمان الزلزالي وتحسين التربة"
    },
    techniques: {
      tr: ["Kompakt Paletli Mini Kazık Makinesi", "Temel Altı Enjeksiyon & Sondaj", "Yapısal Karot Donatı Analizi", "Sismik Yük Aktarımı"],
      en: ["Compact Crawler Micropiling Rig", "Sub-Foundation Grout Injection", "Structural Core Rebar Testing", "Seismic Load Distribution"],
      de: ["Kompakte Raupen-Mikropfahlanlage", "Fundamentinjektion & Kernbohrung", "Statischer Bewehrungsnachweis", "Seismische Lastabtragung"],
      ar: ["حفارات أوتاد دقيقة مجنزرة", "حقن التربة أسفل القواعد", "فحص واختبار تسليح اللباب الخرساني", "إعادة توزيع الأحمال الزلزالية"]
    },
    beforeImage: "/projects/guclendirme/B72F58E1-9A83-46EE-8642-0FE84A786EBF.JPG",
    afterImage: "/projects/guclendirme/IMG_4386.JPG",
    quoteType: "strengthening"
  }
];

import { useSiteContent } from "@/context/SiteContentContext";

export default function BeforeAfterShowcase() {
  const { language, t } = useLanguage();
  const { content } = useSiteContent();
  const [activeTab, setActiveTab] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderPosition = useMotionValue(50);

  const projectsList = (content.beforeAfter && content.beforeAfter.length > 0)
    ? content.beforeAfter.map((item) => ({
        id: item.id,
        tabLabel: { tr: item.tabLabel, en: item.tabLabel, de: item.tabLabel, ar: item.tabLabel },
        title: { tr: item.title, en: item.title, de: item.title, ar: item.title },
        location: { tr: item.location, en: item.location, de: item.location, ar: item.location },
        status: { tr: item.status, en: item.status, de: item.status, ar: item.status },
        techniques: { tr: item.techniques, en: item.techniques, de: item.techniques, ar: item.techniques },
        beforeImage: item.beforeImage,
        afterImage: item.afterImage,
        quoteType: item.quoteType || "restoration",
      }))
    : showcaseProjects;

  const clipPathValue = useTransform(sliderPosition, (val) => `inset(0 ${100 - val}% 0 0)`);
  const handleLeft = useTransform(sliderPosition, (val) => `${val}%`);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.min(Math.max((x / rect.width) * 100, 5), 95);
    sliderPosition.set(percent);
  }, [sliderPosition]);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging) {
      updatePosition(e.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      updatePosition(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handlePointerUp = () => setIsDragging(false);
    window.addEventListener("pointerup", handlePointerUp);
    return () => window.removeEventListener("pointerup", handlePointerUp);
  }, []);

  const project = projectsList[activeTab % projectsList.length] || projectsList[0];

  return (
    <section className={`section container ${styles.showcaseSection}`}>
      {/* Header */}
      <motion.div 
        className={styles.header}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className={styles.badge}>
          <Sparkles size={14} className="text-gold" />
          <span>{t("ba_badge", "KORUMA & RESTORASYON FELSEFEMİZ")}</span>
        </div>
        <h2 className={styles.title}>
          {t("ba_title", "Tarihin Ruhuna Saygıyla, Geleceğe Güvenle")}
        </h2>
        <p className={styles.subtitle}>
          {t("ba_subtitle", "Restorasyon geçmişin izlerini silmek değil; eserin özgün kimliğini ve yaşanmışlığını koruyarak, modern mühendisliğin güvencesiyle asırlar sonrasına aktarmaktır.")}
        </p>
      </motion.div>

      {/* Navigation Tabs */}
      <div className={styles.tabsContainer}>
        {projectsList.map((item, idx) => (
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
            <span>{item.tabLabel[language] || item.tabLabel.tr}</span>
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
            alt={project.title[language] || project.title.tr} 
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
              alt={project.title[language] || project.title.tr} 
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
              <h3 className={styles.projectTitle}>{project.title[language] || project.title.tr}</h3>
              <div className={styles.projectDetails}>
                <span>
                  <MapPin size={13} color="var(--accent-gold)" />
                  {project.location[language] || project.location.tr}
                </span>
                <span>• {project.status[language] || project.status.tr}</span>
              </div>
              <div className={styles.techPills}>
                {(project.techniques[language] || project.techniques.tr).map((tech, i) => (
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
