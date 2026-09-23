"use client";

import { motion } from "framer-motion";
import styles from "./Journal.module.css";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useSiteContent } from "@/context/SiteContentContext";

export default function Journal() {
  const { t, language } = useLanguage();
  const { content } = useSiteContent();

  const articles = [
    {
      id: 1,
      title: language === "en" ? "Importance and Chemical Analysis of Khorasan Mortar in Historic Structures" :
             language === "de" ? "Bedeutung und chemische Analyse von Horasan-Mörtel in historischen Bauten" :
             language === "ar" ? "أهمية ملاط الخرسان والتحليلات الكيميائية في المباني الأثرية" :
             "Tarihi Yapılarda Horasan Harcının Önemi ve Kimyasal Analizleri",
      category: language === "en" ? "Conservation Science" :
                language === "de" ? "Restaurierungswissenschaft" :
                language === "ar" ? "علوم الترميم" :
                "Restorasyon Bilimi",
      readTime: language === "en" ? "5 min read" : language === "de" ? "5 Min. Lesezeit" : language === "ar" ? "قراءة 5 دقائق" : "5 dk okuma",
      date: language === "en" ? "August 2026" : language === "de" ? "August 2026" : language === "ar" ? "أغسطس 2026" : "Ağustos 2026",
      excerpt: language === "en" 
        ? "The binding alchemy of traditional brick dust and slaked lime: Laboratory formulations safeguarding authentic structural elasticity in monumental masonry."
        : language === "de"
        ? "Das Zusammenspiel von Ziegelmehl und Kalk: Laborformulierungen zur Bewahrung der originalen statischen Elastizität historischen Mauerwerks."
        : language === "ar"
        ? "التفاعل الهندسي بين مسحوق الفخار والجير التقليدي: تركيبات مختبرية لصون المرونة الإنشائية الأصلية للمعالم الحجرية التاريخية."
        : "Geleneksel tuğla tozu ve kirecin bağlayıcı dansı: Tarihi kagir eserlerin özgün statik esnekliğini korumak için uygulanan laboratuvar formülasyonları.",
      image: "/projects/karma-isler/IMG-20231227-WA0044.JPG"
    },
    {
      id: 2,
      title: language === "en" ? "Solid Timber Conservation and Joinery Details in Bosphorus Mansions" :
             language === "de" ? "Massivholzkonservierung und Tischlerdetails in Bosporus-Villen" :
             language === "ar" ? "صيانة الخشب المصمت وتفاصيل النجارة التراثية في قصور البوسفور" :
             "Boğaziçi Yalılarında Masif Ahşap Koruma ve Doğrama Detayları",
      category: language === "en" ? "Materials & Craft" :
                language === "de" ? "Material & Handwerk" :
                language === "ar" ? "المواد والحرفية" :
                "Malzeme & Zanaat",
      readTime: language === "en" ? "4 min read" : language === "de" ? "4 Min. Lesezeit" : language === "ar" ? "قراءة 4 دقائق" : "4 dk okuma",
      date: language === "en" ? "July 2026" : language === "de" ? "Juli 2026" : language === "ar" ? "يوليو 2026" : "Temmuz 2026",
      excerpt: language === "en"
        ? "Traditional linseed oil treatments and kiln-dried profile applications protecting historic wood against moisture, marine salt, and biological degradation."
        : language === "de"
        ? "Traditionelle Leinölbehandlungen und getrocknete Massivholzprofile zum Schutz vor Feuchtigkeit, Meersalz und Schädlingsbefall."
        : language === "ar"
        ? "المعالجة بزيت بذر الكتان التقليدي واستخدام مقاطع الخشب المجفف لحماية الأخشاب التاريخية من الرطوبة والأملاح البحرية."
        : "Nem, deniz tuzu ve biyolojik zararlılara karşı geleneksel bezir yağı ve modern fırınlanmış masif ahşap profillerin koruma teknikleri.",
      image: "/projects/karma-isler/IMG_20210512_123036_195.JPG"
    },
    {
      id: 3,
      title: language === "en" ? "2026 Heritage Protection Board Permitting & Licensing Guide" :
             language === "de" ? "Leitfaden für Genehmigungsverfahren der Denkmalschutzbehörden 2026" :
             language === "ar" ? "دليل تراخيص واعتمادات لجان حماية التراث والآثار لعام 2026" :
             "2026 Kültür Varlıkları Koruma Kurulu İzin ve Ruhsat Rehberi",
      category: language === "en" ? "Law & Legislation" :
                language === "de" ? "Recht & Vorschriften" :
                language === "ar" ? "القوانين والتشريعات" :
                "Hukuk & Mevzuat",
      readTime: language === "en" ? "6 min read" : language === "de" ? "6 Min. Lesezeit" : language === "ar" ? "قراءة 6 دقائق" : "6 dk okuma",
      date: language === "en" ? "June 2026" : language === "de" ? "Juni 2026" : language === "ar" ? "يونيو 2026" : "Haziran 2026",
      excerpt: language === "en"
        ? "Navigating the approval milestones and bureaucratic roadmap for survey, restitution, and restoration projects in Grade 1 & 2 registered heritage assets."
        : language === "de"
        ? "Phasen der behördlichen Prüfung und bürokratische Fahrpläne für Bauaufnahme, Rekonstruktion und Sanierung denkmalgeschützter Objekte."
        : language === "ar"
        ? "مراحل المصادقات الرسمية والخارطة الإجرائية لمشاريع الرفع المعماري والترميم في المعالم التراثية المسجلة من الفئتين الأولى والثانية."
        : "1. ve 2. grup tescilli kültür varlıklarında rölöve, restitüsyon ve restorasyon projelerinin Anıtlar Kurulu onay aşamaları ve bürokratik yol haritası.",
      image: "/projects/taksim-360/IMG_2885.jpg"
    }
  ];

  const activeArticles =
    content.articles && content.articles.length > 0 ? content.articles : articles;

  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.tagline}>{t("journal_tagline", "Mimari Günce & Araştırmalar")}</span>
            <h2 className={styles.title}>
              {t("journal_title_1", "Kültürel Mirasın")} <br />
              <span className="text-gold">{t("journal_title_2", "Belleğine Yolculuk")}</span>
            </h2>
          </div>
          <Link href="/hizmetler" className={styles.readMore} style={{ borderBottom: "1px solid var(--accent-gold)", paddingBottom: "4px" }}>
            {t("journal_view_all", "Tüm Yayınları İncele")} <ArrowRight size={16} />
          </Link>
        </div>

        <div className={styles.grid}>
          {activeArticles.map((article, idx) => (
            <motion.div 
              key={article.id}
              className={styles.articleCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
            >
              <div className={styles.imageBox}>
                <img src={article.image} alt={article.title} />
                <span className={styles.categoryBadge}>{article.category}</span>
              </div>

              <div className={styles.content}>
                <div className={styles.metaRow}>
                  <div className={styles.metaItem}>
                    <Calendar size={13} />
                    <span>{article.date}</span>
                  </div>
                  <div className={styles.metaItem}>
                    <Clock size={13} />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                <h3 className={styles.articleTitle}>{article.title}</h3>
                <p className={styles.excerpt}>{article.excerpt}</p>

                <div className={styles.cardFooter}>
                  <span className={styles.readLink}>
                    {language === "en" ? "Read Article" : language === "de" ? "Artikel Lesen" : language === "ar" ? "قراءة المقال" : "Makaleyi Oku"}
                  </span>
                  <ArrowRight size={15} className={styles.footerArrow} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
