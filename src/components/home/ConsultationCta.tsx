"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./ConsultationCta.module.css";
import { ArrowRight, Phone, MessageCircle, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function ConsultationCta() {
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
          <span className={styles.tagline}>Ön Değerlendirme & Durum Tespiti</span>

          <h2 className={styles.title}>
            Tarihi Bir Eseriniz veya Yeni Bir <br />
            <span className="text-gold">Mimari Vizyonunuz mu Var?</span>
          </h2>

          <p className={styles.subtitle}>
            Uzman restoratör mimarlarımız ve statik danışmanlarımızla yapınızı yerinde inceleyelim; Kültür Varlıkları mevzuatına uygun yol haritasını ve yaklaşık maliyet analizini birlikte belirleyelim.
          </p>

          <div className={styles.actions}>
            <Link href="/iletisim" className={styles.primaryBtn}>
              <span>Ücretsiz Ön Keşif Talep Edin</span>
              <ArrowRight size={18} />
            </Link>

            <a 
              href="https://wa.me/905404278875?text=Merhaba%20Hastürk%20Mimarlık,%20projemiz%20için%20ön%20keşif%20ve%20danışmanlık%20hakkında%20görüşmek%20istiyoruz."
              target="_blank"
              rel="noreferrer"
              className={styles.whatsappBtn}
            >
              <MessageCircle size={18} style={{ color: "#25D366" }} />
              <span>WhatsApp Danışma Hattı</span>
            </a>

            <a href="tel:+905404278875" className={styles.phoneBtn}>
              <Phone size={17} style={{ color: "var(--accent-gold)" }} />
              <span>+90 540 427 88 75</span>
            </a>
          </div>

          <div className={styles.assurances}>
            <div className={styles.assuranceItem}>
              <CheckCircle2 size={16} className={styles.checkIcon} />
              <span>Yerinde Ön İnceleme & Ekspertiz</span>
            </div>
            <div className={styles.assuranceItem}>
              <CheckCircle2 size={16} className={styles.checkIcon} />
              <span>Anıtlar Kurulu Ön Tescil Taraması</span>
            </div>
            <div className={styles.assuranceItem}>
              <CheckCircle2 size={16} className={styles.checkIcon} />
              <span>24 Saat İçinde Teknik Geri Dönüş</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
