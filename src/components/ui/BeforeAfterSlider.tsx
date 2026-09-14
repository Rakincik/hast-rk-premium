"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowLeftRight } from "lucide-react";
import styles from "./beforeAfter.module.css";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
}

export default function BeforeAfterSlider({ beforeImage, afterImage }: BeforeAfterSliderProps) {
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderPosition = useMotionValue(50);
  
  // Transform percentage back to a CSS clip-path percentage for the before image
  const clipPathValue = useTransform(sliderPosition, (val) => `inset(0 ${100 - val}% 0 0)`);
  const handleLeft = useTransform(sliderPosition, (val) => `${val}%`);

  const handlePointerMove = (e: React.PointerEvent | PointerEvent) => {
    if (!isResizing || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    
    sliderPosition.set(percentage);
  };

  const handlePointerUp = () => {
    setIsResizing(false);
  };

  useEffect(() => {
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointermove", handlePointerMove);
    return () => {
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [isResizing]);

  return (
    <div 
      className={styles.sliderContainer} 
      ref={containerRef}
      onPointerDown={(e) => {
        setIsResizing(true);
        handlePointerMove(e);
      }}
    >
      {/* After Image (Background) */}
      <img src={afterImage} alt="After" className={styles.image} />
      <div className={`${styles.label} ${styles.labelAfter}`}>Sonrası</div>

      {/* Before Image (Clipped overlay) */}
      <motion.div 
        className={styles.beforeImageContainer} 
        style={{ width: "100%", clipPath: clipPathValue }}
      >
        <img src={beforeImage} alt="Before" className={styles.image} />
        <div className={`${styles.label} ${styles.labelBefore}`}>Öncesi</div>
      </motion.div>

      {/* Draggable Handle */}
      <motion.div 
        className={styles.handleContainer}
        style={{ left: handleLeft, x: "-50%" }}
      >
        <div className={styles.handle}>
          <ArrowLeftRight size={24} />
        </div>
      </motion.div>
    </div>
  );
}
