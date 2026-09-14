"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import styles from "./preloader.module.css";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1.5s luxury opening timer
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <div className={styles.preloaderWrapper}>
          {/* Left Curtain */}
          <motion.div 
            className={`${styles.curtain} ${styles.curtainLeft}`}
            initial={{ x: "0%" }}
            exit={{ 
              x: "-100%", 
              transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.2 } 
            }}
          />

          {/* Right Curtain */}
          <motion.div 
            className={`${styles.curtain} ${styles.curtainRight}`}
            initial={{ x: "0%" }}
            exit={{ 
              x: "100%", 
              transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.2 } 
            }}
          />

          {/* Center Split Seam Hairline */}
          <motion.div 
            className={styles.centerSeam}
            initial={{ opacity: 1, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />

          {/* Pure Logo Emblem in Center - NO TEXT */}
          <motion.div 
            className={styles.logoOnlyContainer}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, transition: { duration: 0.35 } }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Glowing Golden Ambient Backlight Halo */}
            <div className={styles.logoHalo} />

            {/* Pulsing Concentric Gold Rings */}
            <div className={styles.pulseRing} />
            <div className={styles.pulseRingOuter} />

            {/* Official Logo Emblem */}
            <div className={styles.logoWrapper}>
              <Image 
                src="/logo.avif" 
                alt="Hastürk Logo" 
                width={120} 
                height={120} 
                priority
                className={styles.emblemImg}
              />
            </div>
            
            {/* Minimal Luxury Gold Accent Bar */}
            <div className={styles.loadingLineContainer}>
              <motion.div 
                className={styles.loadingLine}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
