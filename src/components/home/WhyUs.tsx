"use client";

import { motion } from "framer-motion";
import styles from "./WhyUs.module.css";
import { Landmark, Scan, Hammer, GraduationCap } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function WhyUs() {
  const { t, language } = useLanguage();

  const getBadges = (pillarIdx: number): string[] => {
    switch (pillarIdx) {
      case 0:
        return language === "en" ? ["Board Approvals", "Licensing", "Regulatory Analysis"] :
               language === "de" ? ["Denkmalschutz-Genehmigung", "Baugenehmigung", "Rechtsanalyse"] :
               language === "ar" ? ["مصادقات لجان الآثار", "التراخيص الرسمية", "تحليل اللوائح"] :
               ["Kurul Onay Takibi", "Ruhsatlandırma", "Mevzuat Analizi"];
      case 1:
        return language === "en" ? ["Point Cloud", "Deformation Mapping", "3D BIM"] :
               language === "de" ? ["Punktwolke", "Verformungsanalyse", "3D-BIM"] :
               language === "ar" ? ["سحابة النقاط", "خارطة التشوهات", "نمذجة BIM ثلاثية الأبعاد"] :
               ["Nokta Bulutu", "Deformasyon Haritası", "3D BIM"];
      case 2:
        return language === "en" ? ["Khorasan Mortar", "Kundekari", "Historic Timber"] :
               language === "de" ? ["Horasan-Mörtel", "Kündekari-Intarsien", "Historisches Holz"] :
               language === "ar" ? ["ملاط الخرسان", "فن الكندكاري", "أخشاب تراثية"] :
               ["Horasan Harcı", "Kündekari", "Geleneksel Ahşap"];
      case 3:
      default:
        return language === "en" ? ["Prof. Dr. Advisory", "Structural Calculations", "Heritage Law"] :
               language === "de" ? ["Prof. Dr. Beratung", "Statikprüfung", "Denkmalschutzrecht"] :
               language === "ar" ? ["استشارات بروفيسور", "حسابات إنشائية", "قانون التراث"] :
               ["Prof. Dr. Danışmanlığı", "Statik Hesap", "Koruma Hukuku"];
    }
  };

  const pillars = [
    {
      num: "01",
      title: t("why_p1_title", "Kurul & Mevzuat Yetkinliği"),
      desc: t("why_p1_desc", "1. ve 2. grup tescilli eserlerde Kültür Varlıkları Koruma Kurulu, KUDEB ve Anıtlar Kurulu onay süreçlerinde sıfır fire ve %100 onay garantili dosya yönetimi."),
      icon: <Landmark size={28} strokeWidth={1.5} />,
      badges: getBadges(0)
    },
    {
      num: "02",
      title: t("why_p2_title", "3D Lidar ve Dijital İkiz"),
      desc: t("why_p2_desc", "İleri teknoloji lazer tarayıcılar ve drone fotogrametrisi ile yapının tüm eğrilik, sehim ve çatlak haritasını milimetrik hassasiyetle modelleme kabiliyeti."),
      icon: <Scan size={28} strokeWidth={1.5} />,
      badges: getBadges(1)
    },
    {
      num: "03",
      title: t("why_p3_title", "Geleneksel Malzeme ve Zanaat"),
      desc: t("why_p3_desc", "Özgün Horasan harcı kimyası, el oyması ahşap restorasyonu, kündekari ve taş işçiliğinde dönemin orijinal tekniklerine birebir sadakat."),
      icon: <Hammer size={28} strokeWidth={1.5} />,
      badges: getBadges(2)
    },
    {
      num: "04",
      title: t("why_p4_title", "Akademik & Hukuki Güç"),
      desc: t("why_p4_desc", "Y. Mimar, İnşaat Y. Müh. Prof. Dr. statik danışmanlığı, Çevre Y. Mühendisi ve Gayrimenkul Koruma Hukuku Avukatından oluşan multidisipliner kadro."),
      icon: <GraduationCap size={28} strokeWidth={1.5} />,
      badges: getBadges(3)
    }
  ];

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
          <span className={styles.tagline}>{t("why_tagline", "Neden Hastürk Sanat & Mimarlık?")}</span>
          <h2 className={styles.title}>
            {t("why_title_1", "Tarihi Mirası Yarınlara Taşıyan")} <br />
            <span className="text-gold">{t("why_title_2", "4 Temel Uzmanlık Sütunumuz")}</span>
          </h2>
          <p className={styles.subtitle}>
            {t("why_subtitle", "Sıradan bir inşaat yaklaşımının ötesinde; bilimsel restorasyon kriterleri, ileri mühendislik ve zanaat tutkusuyla mekanlara yeni bir hayat kazandırıyoruz.")}
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
