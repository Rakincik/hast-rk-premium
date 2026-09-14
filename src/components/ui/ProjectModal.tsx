"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, MapPin, Calendar, ChevronLeft, ChevronRight, Maximize2, ShieldCheck } from "lucide-react";
import Link from "next/link";
import styles from "./ProjectModal.module.css";

export interface ProjectData {
  id: number;
  title: string;
  category: string;
  categoryKey: string;
  image: string;
  gallery?: string[];
  location: string;
  year: string;
  status: string;
  area: string;
  description: string;
  techniques: string[];
  quoteType?: string;
}

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  // Reset active image when project changes
  useEffect(() => {
    if (project) {
      setActiveImageIndex(0);
    }
  }, [project]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const galleryList = project.gallery && project.gallery.length > 0 
    ? project.gallery 
    : [project.image];

  const currentImg = galleryList[activeImageIndex] || project.image;

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % galleryList.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + galleryList.length) % galleryList.length);
  };

  return (
    <AnimatePresence>
      <motion.div 
        className={styles.backdrop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div 
          className={styles.modalContainer}
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Bar with Header & Close Button */}
          <div className={styles.modalHeader}>
            <div className={styles.headerInfo}>
              <div className={styles.badgeGroup}>
                <span className={styles.categoryBadge}>{project.category}</span>
                <span className={styles.statusBadge}>
                  <ShieldCheck size={13} />
                  {project.status}
                </span>
                <span className={styles.yearBadge}>{project.year}</span>
              </div>
              <h2 className={styles.modalTitle}>{project.title}</h2>
              <div className={styles.locationHeader}>
                <MapPin size={14} />
                <span>{project.location}</span>
              </div>
            </div>

            <button 
              type="button" 
              className={styles.closeBtn} 
              onClick={onClose}
              aria-label="Kapat"
            >
              <X size={22} />
            </button>
          </div>

          {/* Grand Visual Showcase Stage */}
          <div className={styles.showcaseStage}>
            <div className={styles.imageSlideWrapper}>
              <motion.img 
                key={currentImg}
                src={currentImg} 
                alt={`${project.title} - Görsel ${activeImageIndex + 1}`} 
                className={styles.stageImage}
                initial={{ opacity: 0.3 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
              />
            </div>

            {/* Navigation Arrows if Multiple Images */}
            {galleryList.length > 1 && (
              <>
                <button 
                  type="button" 
                  className={`${styles.navArrow} ${styles.prevArrow}`}
                  onClick={prevImage}
                  aria-label="Önceki Görsel"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  type="button" 
                  className={`${styles.navArrow} ${styles.nextArrow}`}
                  onClick={nextImage}
                  aria-label="Sonraki Görsel"
                >
                  <ChevronRight size={24} />
                </button>

                {/* Photo Counter Pill */}
                <div className={styles.counterPill}>
                  {activeImageIndex + 1} / {galleryList.length}
                </div>
              </>
            )}
          </div>

          {/* Big Thumbnails Strip if Multiple */}
          {galleryList.length > 1 && (
            <div className={styles.thumbnailsBar}>
              <div className={styles.thumbnailsTrack}>
                {galleryList.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`${styles.thumbCard} ${activeImageIndex === idx ? styles.activeThumbCard : ""}`}
                    onClick={() => setActiveImageIndex(idx)}
                  >
                    <img src={imgUrl} alt={`Görsel ${idx + 1}`} />
                    <span className={styles.thumbNum}>0{idx + 1}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Modal Body with Details */}
          <div className={styles.modalBody}>
            {/* Metadata Specs Grid */}
            <div className={styles.specsGrid}>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Konum</span>
                <span className={styles.specValue}>{project.location}</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Tamamlanma / Yıl</span>
                <span className={styles.specValue}>{project.year}</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Tescil Durumu</span>
                <span className={styles.specValue}>{project.status}</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Yapı Alanı</span>
                <span className={styles.specValue}>{project.area}</span>
              </div>
            </div>

            {/* Description */}
            <div className={styles.descriptionSection}>
              <h4 className={styles.sectionHeading}>Proje ve Restorasyon Kapsamı</h4>
              <p className={styles.descText}>{project.description}</p>
            </div>

            {/* Techniques */}
            {project.techniques && project.techniques.length > 0 && (
              <div className={styles.techniquesSection}>
                <h4 className={styles.sectionHeading}>Uygulanan Mühendislik & Restorasyon Teknikleri</h4>
                <div className={styles.techniquePills}>
                  {project.techniques.map((tech, idx) => (
                    <span key={idx} className={styles.techniquePill}>
                      <span className={styles.goldDot}>◆</span> {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* All Photos Gallery Grid */}
            {galleryList.length > 1 && (
              <div className={styles.allPhotosSection}>
                <h4 className={styles.sectionHeading}>Tüm Proje & Şantiye Görselleri ({galleryList.length})</h4>
                <div className={styles.photosGrid}>
                  {galleryList.map((imgUrl, idx) => (
                    <div 
                      key={idx} 
                      className={styles.gridPhotoCard}
                      onClick={() => {
                        setActiveImageIndex(idx);
                        // scroll up smoothly to the main viewer
                        const stage = document.querySelector(`.${styles.showcaseStage}`);
                        stage?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                    >
                      <img src={imgUrl} alt={`${project.title} - Detay ${idx + 1}`} loading="lazy" />
                      <div className={styles.gridPhotoOverlay}>
                        <span className={styles.gridPhotoTag}>Görseli Büyüt</span>
                        <Maximize2 size={16} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Footer */}
            <div className={styles.ctaFooter}>
              <div className={styles.ctaNote}>
                Benzer tescilli veya özel yapınız için fizibilite ve rölöve çalışması başlatın.
              </div>
              <Link 
                href={`/teklif-al?type=${project.quoteType || "restoration"}`}
                className={styles.quoteActionBtn}
                onClick={onClose}
              >
                <span>Maliyet Hesapla & Keşif İste</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
