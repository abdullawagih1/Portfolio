"use client";

import { motion, useReducedMotion } from "framer-motion";

type Callout = {
  id: string;
  label: string;
  sublabel: string;
  // Position of the label box, in percent of the container.
  x: number;
  y: number;
  // Where the connecting line attaches on the central card, in percent.
  anchorX: number;
  anchorY: number;
  side: "left" | "right";
};

const callouts: Callout[] = [
  { id: "rag", label: "RAG", sublabel: "Evidence-traceable retrieval", x: 4, y: 14, anchorX: 30, anchorY: 30, side: "left" },
  { id: "agents", label: "AI Agents", sublabel: "Orchestrated workflows", x: 4, y: 62, anchorX: 28, anchorY: 68, side: "left" },
  { id: "routing", label: "Model Routing", sublabel: "Cost & quality balance", x: 66, y: 10, anchorX: 72, anchorY: 28, side: "right" },
  { id: "review", label: "Human Review", sublabel: "Checkpoints that matter", x: 66, y: 64, anchorX: 70, anchorY: 70, side: "right" },
];

function ConnectingLine({ callout, shouldReduceMotion }: { callout: Callout; shouldReduceMotion: boolean | null }) {
  const startX = callout.side === "left" ? callout.x + 15 : callout.x;
  const startY = callout.y + 4;
  const midX = (startX + callout.anchorX) / 2;

  const d = `M ${startX} ${startY} Q ${midX} ${startY}, ${callout.anchorX} ${callout.anchorY}`;

  return (
    <>
      <motion.path
        d={d}
        fill="none"
        strokeWidth="0.4"
        className="stroke-primary-300 dark:stroke-primary-700"
        strokeDasharray="2 1.4"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.9, ease: "easeInOut", delay: 0.15 }}
      />
      <motion.circle
        cx={callout.anchorX}
        cy={callout.anchorY}
        r={0.9}
        className="fill-accent-500"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: shouldReduceMotion ? 0 : 0.9 }}
      />
    </>
  );
}

export function AnnotatedDiagram() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className="relative mx-auto aspect-[4/3.4] w-full max-w-[480px]"
      role="img"
      aria-label="Diagram: a central AI platform connected to RAG, AI Agents, Model Routing, and Human Review capabilities"
    >
      {/* Connecting lines, drawn in diagram-space coordinates (0-100) */}
      <svg
        viewBox="0 0 100 86"
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        {callouts.map((c) => (
          <ConnectingLine key={c.id} callout={c} shouldReduceMotion={shouldReduceMotion} />
        ))}
      </svg>

      {/* Central card */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="flex h-[132px] w-[168px] flex-col items-center justify-center rounded-2xl border border-primary-200 bg-surface shadow-[0_20px_60px_-15px_rgba(34,71,190,0.25)] motion-safe:animate-[breathe_5s_ease-in-out_infinite] dark:border-primary-800 dark:bg-surface-dark"
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600">
            <span className="font-display text-[14px] font-semibold text-white">AI</span>
          </div>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint dark:text-ink-inverse/40">
            Platform Core
          </p>
          <p className="mt-1 font-display text-[13px] font-semibold text-ink dark:text-ink-inverse">
            Production AI System
          </p>
        </motion.div>
      </div>

      {/* Floating callouts */}
      {callouts.map((c, i) => (
        <motion.div
          key={c.id}
          className={`card-blueprint absolute w-[150px] border px-3.5 py-2.5 ${
            c.side === "right" ? "text-right" : ""
          }`}
          style={{ left: `${c.x}%`, top: `${c.y}%` }}
          initial={{ opacity: 0, x: shouldReduceMotion ? 0 : c.side === "left" ? -14 : 14, y: shouldReduceMotion ? 0 : 8 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-display text-[13px] font-semibold text-ink dark:text-ink-inverse">
            {c.label}
          </p>
          <p className="mt-0.5 text-[11px] leading-snug text-ink-soft dark:text-ink-inverse/60">
            {c.sublabel}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
