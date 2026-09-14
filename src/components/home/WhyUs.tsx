"use client";

import { motion } from "framer-motion";
import styles from "./WhyUs.module.css";
import { Landmark, Scan, Hammer, GraduationCap } from "lucide-react";

const pillars = [
  {
    num: "01",
    title: "Kurul & Mevzuat Yetkinliği",
    desc: "1. ve 2. grup tescilli eserlerde Kültür Varlıkları Koruma Kurulu, KUDEB ve Anıtlar Kurulu onay süreçlerinde sıfır fire ve %100 onay garantili dosya yönetimi.",
    icon: <Landmark size={28} strokeWidth={1.5} />,
    badges: ["Kurul Onay Takibi", "Ruhsatlandırma", "Mevzuat Analizi"]
  },
  {
    num: "02",
    title: "3D Lidar ve Dijital İkiz",
    desc: "İleri teknoloji lazer tarayıcılar ve drone fotogrametrisi ile yapının tüm eğrilik, sehim ve çatlak haritasını milimetrik hassasiyetle modelleme kabiliyeti.",
    icon: <Scan size={28} strokeWidth={1.5} />,
    badges: ["Nokta Bulutu", "Deformasyon Haritası", "3D BIM"]
  },
  {
    num: "03",
    title: "Geleneksel Malzeme ve Zanaat",
    desc: "Özgün Horasan harcı kimyası, el oyması ahşap restorasyonu, kündekari ve taş işçiliğinde dönemin orijinal tekniklerine birebir sadakat.",
    icon: <Hammer size={28} strokeWidth={1.5} />,
    badges: ["Horasan Harcı", "Kündekari", "Geleneksel Ahşap"]
  },
  {
    num: "04",
    title: "Akademik & Hukuki Güç",
    desc: "Y. Mimar, İnşaat Y. Müh. Prof. Dr. statik danışmanlığı, Çevre Y. Mühendisi ve Gayrimenkul Koruma Hukuku Avukatından oluşan multidisipliner kadro.",
    icon: <GraduationCap size={28} strokeWidth={1.5} />,
    badges: ["Prof. Dr. Danışmanlığı", "Statik Hesap", "Koruma Hukuku"]
  }
];

export default function WhyUs() {
  return (
    <section className={`section ${styles.whyUsSection}`}>
      <div className="container">
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <span className={styles.tagline}>Neden Hastürk Sanat & Mimarlık?</span>
          <h2 className={styles.title}>
            Tarihi Mirası Yarınlara Taşıyan <br />
            <span className="text-gold">4 Temel Uzmanlık Sütunumuz</span>
          </h2>
          <p className={styles.subtitle}>
            Sıradan bir inşaat yaklaşımının ötesinde; bilimsel restorasyon kriterleri, ileri mühendislik ve zanaat tutkusuyla mekanlara yeni bir hayat kazandırıyoruz.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {pillars.map((item, idx) => (
            <motion.div 
              key={idx}
              className={styles.card}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
            >
              <span className={styles.cardNumber}>{item.num}</span>
              <div className={styles.cardTop}>
                <div className={styles.iconBox}>{item.icon}</div>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDesc}>{item.desc}</p>
              </div>
              <div className={styles.badgeList}>
                {item.badges.map((b, bIdx) => (
                  <span key={bIdx} className={styles.badge}>{b}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
