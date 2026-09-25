"use client";

import { MotionConfig, motion } from "framer-motion";
import type { ReactNode } from "react";

// One-time fade-and-rise (16px, 400ms) as a section scrolls into view.
// With prefers-reduced-motion, framer skips the movement and only fades.
// Don't wrap above-the-fold content: it starts hidden until hydrated.
export default function Reveal({
  children,
  className,
  delay = 0,
  "data-slot": slot = "reveal",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  "data-slot"?: string;
}) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        data-slot={slot}
        className={className}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 0.4, ease: "easeOut", delay }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
