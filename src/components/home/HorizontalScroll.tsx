"use client";

import { useRef } from "react";
import styles from "./horizontalScroll.module.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function HorizontalScroll() {
  const { t, language } = useLanguage();
  const trackRef = useRef<HTMLDivElement>(null);

  const getStepPrefix = (numStr: string) => {
    switch (language) {
      case "en":
        return `Phase ${numStr}`;
      case "de":
        return `Phase ${numStr}`;
      case "ar":
        return `المرحلة ${numStr}`;
      default:
        return `Aşama ${numStr}`;
    }
  };

  const steps = [
    {
      id: 1,
      title: t("step_1_title", "Keşif ve Analiz"),
      desc: t("step_1_desc", "Tarihi dokunun uzman restoratör mimar ve mühendislerimiz tarafından şantiyede incelenmesi ve restorasyon haritasının çıkarılması."),
      step: getStepPrefix("01"),
      num: "01",
      image: "/projects/karma-isler/IMG-20240101-WA0014.JPG"
    },
    {
      id: 2,
      title: t("step_2_title", "Rölöve & Ahşap Zanaat"),
      desc: t("step_2_desc", "Mevcut durumun milimetrik belgelenmesi, özgün masif ahşap profillerin ve taşıyıcı elemanların birebir rölöve çıkarımı."),
      step: getStepPrefix("02"),
      num: "02",
      image: "/projects/karma-isler/IMG_20210512_123036_173.JPG"
    },
    {
      id: 3,
      title: t("step_3_title", "Mimari Projelendirme & Askılama"),
      desc: t("step_3_desc", "Tarihi cephenin korunması için ağır çelik askılama kuleleri ve Koruma Kurulu onaylı restorasyon projelerinin hazırlanması."),
      step: getStepPrefix("03"),
      num: "03",
      image: "/projects/karma-isler/IMG-20231010-WA0025.JPG"
    },
    {
      id: 4,
      title: t("step_4_title", "Statik Güçlendirme & Zemin"),
      desc: t("step_4_desc", "Kompakt sondaj ve mini kazık makineleriyle temel altı tahkimatı ve enjeksiyonlarla binanın deprem güvenliğinin artırılması."),
      step: getStepPrefix("04"),
      num: "04",
      image: "/projects/guclendirme/IMG_0211.jpeg"
    },
    {
      id: 5,
      title: t("step_5_title", "Uygulama ve Teslim"),
      desc: t("step_5_desc", "Taksim 360 ve tescilli anıt eserlerde geleneksel taş ve sıva ustalığıyla restorasyonun tamamlanarak eserin geleceğe teslim edilmesi."),
      step: getStepPrefix("05"),
      num: "05",
      image: "/projects/taksim-360/IMG_2866.jpg"
    }
  ];

  const scrollLeft = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: -420, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: 420, behavior: "smooth" });
    }
  };

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.subtitle}>{t("process_badge", "Mimari Yol Haritası")}</span>
            <h2 className={styles.title}>{t("process_title", "Yeniden Doğuş: 5 Aşamalı Süreç")}</h2>
            <p className={styles.headerDesc}>
              {t("process_subtitle", "Tarihi yapıları ilk günkü ihtişamına kavuştururken izlediğimiz bilimsel ve tescilli restorasyon adımları.")}
            </p>
          </div>

          <div className={styles.navArrows}>
            <button 
              type="button" 
              onClick={scrollLeft} 
              className={styles.arrowBtn}
              aria-label="Önceki Aşama"
            >
              <ChevronLeft size={22} />
            </button>
            <button 
              type="button" 
              onClick={scrollRight} 
              className={styles.arrowBtn}
              aria-label="Sonraki Aşama"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.scrollWrapper}>
        <div ref={trackRef} className={styles.scrollTrack}>
          {steps.map((item) => (
            <div key={item.id} className={styles.card}>
              <img src={item.image} alt={item.title} className={styles.image} />
              
              <div className={styles.cardTop}>
                <span className={styles.stepBadge}>{item.step}</span>
                <span className={styles.stepNum}>{item.num}</span>
              </div>

              <div className={styles.overlay}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDesc}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
