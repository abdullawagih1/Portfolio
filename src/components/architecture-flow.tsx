"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ArchitectureNode } from "@/content/projects";

const accentByVisualSystem: Record<string, string> = {
  "evidence-trail": "primary",
  "operations-inbox": "accent",
  "diagnosis-roadmap": "primary",
  "proposal-flow": "accent",
  "privacy-tracking": "primary",
  "modular-exam": "accent",
  "property-graph": "primary",
};

export function ArchitectureFlow({
  nodes,
  visualSystem,
}: {
  nodes: ArchitectureNode[];
  visualSystem: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const accent = accentByVisualSystem[visualSystem] ?? "primary";
  const dot = accent === "accent" ? "bg-accent-500" : "bg-primary-500";
  const border = accent === "accent" ? "hover:border-accent-400" : "hover:border-primary-400";
  const lineColor = accent === "accent" ? "stroke-accent-300 dark:stroke-accent-700" : "stroke-primary-300 dark:stroke-primary-700";

  return (
    <div
      className="-mx-6 flex gap-4 overflow-x-auto px-6 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-x-5 sm:gap-y-8 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3"
      role="list"
      aria-label="System architecture flow"
    >
      {nodes.map((node, i) => (
        <div key={node.label} className="relative min-w-[240px] flex-shrink-0 sm:min-w-0">
          {/* Connecting line to the next node (desktop grid only) */}
          {i < nodes.length - 1 && (i + 1) % 3 !== 0 && (
            <svg
              className="pointer-events-none absolute -right-5 top-1/2 z-10 hidden h-3 w-5 -translate-y-1/2 sm:block lg:block"
              viewBox="0 0 20 12"
              aria-hidden="true"
            >
              <motion.line
                x1="0"
                y1="6"
                x2="20"
                y2="6"
                strokeWidth="1.5"
                className={lineColor}
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.4, delay: 0.08 * i + 0.15 }}
              />
            </svg>
          )}

          <motion.div
            role="listitem"
            className={`card-blueprint h-full border p-5 transition-colors ${border}`}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-3 flex items-center gap-2">
              <span className={`h-1.5 w-1.5 rounded-full ${dot}`} aria-hidden="true" />
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint dark:text-ink-inverse/40">
                Node {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="font-display text-[15px] font-semibold text-ink dark:text-ink-inverse">
              {node.label}
            </h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-ink-soft dark:text-ink-inverse/70">
              {node.description}
            </p>
            {i < nodes.length - 1 && (
              <ArrowRight size={14} className="mt-4 text-ink-faint sm:hidden" aria-hidden="true" />
            )}
          </motion.div>
        </div>
      ))}
    </div>
  );
}
