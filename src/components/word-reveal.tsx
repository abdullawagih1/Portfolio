"use client";

import { motion, useReducedMotion } from "framer-motion";

export function WordReveal({
  text,
  className,
  delay = 0,
  wordDelay = 0.055,
}: {
  text: string;
  className?: string;
  delay?: number;
  wordDelay?: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(" ");

  if (shouldReduceMotion) {
    // Render as plain, immediately-visible text — no per-word animation.
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden" aria-hidden="true">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 0.65,
              delay: delay + i * wordDelay,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
