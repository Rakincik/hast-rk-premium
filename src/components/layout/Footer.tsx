"use client";

import Link from "next/link";
import styles from "./Footer.module.css";
import { ArrowRight } from "lucide-react";
import MagneticButton from "../ui/MagneticButton";
import { useLanguage } from "@/context/LanguageContext";
import { useSiteContent } from "@/context/SiteContentContext";

export default function Footer() {
  const { t, language } = useLanguage();
  const { content } = useSiteContent();

  const getCtaTitle = () => {
    switch (language) {
      case "en":
        return <>Have an Architectural Project?<br /><span className={styles.ctaTitleGold}>Let's Build It Together.</span></>;
      case "de":
        return <>Haben Sie ein Denkmalprojekt?<br /><span className={styles.ctaTitleGold}>Lassen Sie es uns gemeinsam verwirklichen.</span></>;
      case "ar":
        return <>هل لديك مشروع معماري أو تراثي؟<br /><span className={styles.ctaTitleGold}>دعنا نبنيه معاً بإتقان.</span></>;
      default:
        return <>Bir Projeniz mi var?<br /><span className={styles.ctaTitleGold}>Beraber İnşa Edelim.</span></>;
    }
  };

  const getServiceName = (type: string) => {
    switch (type) {
      case "restoration":
        return language === "en" ? "Historical Restoration" :
               language === "de" ? "Denkmalrestaurierung" :
               language === "ar" ? "الترميم التاريخي" : "Restorasyon";
      case "survey":
        return language === "en" ? "Measured Survey (Rölöve)" :
               language === "de" ? "Bauaufnahme (Rölöve)" :
               language === "ar" ? "الرفع المعماري والتوثيق" : "Rölöve & Restitüsyon";
      case "design":
        return language === "en" ? "Architectural Design" :
               language === "de" ? "Architekturentwurf" :
               language === "ar" ? "التصميم المعماري" : "Mimari Tasarım";
      case "strengthening":
        return language === "en" ? "Structural Strengthening" :
               language === "de" ? "Tragwerksverstärkung" :
               language === "ar" ? "التدعيم الإنشائي" : "Güçlendirme";
      case "calculator":
      default:
        return language === "en" ? "Official Fee Calculator" :
               language === "de" ? "Gebührenkalkulation" :
               language === "ar" ? "حاسبة التكاليف الرسمية" : "Asgari Bedel Hesabı";
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
        {/* Massive Call to Action */}
        <div className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>
            {getCtaTitle()}
          </h2>
          <MagneticButton>
            <Link href="/iletisim" className={styles.ctaBtn}>
              {t("footer_contact_cta", "Bizimle İletişime Geçin")} <ArrowRight size={20} className={styles.arrowIcon} />
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
            <h4 className={styles.colTitle}>{t("footer_quick_links", "Hızlı Menü")}</h4>
            <div className={styles.links}>
              <Link href="/kurumsal" className={styles.link}>{t("nav_about", "Kurumsal")}</Link>
              <Link href="/ekip" className={styles.link}>{t("nav_team", "Ekip")}</Link>
              <Link href="/hizmetler" className={styles.link}>{t("nav_services", "Hizmetler")}</Link>
              <Link href="/projeler" className={styles.link}>{t("nav_projects", "Projeler")}</Link>
              <Link href="/teklif-al" className={styles.link} style={{ color: "var(--accent-gold)" }}>{t("nav_quote_btn", "Teklif Hesapla")}</Link>
            </div>
          </div>

          <div className={styles.column}>
            <h4 className={styles.colTitle}>{t("footer_services", "Hizmetlerimiz")}</h4>
            <div className={styles.links}>
              <Link href="/hizmetler" className={styles.link}>{getServiceName("restoration")}</Link>
              <Link href="/hizmetler" className={styles.link}>{getServiceName("survey")}</Link>
              <Link href="/hizmetler" className={styles.link}>{getServiceName("design")}</Link>
              <Link href="/hizmetler" className={styles.link}>{getServiceName("strengthening")}</Link>
              <Link href="/teklif-al" className={styles.link}>{getServiceName("calculator")}</Link>
            </div>
          </div>

          <div className={styles.column}>
            <h4 className={styles.colTitle}>{t("footer_contact_info", "İletişim & Ofis")}</h4>
            <div className={styles.links}>
              <a href={`mailto:${content.settings?.email || "info@hasturksm.com"}`} className={styles.link}>
                {content.settings?.email || "info@hasturksm.com"}
              </a>
              <a href={`tel:${content.settings?.phone || "+905404278875"}`} className={styles.link}>
                {content.settings?.phoneDisplay || "+90 540 427 88 75"}
              </a>
              <a href={content.settings?.googleMapsUrl || "https://maps.google.com"} target="_blank" rel="noreferrer" className={styles.link}>
                {content.settings?.address || "Gümüşsuyu / Beyoğlu\nİstanbul, Türkiye"}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div>&copy; {new Date().getFullYear()} {content.settings?.companyName || "Hastürk Sanat ve Mimarlık"}. {t("footer_rights", "Tüm hakları saklıdır.")}</div>
          <div className={styles.socials}>
            <a href={content.settings?.socials?.instagram || "#"} target="_blank" rel="noreferrer" aria-label="Instagram">IG</a>
            <a href={content.settings?.socials?.linkedin || "#"} target="_blank" rel="noreferrer" aria-label="LinkedIn">IN</a>
            <Link href="/admin" style={{ opacity: 0.3, textDecoration: "none", color: "inherit", fontSize: "11px" }}>Admin</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
