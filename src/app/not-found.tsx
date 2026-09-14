"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./not-found.module.css";
import MagneticButton from "@/components/ui/MagneticButton";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.errorCode}>404</div>
      
      <motion.div 
        className={styles.content}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className={styles.title}>
          Burada <span>restorasyon</span> çalışmaları devam ediyor.
        </h1>
        <p className={styles.desc}>
          Görünüşe göre aradığınız sayfa henüz inşa edilmedi veya adres değişti. 
          Lütfen sağlam temelleri olan anasayfamıza dönün.
        </p>
        
        <MagneticButton>
          <Link href="/" className={styles.homeBtn}>
            Anasayfaya Dön
          </Link>
        </MagneticButton>
      </motion.div>
    </div>
  );
}
