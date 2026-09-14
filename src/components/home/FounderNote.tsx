"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./FounderNote.module.css";
import { ArrowRight, Quote } from "lucide-react";

export default function FounderNote() {
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
                  <span className={styles.badgeRole}>Y. Mimar · Kurucu</span>
                </div>
                <div className={styles.badgeExp}>
                  20+
                  <span>Yıllık Tecrübe</span>
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
            <span className={styles.tagline}>Kurucu Mimarın Notu</span>

            <h2 className={styles.quoteTitle}>
              Tarihe dokunurken yalnızca taşları değil, <br />
              <span className={styles.goldSpan}>bir medeniyetin hafızasını</span> onarıyoruz.
            </h2>

            <div className={styles.paragraphs}>
              <p>
                Restorasyon bizim için sıradan bir inşaat faaliyeti değil; geçmişin büyük ustalarıyla çağdaş mühendisliğin ilkeleri arasında kurduğumuz derin bir diyalogdur. 
              </p>

              <div className={styles.highlightText}>
                &ldquo;Kültürel mirasımıza duyduğumuz saygı, projelendirmedeki milimetrik hassasiyetimiz ve şantiyedeki usta zanaatkarlığımız başarımızın yegane temelidir.&rdquo;
              </div>

              <p>
                Boğaziçi&apos;nin asırlık ahşap yalılarından Tarihi Yarımada&apos;nın tescilli kagir konaklarına kadar her projede, eserin özgün ruhunu koruyarak geleceğe güvenle aktarmanın gururunu yaşıyoruz.
              </p>
            </div>

            <div className={styles.signatureArea}>
              <div className={styles.signatureLockup}>
                <div className={styles.handwrittenSignature}>Okan Hastürk</div>
                <span className={styles.architectTitle}>Y. Mimar · Hastürk Sanat ve Mimarlık</span>
              </div>

              <Link href="/ekip" className={styles.teamLink}>
                <span>Uzman Kadromuz</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
