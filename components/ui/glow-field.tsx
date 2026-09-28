"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

type Glow = {
  id: number;
  left: number;
  top: number;
  size: number;
  opacity: number;
  drift: number;
  duration: number;
};

const between = (min: number, max: number) => min + Math.random() * (max - min);

const makeGlows = (count: number): Glow[] =>
  Array.from({ length: count }, (_, id) => ({
    id,
    left: between(0, 100),
    top: between(0, 100),
    size: between(160, 320),
    opacity: between(0.5, 1),
    drift: between(12, 28),
    duration: between(14, 24),
  }));

/**
 * A few small, soft glows scattered across the viewport.
 * Positions are random per visit, so they're generated after mount to keep
 * the server and client HTML identical.
 */
const GlowField = ({ count = 5 }: { count?: number }) => {
  const [glows, setGlows] = useState<Glow[]>([]);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setGlows(makeGlows(count));
  }, [count]);

  return (
    <div
      aria-hidden
      data-glow
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {glows.map((glow) => (
        <motion.div
          key={glow.id}
          className="absolute aspect-square rounded-full"
          style={{
            left: `${glow.left}%`,
            top: `${glow.top}%`,
            width: glow.size,
            translateX: "-50%",
            translateY: "-50%",
            // Extra color stops ease the falloff so the faint gradient doesn't band
            // into visible rings.
            background:
              "radial-gradient(circle at center, var(--glow) 0%, color-mix(in oklab, var(--glow) 70%, transparent) 20%, color-mix(in oklab, var(--glow) 40%, transparent) 40%, color-mix(in oklab, var(--glow) 15%, transparent) 55%, transparent 70%)",
            filter: "blur(32px)",
          }}
          initial={{ opacity: 0 }}
          animate={
            reduceMotion
              ? { opacity: glow.opacity }
              : {
                  opacity: glow.opacity,
                  y: [0, -glow.drift, 0],
                  x: [0, glow.drift / 2, 0],
                }
          }
          transition={{
            opacity: { duration: 2, ease: "easeOut" },
            x: { duration: glow.duration, repeat: Infinity, ease: "easeInOut" },
            y: { duration: glow.duration, repeat: Infinity, ease: "easeInOut" },
          }}
        />
      ))}
    </div>
  );
};

export default GlowField;
