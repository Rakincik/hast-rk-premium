"use client";

import React from "react";
import styles from "./ArchitectRuler.module.css";

export default function ArchitectRuler() {
  const ticks = Array.from({ length: 30 }, (_, i) => i);

  return (
    <div className={styles.rulerContainer} aria-hidden="true">
      <div className={styles.rulerLine}>
        {ticks.map((t) => {
          const isMajor = t % 5 === 0;
          return (
            <div key={t} className={`${styles.tick} ${isMajor ? styles.majorTick : ""}`}>
              {isMajor && <span className={styles.tickLabel}>{t * 10}</span>}
            </div>
          );
        })}
      </div>
      <div className={styles.rulerDetails}>
        <span className={styles.rulerText}>HASTÜRK · ÖLÇEK 1:50 RÖLÖVE</span>
        <span className={styles.rulerCoords}>41°02′N 28°58′E</span>
      </div>
    </div>
  );
}
