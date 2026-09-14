"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./ConsultationCta.module.css";
import { ArrowRight, Phone, MessageCircle, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function ConsultationCta() {
  const { t, language } = useLanguage();

  const whatsappText = encodeURIComponent(
    language === "en" ? "Hello Hastürk Architecture, we would like to consult regarding a preliminary inspection for our heritage project." :
    language === "de" ? "Hallo Hastürk Architektur, wir möchten uns bezüglich einer Vor-Ort-Begutachtung für unser Denkmalprojekt beraten lassen." :
    language === "ar" ? "مرحباً هاستورك للعمارة، نود الاستشارة وطلب معاينة أولية لمشروعنا التراثي." :
    "Merhaba Hastürk Mimarlık, projemiz için ön keşif ve danışmanlık hakkında görüşmek istiyoruz."
  );

  return (
    <section className={styles.ctaSection}>
      <div className="container">
        <motion.div 
          className={styles.bannerCard}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <span className={styles.tagline}>{t("cta_tagline", "Ön Değerlendirme & Durum Tespiti")}</span>

          <h2 className={styles.title}>
            {t("cta_title_1", "Tarihi Bir Eseriniz veya Yeni Bir")} <br />
            <span className="text-gold">{t("cta_title_2", "Mimari Vizyonunuz mu Var?")}</span>
          </h2>

          <p className={styles.subtitle}>
            {t("cta_subtitle", "Uzman restoratör mimarlarımız ve statik danışmanlarımızla yapınızı yerinde inceleyelim; Kültür Varlıkları mevzuatına uygun yol haritasını ve yaklaşık maliyet analizini birlikte belirleyelim.")}
          </p>

          <div className={styles.actions}>
            <Link href="/iletisim" className={styles.primaryBtn}>
              <span>{t("cta_btn_discovery", "Ücretsiz Ön Keşif Talep Edin")}</span>
              <ArrowRight size={18} />
            </Link>

            <a 
              href={`https://wa.me/905404278875?text=${whatsappText}`}
              target="_blank"
              rel="noreferrer"
              className={styles.whatsappBtn}
            >
              <MessageCircle size={18} style={{ color: "#25D366" }} />
              <span>{t("cta_btn_whatsapp", "WhatsApp Danışma Hattı")}</span>
            </a>

            <a href="tel:+905404278875" className={styles.phoneBtn}>
              <Phone size={17} style={{ color: "var(--accent-gold)" }} />
              <span>+90 540 427 88 75</span>
            </a>
          </div>

          <div className={styles.assurances}>
            <div className={styles.assuranceItem}>
              <CheckCircle2 size={16} className={styles.checkIcon} />
              <span>{t("cta_assurance_1", "Yerinde Ön İnceleme & Ekspertiz")}</span>
            </div>
            <div className={styles.assuranceItem}>
              <CheckCircle2 size={16} className={styles.checkIcon} />
              <span>{t("cta_assurance_2", "Anıtlar Kurulu Ön Tescil Taraması")}</span>
            </div>
            <div className={styles.assuranceItem}>
              <CheckCircle2 size={16} className={styles.checkIcon} />
              <span>{t("cta_assurance_3", "TMMOB Normlarında Şeffaf Rapor")}</span>
            </div>
            <div className={styles.assuranceItem}>
              <CheckCircle2 size={16} className={styles.checkIcon} />
              <span>{t("cta_assurance_4", "24 Saat İçinde Keşif Özeti")}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
