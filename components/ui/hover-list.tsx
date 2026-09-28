"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  createContext,
  ReactNode,
  useContext,
  useId,
  useMemo,
  useState,
} from "react";

import { cn } from "@/lib/utils";

type HoverListContextValue = {
  hovered: string | null;
  setHovered: (_id: string | null) => void;
  layoutId: string;
};

const HoverListContext = createContext<HoverListContextValue | null>(null);

/**
 * Aceternity-style "card hover effect": a shared highlight slides behind
 * whichever HoverItem the pointer is over. Children-based so Server
 * Components can render it.
 */
export const HoverList = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const [hovered, setHovered] = useState<string | null>(null);
  const layoutId = useId();
  const value = useMemo(
    () => ({ hovered, setHovered, layoutId }),
    [hovered, layoutId],
  );

  return (
    <HoverListContext.Provider value={value}>
      <div className={cn("-mx-3", className)}>{children}</div>
    </HoverListContext.Provider>
  );
};

export const HoverItem = ({
  id,
  children,
  className,
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) => {
  const ctx = useContext(HoverListContext);
  const reduceMotion = useReducedMotion();
  const isHovered = ctx?.hovered === id;

  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={() => ctx?.setHovered(id)}
      onMouseLeave={() => ctx?.setHovered(null)}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.span
            layoutId={reduceMotion ? undefined : ctx?.layoutId}
            className="absolute inset-0 rounded-lg border bg-accent/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.15 } }}
            exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.1 } }}
          />
        )}
      </AnimatePresence>
      <div className="relative">{children}</div>
    </div>
  );
};
