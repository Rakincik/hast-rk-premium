"use client";

import { useRef, useEffect } from "react";
import styles from "./spotlight.module.css";

export default function SpotlightReveal() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        containerRef.current.style.setProperty("--mouseX", `${x}px`);
        containerRef.current.style.setProperty("--mouseY", `${y}px`);
      }
    };
    
    // Set initial position to center
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      containerRef.current.style.setProperty("--mouseX", `${rect.width / 2}px`);
      containerRef.current.style.setProperty("--mouseY", `${rect.height / 2}px`);
      containerRef.current.addEventListener("mousemove", handleMouseMove);
    }
    
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      {/* Background faint text */}
      <div className={styles.text}>
        Tarihin<br/>Karanlıkta Kalan<br/>Sırlarını Aydınlatıyoruz.
      </div>
      
      {/* Spotlight revealed text using hardware-accelerated CSS Mask */}
      <div 
        className={styles.spotlightLayer}
        style={{
          WebkitMaskImage: "radial-gradient(circle 150px at var(--mouseX, 50%) var(--mouseY, 50%), black 0%, transparent 100%)",
          maskImage: "radial-gradient(circle 150px at var(--mouseX, 50%) var(--mouseY, 50%), black 0%, transparent 100%)"
        }}
      >
        <div className={styles.revealedText}>
          Tarihin<br/>Karanlıkta Kalan<br/>Sırlarını Aydınlatıyoruz.
        </div>
      </div>
    </div>
  );
}
