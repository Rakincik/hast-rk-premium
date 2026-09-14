"use client";

import { motion } from "framer-motion";
import styles from "./Services.module.css";
import { Hammer, Search, PenTool, ShieldCheck, Building2 } from "lucide-react";

const servicesData = [
  {
    id: 1,
    title: "Restorasyon",
    description: "Tarihi yapıların özgün kimliklerini koruyarak geleceğe taşınmasını sağlayan kapsamlı onarım süreçleri.",
    icon: <Building2 size={40} strokeWidth={1.5} />,
  },
  {
    id: 2,
    title: "Rölöve & Restitüsyon",
    description: "Tarihi eserlerin mevcut durumlarının belgelenmesi ve ilk yapıldığı dönemdeki haline sadık kalınarak yeniden projelendirilmesi.",
    icon: <Search size={40} strokeWidth={1.5} />,
  },
  {
    id: 3,
    title: "Mimari Tasarım",
    description: "Geleneksel motifleri modern ihtiyaçlarla harmanlayan, çevreye duyarlı ve estetik mimari çözümler.",
    icon: <PenTool size={40} strokeWidth={1.5} />,
  },
  {
    id: 4,
    title: "Güçlendirme",
    description: "Yıpranmış yapıların strüktürel zayıflıklarını gidermek için uygulanan gelişmiş mühendislik teknikleri.",
    icon: <ShieldCheck size={40} strokeWidth={1.5} />,
  },
  {
    id: 5,
    title: "Taahhüt İşleri",
    description: "Projelerin anahtar teslim süreçlerinde, bütçe ve zaman planlamasına uygun, yüksek kalite standartlarında uygulama.",
    icon: <Hammer size={40} strokeWidth={1.5} />,
  }
];

export default function Services() {
  return (
    <section className={`section ${styles.servicesSection}`}>
      <div className="container">
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className={styles.title}>Hizmetlerimiz</h2>
          <p className={styles.subtitle}>Geçmişin mirasını, modern teknolojinin gücüyle yeniden var ediyoruz.</p>
        </motion.div>

        <div className={styles.grid}>
          {servicesData.map((service, index) => (
            <motion.div
              key={service.id}
              className={styles.card}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className={styles.iconWrapper}>{service.icon}</div>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDesc}>{service.description}</p>
              <div className={styles.cardHoverEffect} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
