"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue, Variants } from "framer-motion";
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Services from "@/components/home/Services";
import Projects from "@/components/home/Projects";
import TrustBar from "@/components/home/TrustBar";
import WhyUs from "@/components/home/WhyUs";
import HomeQuoteTeaser from "@/components/home/HomeQuoteTeaser";
import Testimonials from "@/components/home/Testimonials";
import Journal from "@/components/home/Journal";
import Faq from "@/components/home/Faq";
import ConsultationCta from "@/components/home/ConsultationCta";
import { useRef, useEffect, useState } from "react";
import MagneticButton from "@/components/ui/MagneticButton";
import BeforeAfterShowcase from "@/components/home/BeforeAfterShowcase";
import HorizontalScroll from "@/components/home/HorizontalScroll";
import FounderNote from "@/components/home/FounderNote";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { t, language } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Scroll Parallax
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  
  // Interactive Mouse Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const contentX = useTransform(smoothMouseX, [-1, 1], [-20, 20]);
  const contentY = useTransform(smoothMouseY, [-1, 1], [-20, 20]);
  const bgMouseX = useTransform(smoothMouseX, [-1, 1], [15, -15]);
  const bgMouseY = useTransform(smoothMouseY, [-1, 1], [15, -15]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) * 2 - 1;
      const y = (e.clientY / innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Creative Text Animation (Word/Character reveal)
  const titleText = t("hero_title_1", "Geçmişin Dokusuna,");
  const titleSpan = t("hero_title_2", "Geleceğin İmzası");

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 50, rotateX: -90 },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      transition: { type: "spring", damping: 12, stiffness: 200 }
    }
  };

  return (
    <div className={styles.main}>
      {/* Hero Section */}
      <section ref={heroRef} className={styles.hero}>
        <motion.div 
          className={styles.heroBackground}
          style={{ 
            y: backgroundY,
            x: bgMouseX,
            rotateY: bgMouseX,
            rotateX: useTransform(bgMouseY, (v) => -v)
          }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className={styles.heroImage}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          >
            <source src="/bana_bu_görseli_web_sitemin_sl.mp4" type="video/mp4" />
          </video>
          <div className={styles.heroOverlay} />
        </motion.div>

        <motion.div 
          className={`container ${styles.heroContent}`}
          style={{ x: contentX, y: contentY }}
        >
          <h1 className={styles.heroTitle}>
            <motion.div 
              key={`t1-${language}`}
              className={styles.heroTitleLine}
              initial="hidden"
              animate="visible"
              transition={{ staggerChildren: 0.03, delayChildren: 0.1 }}
            >
              {titleText.split(" ").map((word, wIdx) => (
                <span key={`w1-${wIdx}`} className={styles.heroWord}>
                  {language === "ar" ? (
                    <motion.span variants={letterVariants} className={styles.heroWord}>
                      {word}
                    </motion.span>
                  ) : (
                    word.split("").map((char, cIdx) => (
                      <motion.span key={`c1-${cIdx}`} variants={letterVariants} className={styles.heroChar}>
                        {char}
                      </motion.span>
                    ))
                  )}
                  <span className={styles.heroSpace}>&nbsp;</span>
                </span>
              ))}
            </motion.div>
            
            <motion.div 
              key={`t2-${language}`}
              className={`${styles.heroTitleLine} ${styles.heroTitleGold}`}
              initial="hidden"
              animate="visible"
              transition={{ staggerChildren: 0.03, delayChildren: 0.35 }}
            >
              {titleSpan.split(" ").map((word, wIdx) => (
                <span key={`w2-${wIdx}`} className={styles.heroWord}>
                  {language === "ar" ? (
                    <motion.span variants={letterVariants} className={styles.heroWord}>
                      {word}
                    </motion.span>
                  ) : (
                    word.split("").map((char, cIdx) => (
                      <motion.span key={`c2-${cIdx}`} variants={letterVariants} className={styles.heroChar}>
                        {char}
                      </motion.span>
                    ))
                  )}
                  <span className={styles.heroSpace}>&nbsp;</span>
                </span>
              ))}
            </motion.div>
          </h1>
          
          <motion.p 
            key={`p-${language}`}
            className={styles.heroSubtitle}
            initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {t("hero_subtitle", "Restorasyon, Rölöve, Mimari Tasarım ve Taahhüt işlerinde yılların verdiği ustalıkla tarihi değerlerimizi yarınlara taşıyoruz.")}
          </motion.p>
          
          <motion.div 
            className={styles.heroActions}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <MagneticButton>
              <Link href="/projeler" className={styles.primaryBtn}>
                {t("hero_cta_projects", "Projelerimizi İnceleyin")}
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link href="/iletisim" className={styles.secondaryBtn}>
                {t("hero_cta_contact", "İletişime Geç")} <ArrowRight size={18} />
              </Link>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </section>

      {/* About Snippet Section */}
      <section className={`section container ${styles.aboutSection}`}>
        <motion.div 
          className={styles.aboutGrid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.3 } },
            hidden: {}
          }}
        >
          <motion.div 
            className={styles.aboutText}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
          >
            <h2 className={styles.sectionTitle}>
              {t("about_title_1", "Ustalık Eserimiz:")} <br />
              {t("about_title_2", "Tarihe Duyulan Saygı")}
            </h2>
            <p>
              {t("about_desc", "Hastürk Sanat ve Mimarlık olarak, sadece binaları değil, yaşanmışlıkları da onarıyoruz. Uzman ekibimizle, kültürel mirasımızı modern mühendisliğin güvencesi altına alıyoruz.")}
            </p>
          </motion.div>

          <motion.div 
            className={styles.aboutStats}
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
          >
            <div className={styles.statBox}>
              <h3>20+</h3>
              <span>{t("stat_years", "Yıllık Tecrübe")}</span>
            </div>
            <div className={styles.statBox}>
              <h3>150+</h3>
              <span>{t("stat_projects", "Tamamlanan Proje")}</span>
            </div>
            <div className={styles.statBox}>
              <h3>%100</h3>
              <span>{t("stat_harmony", "Tarihi Doku Uyumu")}</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Interactive Before / After Showcase */}
      <BeforeAfterShowcase />

      {/* Founder & Principal Architect Note */}
      <FounderNote />

      {/* Horizontal Scroll Timeline */}
      <HorizontalScroll />

      <Services />
      <Projects />

      {/* Trust & Accreditations */}
      <TrustBar />

      {/* Why Hastürk - 4 Pillars */}
      <WhyUs />

      {/* Interactive Live Quote & Cost Simulator */}
      <HomeQuoteTeaser />

      {/* Testimonials */}
      <Testimonials />

      {/* Architectural Journal & Case Studies */}
      <Journal />

      {/* FAQ Accordion */}
      <Faq />

      {/* VIP Discovery & Consultation Call to Action */}
      <ConsultationCta />
    </div>
  );
}
