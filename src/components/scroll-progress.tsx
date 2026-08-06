"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform, useReducedMotion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

const SIZE = 44;
const STROKE = 2.5;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const dashOffset = useTransform(smoothProgress, (v) => CIRCUMFERENCE * (1 - v));

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      setVisible(v > 0.06);
    });
    return unsubscribe;
  }, [scrollYProgress]);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: shouldReduceMotion ? "auto" : "smooth" });
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-canvas/90 shadow-lg ring-1 ring-line backdrop-blur transition-colors hover:ring-primary-400 dark:bg-canvas-dark/90 dark:ring-line-dark"
        >
          <svg width={SIZE} height={SIZE} className="absolute inset-0 -rotate-90">
            <circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              strokeWidth={STROKE}
              className="stroke-line dark:stroke-line-dark"
            />
            <motion.circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              strokeWidth={STROKE}
              strokeLinecap="round"
              className="stroke-primary-500"
              style={{
                strokeDasharray: CIRCUMFERENCE,
                strokeDashoffset: shouldReduceMotion ? 0 : dashOffset,
              }}
            />
          </svg>
          <ArrowUp size={15} className="text-ink-soft dark:text-ink-inverse/80" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
