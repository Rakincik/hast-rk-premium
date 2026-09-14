"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import styles from "./Navbar.module.css";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Language } from "@/lib/translations";
import FlagIcon from "@/components/ui/FlagIcon";

const navItems = [
  { key: "nav_home", href: "/" },
  { key: "nav_about", href: "/kurumsal" },
  { key: "nav_team", href: "/ekip" },
  { key: "nav_services", href: "/hizmetler" },
  { key: "nav_projects", href: "/projeler" },
  { key: "nav_contact", href: "/iletisim" },
];

const languages: { code: Language; label: string; flag: string; nativeName: string }[] = [
  { code: "tr", label: "TR", flag: "🇹🇷", nativeName: "Türkçe" },
  { code: "en", label: "EN", flag: "🇬🇧", nativeName: "English" },
  { code: "de", label: "DE", flag: "🇩🇪", nativeName: "Deutsch" },
  { code: "ar", label: "AR", flag: "🇸🇦", nativeName: "العربية" },
];

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    // Background changes on scroll
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    // Hide navbar on scroll down, show on scroll up
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}
      >
        <div className={`container ${styles.navContainer}`}>
          <Link href="/" className={styles.brand}>
            <Image 
              src="/logo-gold.png" 
              alt="Hastürk Sanat ve Mimarlık Logo" 
              width={36} 
              height={36} 
              priority
              className={styles.brandLogoImg}
            />
            <div className={styles.brandText}>
              <span className={styles.brandTitle}>{t("brand_title", "HASTÜRK")}<span>.</span></span>
              <span className={styles.brandSubtitle}>{t("brand_subtitle", "SANAT & MİMARLIK")}</span>
            </div>
          </Link>

          <div className={styles.desktopNav}>
            {navItems.map((item) => (
              <Link key={item.key} href={item.href} className={styles.navLink}>
                {t(item.key)}
              </Link>
            ))}

            {/* Desktop 4-Language Pill Switcher */}
            <div className={styles.langSegmentGroup}>
              {languages.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  className={`${styles.langSegmentBtn} ${language === item.code ? styles.langSegmentBtnActive : ""}`}
                  onClick={() => setLanguage(item.code)}
                  aria-label={`Dili ${item.nativeName} yap`}
                >
                  <FlagIcon code={item.code} size={15} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            <Link href="/teklif-al" className={styles.quoteBtn}>
              {t("nav_quote_btn", "Teklif Hesapla")}
            </Link>
          </div>

          <button 
            className={styles.mobileMenuBtn}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <motion.div 
        className={styles.mobileMenu}
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: mobileMenuOpen ? 1 : 0, x: mobileMenuOpen ? 0 : "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className={styles.mobileLinks}>
          {/* Mobile Flag-Based Language Selector */}
          <div className={styles.mobileFlagSection}>
            <span className={styles.mobileFlagHeading}>
              {language === "tr" ? "Dil Seçimi" : 
               language === "de" ? "Sprachauswahl" : 
               language === "ar" ? "اختر اللغة" : "Select Language"}
            </span>
            <div className={styles.mobileFlagGrid}>
              {languages.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  className={`${styles.mobileFlagCard} ${language === item.code ? styles.mobileFlagCardActive : ""}`}
                  onClick={() => {
                    setLanguage(item.code);
                    setMobileMenuOpen(false);
                  }}
                >
                  <FlagIcon code={item.code} size={24} />
                  <span className={styles.mobileFlagName}>{item.nativeName}</span>
                </button>
              ))}
            </div>
          </div>

          {navItems.map((item, i) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: mobileMenuOpen ? 1 : 0, y: mobileMenuOpen ? 0 : 20 }}
              transition={{ delay: i * 0.06 + 0.1 }}
            >
              <Link 
                href={item.href} 
                className={styles.mobileNavLink}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t(item.key)}
              </Link>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: mobileMenuOpen ? 1 : 0, y: mobileMenuOpen ? 0 : 20 }}
            transition={{ delay: navItems.length * 0.06 + 0.1 }}
          >
            <Link 
              href="/teklif-al" 
              className={styles.mobileNavLink}
              style={{ color: "var(--accent-gold)" }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav_quote_btn", "Teklif Hesapla")}
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
