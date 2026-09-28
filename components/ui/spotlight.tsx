"use client";

import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

/** Aceternity-style spotlight: a soft, blurred beam behind the hero. */
const Spotlight = ({ className }: { className?: string }) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.svg
      aria-hidden
      initial={reduceMotion ? false : { opacity: 0, x: -40, y: -30 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 1.6, ease: "easeOut", delay: 0.3 }}
      className={cn(
        "pointer-events-none absolute -z-10 hidden h-[140%] w-[160%] dark:block",
        className,
      )}
      viewBox="0 0 3787 2842"
      fill="none"
    >
      <g filter="url(#spotlight-blur)">
        <ellipse
          cx="1924.71"
          cy="273.501"
          rx="1924.71"
          ry="273.501"
          transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
          fill="white"
          fillOpacity="0.06"
        />
      </g>
      <defs>
        <filter
          id="spotlight-blur"
          x="0.860352"
          y="0.838989"
          width="3785.16"
          height="2840.26"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="151" result="effect1_foregroundBlur" />
        </filter>
      </defs>
    </motion.svg>
  );
};

export default Spotlight;
