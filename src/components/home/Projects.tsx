"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import styles from "./Projects.module.css";
import { ArrowRight, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useSiteContent } from "@/context/SiteContentContext";

export default function Projects() {
  const { t } = useLanguage();
  const { content } = useSiteContent();
  const trackRef = useRef<HTMLDivElement>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const flagshipProjects = (content.projects && content.projects.length > 0)
    ? content.projects.filter((p) => p.featuredOnHome !== false)
    : [
    {
      id: 1,
      title: t("proj_1_title", "Taksim 360 Kentsel Yenileme & Restorasyon"),
      category: t("proj_1_cat", "Restorasyon & Koruma"),
      location: "Beyoğlu / İstanbul",
      year: "2024",
      image: "/projects/taksim-360/IMG_2860.JPG"
    },
    {
      id: 2,
      title: t("proj_2_title", "Tarihi Yapı Geoteknik Zemin & Mini Kazık Güçlendirme"),
      category: t("proj_2_cat", "Statik Güçlendirme"),
      location: "Tarihi Yarımada / İstanbul",
      year: "2024",
      image: "/projects/guclendirme/B72F58E1-9A83-46EE-8642-0FE84A786EBF.JPG"
    },
    {
      id: 3,
      title: t("proj_3_title", "Tarihi Anıt Cami & Taş Minare Konservasyonu"),
      category: t("proj_3_cat", "Restorasyon & İskele"),
      location: "Fatih / İstanbul",
      year: "2024",
      image: "/projects/karma-isler/IMG-20231101-WA0063.JPG"
    },
    {
      id: 4,
      title: t("proj_4_title", "Tarihi Avlu Doğal Taş Döşeme & Düzenleme"),
      category: t("proj_4_cat", "Taahhüt & Taş Ustalığı"),
      location: "Sultanahmet / İstanbul",
      year: "2024",
      image: "/projects/karma-isler/IMG-20231120-WA0064.JPG"
    },
    {
      id: 5,
      title: t("proj_5_title", "Tescilli Cephe Askılama & Çelik Tahkimat"),
      category: t("proj_5_cat", "Statik Güçlendirme"),
      location: "Galata / Beyoğlu",
      year: "2024",
      image: "/projects/karma-isler/IMG-20231010-WA0025.JPG"
    },
    {
      id: 6,
      title: t("proj_6_title", "Geleneksel Masif Ahşap Pencere Rekonstrüksiyonu"),
      category: t("proj_6_cat", "Rölöve & Ahşap Zanaat"),
      location: "Boğaziçi / İstanbul",
      year: "2024",
      image: "/projects/karma-isler/IMG_20210512_123036_173.JPG"
    }
  ];

  const scrollLeft = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: -520, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: 520, behavior: "smooth" });
    }
  };

  return (
    <section className={styles.projectsSection}>
      {/* Cinematic Atmospheric Backlight Aura */}
      <div 
        className={styles.atmosphereBacklight}
        style={{
          opacity: hoveredProject !== null ? 0.35 : 0.08,
          transform: hoveredProject !== null ? "scale(1.15)" : "scale(1)"
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.tagline}>{t("projects_tagline", "Seçkin Portföy")}</span>
            <h2 className={styles.title}>{t("projects_title", "Öne Çıkan Projeler")}</h2>
            <p className={styles.subtitle}>
              {t("projects_subtitle", "Her biri tarihe, çevreye ve insana saygı ilkesiyle hayata geçirilen ustalık eserlerimiz.")}
            </p>
          </div>

          <div className={styles.headerActions}>
            <div className={styles.navArrows}>
              <button 
                type="button" 
                onClick={scrollLeft} 
                className={styles.arrowBtn}
                aria-label="Önceki Projeler"
              >
                <ChevronLeft size={22} />
              </button>
              <button 
                type="button" 
                onClick={scrollRight} 
                className={styles.arrowBtn}
                aria-label="Sonraki Projeler"
              >
                <ChevronRight size={22} />
              </button>
            </div>
            
            <Link href="/projeler" className={styles.viewAll}>
              <span>{t("projects_view_all", "Tüm Projelerimiz")}</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.scrollWrapper} style={{ position: "relative", zIndex: 2 }}>
        <div 
          ref={trackRef} 
          className={styles.track}
          onMouseLeave={() => setHoveredProject(null)}
        >
          {flagshipProjects.map((project) => (
            <Link 
              key={project.id} 
              href="/projeler" 
              className={`${styles.projectCard} ${hoveredProject === project.id ? styles.activeCard : ""}`}
              onMouseEnter={() => setHoveredProject(project.id)}
            >
              <div className={styles.imageContainer}>
                <img
                  src={project.image}
                  alt={project.title}
                  className={styles.projectImage}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div className={styles.overlay} />
              </div>

              <div className={styles.cardTop}>
                <span className={styles.category}>{project.category}</span>
                <span className={styles.yearTag}>{project.year}</span>
              </div>

              <div className={styles.projectInfo}>
                <div className={styles.locationTag}>
                  <MapPin size={13} />
                  <span>{project.location}</span>
                </div>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <div className={styles.cardFooter}>
                  <span>{t("projects_view_details", "Detayları İncele")}</span>
                  <ArrowRight size={15} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
