"use client";

import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

/** Soft circular glow behind the hero. */
const Spotlight = ({ className }: { className?: string }) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden
      initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.6, ease: "easeOut", delay: 0.2 }}
      className={cn(
        "pointer-events-none absolute -z-10 aspect-square rounded-full",
        className,
      )}
      style={{
        // Extra color stops ease the falloff so the faint gradient doesn't band
        // into visible rings.
        background:
          "radial-gradient(circle at center, var(--glow) 0%, color-mix(in oklab, var(--glow) 70%, transparent) 20%, color-mix(in oklab, var(--glow) 40%, transparent) 40%, color-mix(in oklab, var(--glow) 15%, transparent) 55%, transparent 70%)",
        filter: "blur(40px)",
      }}
    />
  );
};

export default Spotlight;
