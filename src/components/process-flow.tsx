"use client";

import { motion, useReducedMotion } from "framer-motion";
import { architectProcess } from "@/content/skills";
import { Reveal } from "@/components/reveal";

export function ProcessFlow() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative">
      {/* Connecting line — desktop only: horizontal per row */}
      <svg
        className="pointer-events-none absolute inset-0 hidden h-full w-full sm:block"
        aria-hidden="true"
      >
        <motion.line
          x1="16.5%"
          y1="14%"
          x2="83.5%"
          y2="14%"
          className="stroke-primary-200 dark:stroke-primary-800"
          strokeWidth="1.5"
          strokeDasharray="5 5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: shouldReduceMotion ? 0 : 1.1, ease: "easeInOut" }}
        />
        <motion.line
          x1="16.5%"
          y1="64%"
          x2="83.5%"
          y2="64%"
          className="stroke-primary-200 dark:stroke-primary-800"
          strokeWidth="1.5"
          strokeDasharray="5 5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: shouldReduceMotion ? 0 : 1.1, ease: "easeInOut", delay: 0.5 }}
        />
      </svg>

      <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {architectProcess.map((item, i) => (
          <Reveal key={item.step} delay={i * 0.05} as="li">
            <div className="card-blueprint relative h-full border bg-canvas p-6 dark:bg-canvas-dark">
              <span className="font-mono text-[28px] font-semibold leading-none text-primary-200 dark:text-primary-800">
                {String(item.step).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-[16px] font-semibold text-ink dark:text-ink-inverse">
                {item.title}
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink-soft dark:text-ink-inverse/70">
                {item.description}
              </p>
            </div>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
