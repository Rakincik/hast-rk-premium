"use client";

import { RefObject, useEffect, useState } from "react";
import styles from "./SwipeDots.module.css";

interface SwipeDotsProps {
  trackRef: RefObject<HTMLElement | null>;
  count: number;
}

/**
 * Mobile-only pagination dots for CSS scroll-snap carousels.
 * Hidden on >=768px via CSS, where the track renders as a normal grid.
 */
export default function SwipeDots({ trackRef, count }: SwipeDotsProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const children = Array.from(track.children) as HTMLElement[];
      if (!children.length) return;
      const trackLeft = track.getBoundingClientRect().left;
      let best = 0;
      let bestDist = Infinity;
      children.forEach((child, idx) => {
        const dist = Math.abs(child.getBoundingClientRect().left - trackLeft);
        if (dist < bestDist) {
          bestDist = dist;
          best = idx;
        }
      });
      // At the very end, the last card may never reach the left edge
      if (Math.ceil(Math.abs(track.scrollLeft) + track.clientWidth) >= track.scrollWidth - 2) {
        best = children.length - 1;
      }
      setActive(best);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [trackRef]);

  const goTo = (idx: number) => {
    const track = trackRef.current;
    const child = track?.children[idx] as HTMLElement | undefined;
    if (!track || !child) return;
    child.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  };

  if (count < 2) return null;

  return (
    <div className={styles.dots} role="tablist" aria-label="Carousel">
      {Array.from({ length: count }).map((_, idx) => (
        <button
          key={idx}
          type="button"
          role="tab"
          aria-selected={idx === active}
          aria-label={`${idx + 1} / ${count}`}
          className={`${styles.dot} ${idx === active ? styles.dotActive : ""}`}
          onClick={() => goTo(idx)}
        />
      ))}
    </div>
  );
}
