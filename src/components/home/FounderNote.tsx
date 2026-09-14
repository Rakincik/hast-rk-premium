"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./FounderNote.module.css";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function FounderNote() {
  const { t, language } = useLanguage();

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          
          {/* Portrait Column */}
          <motion.div 
            className={styles.imageCol}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className={styles.imageFrame}>
              <img 
                src="https://static.wixstatic.com/media/4bb5c9_41a37e2d629b45c59b8e07b08500df6c~mv2.png" 
                alt="Y. Mimar Okan HASTÜRK - Hastürk Sanat ve Mimarlık Kurucusu"
                className={styles.portraitImg}
              />
              <div className={styles.imageOverlay} />
              <div className={styles.imageBadge}>
                <div>
                  <span className={styles.badgeName}>Okan HASTÜRK</span>
                  <span className={styles.badgeRole}>{t("founder_role", "Y. Mimar · Kurucu")}</span>
                </div>
                <div className={styles.badgeExp}>
                  20+
                  <span>{t("stat_years", "Yıllık Tecrübe")}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Column */}
          <motion.div 
            className={styles.contentCol}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className={styles.tagline}>{t("founder_badge", "Kurucu Mimarın Notu")}</span>

            <h2 className={styles.quoteTitle}>
              {t("founder_title_1", "Tarihe dokunurken yalnızca taşları değil,")} <br />
              <span className={styles.goldSpan}>{t("founder_title_2", "bir medeniyetin hafızasını onarıyoruz.")}</span>
            </h2>

            <div className={styles.paragraphs}>
              <p>
                {t("founder_p1", "Restorasyon bizim için sıradan bir inşaat faaliyeti değil; geçmişin büyük ustalarıyla çağdaş mühendisliğin ilkeleri arasında kurduğumuz derin bir diyalogdur.")}
              </p>

              <div className={styles.highlightText}>
                &ldquo;{t("founder_quote", "Kültürel mirasımıza duyduğumuz saygı, projelendirmedeki milimetrik hassasiyetimiz ve şantiyedeki usta zanaatkarlığımız başarımızın yegane temelidir.")}&rdquo;
              </div>

              <p>
                {t("founder_p2", "Boğaziçi'nin asırlık ahşap yalılarından Tarihi Yarımada'nın tescilli kagir konaklarına kadar her projede, eserin özgün ruhunu koruyarak geleceğe güvenle aktarmanın gururunu yaşıyoruz.")}
              </p>
            </div>

            <div className={styles.signatureArea}>
              <div className={styles.signatureLockup}>
                <div className={styles.handwrittenSignature}>Okan Hastürk</div>
                <span className={styles.architectTitle}>
                  {language === "en" ? "M. Arch · Hastürk Art & Architecture" :
                   language === "de" ? "M. Arch · Hastürk Kunst & Architektur" :
                   language === "ar" ? "معماري أول · هاستورك للفن والعمارة" :
                   "Y. Mimar · Hastürk Sanat ve Mimarlık"}
                </span>
              </div>

              <Link href="/ekip" className={styles.teamLink}>
                <span>
                  {language === "en" ? "Our Expert Team" :
                   language === "de" ? "Unser Expertenteam" :
                   language === "ar" ? "فريق خبرائنا" :
                   "Uzman Kadromuz"}
                </span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
