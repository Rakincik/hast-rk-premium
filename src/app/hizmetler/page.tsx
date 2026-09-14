"use client";

import { motion, Variants } from "framer-motion";
import styles from "./hizmetler.module.css";
import Link from "next/link";
import { 
  Building2, 
  Brush, 
  Hammer, 
  Home, 
  Construction, 
  Paintbrush, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  ChevronRight
} from "lucide-react";

const services = [
  {
    id: 1,
    index: "01",
    title: "Restorasyon & Konservasyon",
    desc: "Tescilli ahşap konaklar, yalılar, camiler ve taş binaların özgünlüğünü ve tarihi ruhunu koruyarak, Venedik Tüzüğü ilkelerine tam uyumla aslına döndürülmesi.",
    icon: <Building2 size={28} />,
    quoteType: "restoration",
    deliverables: [
      "Kültür Varlıklarını Koruma Bölge Kurulu onay dosyaları",
      "Geleneksel horasan harcı ve özgün malzeme analizleri",
      "Bozulma & hasar tespit lejantları (patina, korozyon, çatlak)",
      "Vakıflar Genel Müdürlüğü ve Belediye tescil süreç takibi"
    ]
  },
  {
    id: 2,
    index: "02",
    title: "Rölöve & Restitüsyon",
    desc: "Tarihi ve tescilli yapıların mevcut geometrik durumlarının 3D karasal lazer tarama teknolojisiyle milimetrik hassasiyette ölçülüp resmi projeye dönüştürülmesi.",
    icon: <Brush size={28} />,
    quoteType: "restoration",
    deliverables: [
      "Milyonlarca koordinatlı 3D Lidar nokta bulutu (Point Cloud)",
      "Milimetrik kat planları, kesitler ve cephe açılımları",
      "Tarihi arşiv, tapu tahrir ve eski fotoğraf restitüsyon etütleri",
      "Müdahale paftaları ve koruma öncelik raporları"
    ]
  },
  {
    id: 3,
    index: "03",
    title: "Statik Güçlendirme & Sismik Analiz",
    desc: "Yığma taş, tuğla ve ahşap karkas yapıların deprem performanslarının modellenerek, tarihi dokuyu bozmayan görünmez modern tekniklerle güçlendirilmesi.",
    icon: <Hammer size={28} />,
    quoteType: "strengthening",
    deliverables: [
      "Lineer olmayan (Non-linear) dinamik deprem simülasyonları",
      "CFRP (Karbon Elyaf Takviyeli Polimer) kompozit sargılama",
      "Tarihi harç hidrolik kireç mikro-enjeksiyon konsolidasyonu",
      "Üniversite danışman onaylı statik rapor ve hesap dosyaları"
    ]
  },
  {
    id: 4,
    index: "04",
    title: "Mimari Tasarım & Ruhsatlandırma",
    desc: "Müstakil villalar, sit alanları, butik oteller ve özel rezidanslar için tarihi çevreye saygılı, çağdaş yaşam konforunu maksimize eden özgün mimari projeler.",
    icon: <Home size={28} />,
    quoteType: "new_architecture",
    deliverables: [
      "BIM tabanlı mimari konsept ve resmi ruhsat projeleri",
      "Fotogerçekçi 3D dış ve iç mekan render görselleştirmeleri",
      "Doğal taş, ahşap ve çevreyle uyumlu sürdürülebilir kabuk tasarımı",
      "Detaylı mahal listeleri, malzeme şartnameleri ve metrajlar"
    ]
  },
  {
    id: 5,
    index: "05",
    title: "Taahhüt & Şantiye Yönetimi",
    desc: "Restorasyon ve mimari projelerin planlanan bütçe ve takvime sadık kalınarak, birinci sınıf usta işçiliği ve mühendislik denetimiyle anahtar teslim inşası.",
    icon: <Construction size={28} />,
    quoteType: "restoration",
    deliverables: [
      "Anahtar teslim şantiye organizasyonu ve iş güvenliği yönetimi",
      "Haftalık ilerleme raporları ve dijital fotoğraf arşivleme",
      "Sertifikalı restoratör taş, ahşap ve demir ustaları kadrosu",
      "Şeffaf hakediş ve kesin hesap maliyet kontrolü"
    ]
  },
  {
    id: 6,
    index: "06",
    title: "Sanat Eserleri & Tezyinat Konservasyonu",
    desc: "Tarihi yapılardaki kalem işi bezemeler, altın varaklar, hat levhaları, tavan göbekleri ve yağlı boya tabloların bilimsel yöntemlerle korunması ve restore edilmesi.",
    icon: <Paintbrush size={28} />,
    quoteType: "restoration",
    deliverables: [
      "Özgün katman raspaları ve pigment tayin testleri",
      "Geleneksel altın varak yapıştırma ve koruyucu vernikleme",
      "Müze standartlarında temizleme ve yüzey konsolidasyonu",
      "Detaylı restorasyon konservasyon öncesi/sonrası belgeleme"
    ]
  }
];

export default function HizmetlerPage() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className={styles.container}>
      {/* Hero Header */}
      <motion.div 
        className={styles.hero}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className={styles.badge}>
          <Sparkles size={14} /> Uzmanlık Alanlarımız
        </div>
        <h1 className={styles.title}>Mimari & Restorasyon Hizmetlerimiz</h1>
        <p className={styles.subtitle}>
          Tarihi dokuya saygıyı, modern mühendislik disiplini ve bilimsel koruma ilkeleriyle birleştiriyoruz.
        </p>
      </motion.div>

      {/* Services Grid */}
      <motion.div 
        className={styles.grid}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {services.map((service) => (
          <motion.div key={service.id} className={styles.card} variants={itemVariants}>
            <div>
              <div className={styles.cardTop}>
                <div className={styles.iconWrapper}>
                  {service.icon}
                </div>
                <span className={styles.serviceIndex}>{service.index}</span>
              </div>

              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDesc}>{service.desc}</p>

              {/* Technical deliverables list */}
              <div className={styles.featuresList}>
                {service.deliverables.map((item, idx) => (
                  <div key={idx} className={styles.featureItem}>
                    <CheckCircle2 size={16} className={styles.checkIcon} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className={styles.cardActions}>
              <Link 
                href={`/teklif-al?type=${service.quoteType}`}
                className={styles.quoteBtn}
              >
                <span>Maliyet Hesapla</span>
                <ArrowRight size={15} className={styles.arrowIcon} />
              </Link>

              <Link 
                href="/iletisim"
                className={styles.consultLink}
              >
                <span>Uzmana Danış</span>
                <ChevronRight size={14} />
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
