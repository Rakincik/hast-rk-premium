"use client";

import { motion, Variants } from "framer-motion";
import styles from "./kurumsal.module.css";
import Image from "next/image";

export default function KurumsalPage() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <div className={styles.container}>
      <motion.div 
        className={styles.hero}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className={styles.title}>
          Geçmişten Geleceğe <br/>
          <span className={styles.titleGold}>Ustalıkla</span>
        </h1>
        <p className={styles.subtitle}>
          Tarihi dokuyu koruyarak, modern mühendisliğin getirdiği güvenle mekanları yeniden tasarlıyor ve hayata döndürüyoruz.
        </p>
      </motion.div>

      <motion.div 
        className={styles.contentWrapper}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div className={styles.imageContainer} variants={itemVariants}>
          <img 
            src="/projects/taksim-360/IMG_2860.JPG" 
            alt="Hastürk Sanat ve Mimarlık Restorasyon Projesi" 
            className={styles.image}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div className={styles.overlay} />
        </motion.div>

        <motion.div className={styles.textContent}>
          <motion.div className={styles.sectionBlock} variants={itemVariants}>
            <h2>Hakkımızda</h2>
            <p>
              Hastürk Sanat ve Mimarlık olarak yılların verdiği bilgi birikimi ve tecrübeyle; restorasyon, rölöve, mimari tasarım, taahhüt ve güçlendirme işlerinde uzmanlaşmış bir ekibiz. Geçmişin mirasını geleceğin teknolojisiyle harmanlayarak kalıcı eserler ortaya koyuyoruz.
            </p>
          </motion.div>

          <motion.div className={styles.sectionBlock} variants={itemVariants}>
            <h2>Misyonumuz</h2>
            <p>
              Kültürel ve tarihi mirasımızı en doğru yöntemlerle korumak, onarmak ve gelecek nesillere güvenle aktarmak. Her projede estetik, dayanıklılık ve işlevselliği en üst düzeyde tutmak.
            </p>
          </motion.div>

          <motion.div className={styles.sectionBlock} variants={itemVariants}>
            <h2>Vizyonumuz</h2>
            <p>
              Sektörde yenilikçi çözümler üreten, restorasyon ve mimari tasarım alanında öncü, sadece Türkiye'de değil uluslararası alanda da tanınan lider bir mimarlık ve taahhüt firması olmak.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
