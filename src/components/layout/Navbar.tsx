"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import styles from "./Navbar.module.css";
import { Menu, X } from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";

const navItems = [
  { key: "nav_home", href: "/" },
  { key: "nav_about", href: "/kurumsal" },
  { key: "nav_team", href: "/ekip" },
  { key: "nav_services", href: "/hizmetler" },
  { key: "nav_projects", href: "/projeler" },
  { key: "nav_contact", href: "/iletisim" },
];

export default function Navbar() {
  const { language, toggleLanguage, t } = useLanguage();
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

            <button
              type="button"
              className={styles.langBtn}
              onClick={toggleLanguage}
              aria-label="Dili Değiştir / Switch Language"
            >
              <span className={language === "tr" ? styles.langActive : styles.langInactive}>TR</span>
              <span className={styles.langDivider}>/</span>
              <span className={language === "en" ? styles.langActive : styles.langInactive}>EN</span>
            </button>

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
          {/* Mobile Language Switcher */}
          <div style={{ marginBottom: "1rem" }}>
            <button
              type="button"
              className={styles.langBtn}
              onClick={toggleLanguage}
              style={{ padding: "8px 18px", fontSize: "0.9rem" }}
              aria-label="Switch Language"
            >
              <span className={language === "tr" ? styles.langActive : styles.langInactive}>TR</span>
              <span className={styles.langDivider}>/</span>
              <span className={language === "en" ? styles.langActive : styles.langInactive}>EN</span>
            </button>
          </div>

          {navItems.map((item, i) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: mobileMenuOpen ? 1 : 0, y: mobileMenuOpen ? 0 : 20 }}
              transition={{ delay: i * 0.08 + 0.15 }}
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
            transition={{ delay: navItems.length * 0.08 + 0.15 }}
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
