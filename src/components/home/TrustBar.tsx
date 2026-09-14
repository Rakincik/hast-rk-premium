"use client";

import { motion } from "framer-motion";
import styles from "./TrustBar.module.css";
import { Award, Compass, Scale, ScanLine } from "lucide-react";

const trustItems = [
  {
    icon: <Award size={24} strokeWidth={1.75} />,
    title: "TMMOB Tescilli Büro",
    subtitle: "Mimarlar Odası Yasal Standartları & En Az Bedel Güvencesi"
  },
  {
    icon: <Scale size={24} strokeWidth={1.75} />,
    title: "Kurul & Hukuk Yetkinliği",
    subtitle: "Kültür Varlıkları Koruma Bölge Kurulu Tam Dosya Hakimiyeti"
  },
  {
    icon: <ScanLine size={24} strokeWidth={1.75} />,
    title: "3D Lidar Tarama",
    subtitle: "Milimetrik Lazer Nokta Bulutu ve Fotogrametrik Belgeleme"
  },
  {
    icon: <Compass size={24} strokeWidth={1.75} />,
    title: "UNESCO & Venedik Tüzüğü",
    subtitle: "Uluslararası Tarihi Doku Koruma ve Özgünlük İlkeleri"
  }
];

export default function TrustBar() {
  return (
    <section className={styles.trustSection}>
      <div className="container">
        <div className={styles.trustGrid}>
          {trustItems.map((item, idx) => (
            <motion.div 
              key={idx}
              className={styles.trustItem}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className={styles.iconWrapper}>
                {item.icon}
              </div>
              <div className={styles.textContent}>
                <h4 className={styles.itemTitle}>{item.title}</h4>
                <p className={styles.itemSubtitle}>{item.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
