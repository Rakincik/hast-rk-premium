"use client";

import { motion } from "framer-motion";
import styles from "./Journal.module.css";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import Link from "next/link";

const articles = [
  {
    id: 1,
    title: "Tarihi Yapılarda Horasan Harcının Önemi ve Kimyasal Analizleri",
    category: "Restorasyon Bilimi",
    readTime: "5 dk okuma",
    date: "Ağustos 2026",
    excerpt: "Geleneksel tuğla tozu ve kirecin bağlayıcı dansı: Tarihi kagir eserlerin özgün statik esnekliğini korumak için uygulanan laboratuvar formülasyonları.",
    image: "/projects/karma-isler/IMG-20231227-WA0044.JPG"
  },
  {
    id: 2,
    title: "Boğaziçi Yalılarında Masif Ahşap Koruma ve Doğrama Detayları",
    category: "Malzeme & Zanaat",
    readTime: "4 dk okuma",
    date: "Temmuz 2026",
    excerpt: "Nem, deniz tuzu ve biyolojik zararlılara karşı geleneksel bezir yağı ve modern fırınlanmış masif ahşap profillerin koruma teknikleri.",
    image: "/projects/karma-isler/IMG_20210512_123036_195.JPG"
  },
  {
    id: 3,
    title: "2026 Kültür Varlıkları Koruma Kurulu İzin ve Ruhsat Rehberi",
    category: "Hukuk & Mevzuat",
    readTime: "6 dk okuma",
    date: "Haziran 2026",
    excerpt: "1. ve 2. grup tescilli kültür varlıklarında rölöve, restitüsyon ve restorasyon projelerinin Anıtlar Kurulu onay aşamaları ve bürokratik yol haritası.",
    image: "/projects/taksim-360/IMG_2885.jpg"
  }
];

export default function Journal() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.tagline}>Mimari Günce & Araştırmalar</span>
            <h2 className={styles.title}>
              Kültürel Mirasın <br />
              <span className="text-gold">Belleğine Yolculuk</span>
            </h2>
          </div>
          <Link href="/hizmetler" className={styles.readMore} style={{ borderBottom: "1px solid var(--accent-gold)", paddingBottom: "4px" }}>
            Tüm Yayınları İncele <ArrowRight size={16} />
          </Link>
        </div>

        <div className={styles.grid}>
          {articles.map((article, idx) => (
            <motion.div 
              key={article.id}
              className={styles.articleCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
            >
              <div className={styles.imageWrapper}>
                <img 
                  src={article.image} 
                  alt={article.title}
                  className={styles.image}
                  loading="lazy"
                />
                <span className={styles.categoryBadge}>{article.category}</span>
              </div>

              <div className={styles.content}>
                <div className={styles.meta}>
                  <span className={styles.metaItem}>
                    <Calendar size={14} />
                    {article.date}
                  </span>
                  <span>•</span>
                  <span className={styles.metaItem}>
                    <Clock size={14} />
                    {article.readTime}
                  </span>
                </div>

                <h3 className={styles.articleTitle}>{article.title}</h3>
                <p className={styles.articleExcerpt}>{article.excerpt}</p>

                <div className={styles.readMore}>
                  <span>Makaleyi İncele</span>
                  <ArrowRight size={16} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
