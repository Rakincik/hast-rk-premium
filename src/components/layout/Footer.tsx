"use client";

import Link from "next/link";
import styles from "./Footer.module.css";
import { ArrowRight } from "lucide-react";
import MagneticButton from "../ui/MagneticButton";

import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
        {/* Massive Call to Action */}
        <div className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>
            {language === "en" ? (
              <>Have an Architectural Project?<br /><span className={styles.ctaTitleGold}>Let's Build It Together.</span></>
            ) : (
              <>Bir Projeniz mi var?<br /><span className={styles.ctaTitleGold}>Beraber İnşa Edelim.</span></>
            )}
          </h2>
          <MagneticButton>
            <Link href="/iletisim" className={styles.ctaBtn}>
              {language === "en" ? "Get In Touch With Us" : "Bizimle İletişime Geçin"} <ArrowRight size={20} className={styles.arrowIcon} />
            </Link>
          </MagneticButton>
        </div>

        {/* Footer Content */}
        <div className={styles.contentGrid}>
          <div className={styles.brand}>
            <div className={styles.logo}>HASTÜRK<span>.</span></div>
            <p className={styles.desc}>
              {t("footer_tagline", "Tarihi değerlerimizi koruyarak modern mühendisliğin getirdiği güvenle mekanları yeniden tasarlıyor ve hayata döndürüyoruz.")}
            </p>
          </div>

          <div className={styles.column}>
            <h4 className={styles.colTitle}>{t("footer_quick_links", "Menü")}</h4>
            <div className={styles.links}>
              <Link href="/kurumsal" className={styles.link}>{t("nav_about", "Kurumsal")}</Link>
              <Link href="/ekip" className={styles.link}>{t("nav_team", "Ekip")}</Link>
              <Link href="/hizmetler" className={styles.link}>{t("nav_services", "Hizmetler")}</Link>
              <Link href="/projeler" className={styles.link}>{t("nav_projects", "Projeler")}</Link>
              <Link href="/teklif-al" className={styles.link} style={{ color: "var(--accent-gold)" }}>{t("nav_quote_btn", "Teklif Hesapla")}</Link>
            </div>
          </div>

          <div className={styles.column}>
            <h4 className={styles.colTitle}>{t("footer_services", "Hizmetler")}</h4>
            <div className={styles.links}>
              <Link href="/hizmetler" className={styles.link}>{language === "en" ? "Historical Restoration" : "Restorasyon"}</Link>
              <Link href="/hizmetler" className={styles.link}>{language === "en" ? "Measured Survey (Rölöve)" : "Rölöve"}</Link>
              <Link href="/hizmetler" className={styles.link}>{language === "en" ? "Architectural Design" : "Mimari Tasarım"}</Link>
              <Link href="/hizmetler" className={styles.link}>{language === "en" ? "Structural Strengthening" : "Güçlendirme"}</Link>
              <Link href="/teklif-al" className={styles.link}>{language === "en" ? "TMMOB Fee Calculator" : "Asgari Bedel Hesabı"}</Link>
            </div>
          </div>

          <div className={styles.column}>
            <h4 className={styles.colTitle}>{t("footer_contact_info", "İletişim")}</h4>
            <div className={styles.links}>
              <a href="mailto:info@hasturksm.com" className={styles.link}>info@hasturksm.com</a>
              <a href="tel:+905404278875" className={styles.link}>+90 540 427 88 75</a>
              <a href="https://maps.google.com" target="_blank" rel="noreferrer" className={styles.link}>
                Gümüşsuyu / Beyoğlu<br/>İstanbul, Türkiye
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div>&copy; {new Date().getFullYear()} Hastürk Sanat ve Mimarlık. {t("footer_rights", "Tüm hakları saklıdır.")}</div>
          <div className={styles.socials}>
            <a href="#" aria-label="Instagram">IG</a>
            <a href="#" aria-label="LinkedIn">IN</a>
            <a href="#" aria-label="Twitter">X</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
