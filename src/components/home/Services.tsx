"use client";

import { motion } from "framer-motion";
import styles from "./Services.module.css";
import { Hammer, Search, PenTool, ShieldCheck, Building2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useSiteContent } from "@/context/SiteContentContext";

export default function Services() {
  const { t } = useLanguage();
  const { content } = useSiteContent();

  const getIcon = (name?: string) => {
    switch (name) {
      case "Brush":
        return <Search size={40} strokeWidth={1.5} />;
      case "Hammer":
        return <Hammer size={40} strokeWidth={1.5} />;
      case "Home":
        return <PenTool size={40} strokeWidth={1.5} />;
      case "Construction":
        return <ShieldCheck size={40} strokeWidth={1.5} />;
      case "Paintbrush":
        return <PenTool size={40} strokeWidth={1.5} />;
      default:
        return <Building2 size={40} strokeWidth={1.5} />;
    }
  };

  const servicesData = [
    {
      id: 1,
      title: t("serv_1_title", "Restorasyon"),
      description: t("serv_1_desc", "Tarihi yapıların özgün kimliklerini koruyarak geleceğe taşınmasını sağlayan kapsamlı onarım süreçleri."),
      icon: <Building2 size={40} strokeWidth={1.5} />,
    },
    {
      id: 2,
      title: t("serv_2_title", "Rölöve & Restitüsyon"),
      description: t("serv_2_desc", "Tarihi eserlerin mevcut durumlarının belgelenmesi ve ilk yapıldığı dönemdeki haline sadık kalınarak yeniden projelendirilmesi."),
      icon: <Search size={40} strokeWidth={1.5} />,
    },
    {
      id: 3,
      title: t("serv_3_title", "Mimari Tasarım"),
      description: t("serv_3_desc", "Geleneksel motifleri modern ihtiyaçlarla harmanlayan, çevreye duyarlı ve estetik mimari çözümler."),
      icon: <PenTool size={40} strokeWidth={1.5} />,
    },
    {
      id: 4,
      title: t("serv_4_title", "Güçlendirme"),
      description: t("serv_4_desc", "Yıpranmış yapıların strüktürel zayıflıklarını gidermek için uygulanan gelişmiş mühendislik teknikleri."),
      icon: <ShieldCheck size={40} strokeWidth={1.5} />,
    },
    {
      id: 5,
      title: t("serv_5_title", "Taahhüt İşleri"),
      description: t("serv_5_desc", "Projelerin anahtar teslim süreçlerinde, bütçe ve zaman planlamasına uygun, yüksek kalite standartlarında uygulama."),
      icon: <Hammer size={40} strokeWidth={1.5} />,
    }
  ];

  const list =
    content.services && content.services.length > 0
      ? content.services.map((s) => ({
          id: s.id,
          title: s.title,
          description: s.desc,
          icon: getIcon(s.iconName),
        }))
      : servicesData;

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
          <h2 className={styles.title}>{t("services_title", "Hizmetlerimiz")}</h2>
          <p className={styles.subtitle}>{t("services_subtitle", "Geçmişin mirasını, modern teknolojinin gücüyle yeniden var ediyoruz.")}</p>
        </motion.div>

        <div className={styles.grid}>
          {list.map((service, index) => (
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
