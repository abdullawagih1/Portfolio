"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";

type Callout = {
  id: string;
  label: string;
  sublabel: string;
  // Label box position, in percent of the container (0-100 on both axes).
  x: number;
  y: number;
  // Exact start point of the connecting line — the label's inner corner,
  // precomputed so the line never crosses back under the label's own body.
  startX: number;
  startY: number;
  // Exact end point — the central card's nearest corner.
  anchorX: number;
  anchorY: number;
  side: "left" | "right";
};

// Central card is centered, fixed at 168x132px inside a 480x408px container:
// roughly x 32.5-67.5%, y 33.8-66.2% (measured from the rendered DOM, not
// guessed). Callouts below are positioned with generous vertical clearance
// from that box — the top row's bottom edge sits well above 33.8%, and the
// bottom row's top edge sits well below 66.2% — so every connector travels
// through genuinely empty space instead of passing under either card.
const callouts: Callout[] = [
  {
    id: "rag",
    label: "RAG",
    sublabel: "Evidence-traceable retrieval",
    x: 2,
    y: 2,
    startX: 30.8,
    startY: 21,
    anchorX: 32.5,
    anchorY: 33.8,
    side: "left",
  },
  {
    id: "agents",
    label: "AI Agents",
    sublabel: "Orchestrated workflows",
    x: 2,
    y: 76,
    startX: 30.8,
    startY: 76,
    anchorX: 32.5,
    anchorY: 66.2,
    side: "left",
  },
  {
    id: "routing",
    label: "Model Routing",
    sublabel: "Cost & quality balance",
    x: 68,
    y: 2,
    startX: 68,
    startY: 21,
    anchorX: 67.5,
    anchorY: 33.8,
    side: "right",
  },
  {
    id: "review",
    label: "Human Review",
    sublabel: "Checkpoints that matter",
    x: 68,
    y: 76,
    startX: 68,
    startY: 76,
    anchorX: 67.5,
    anchorY: 66.2,
    side: "right",
  },
];

function ConnectingLine({ callout, shouldReduceMotion }: { callout: Callout; shouldReduceMotion: boolean | null }) {
  const controlX = (callout.startX + callout.anchorX) / 2;
  const d = `M ${callout.startX} ${callout.startY} Q ${controlX} ${callout.startY}, ${callout.anchorX} ${callout.anchorY}`;

  return (
    <>
      {/* Stroke width and dash pattern are plain SVG attributes (not run
          through Framer's pathLength/style pipeline), which otherwise
          resolves stroke-width in literal CSS pixels and renders the line
          effectively invisible. Only opacity is animated here. */}
      <motion.path
        d={d}
        fill="none"
        strokeWidth={1}
        strokeDasharray="2.2 1.6"
        strokeLinecap="round"
        className="stroke-primary-400 dark:stroke-primary-500"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: "easeOut", delay: 0.15 }}
      />
      <motion.circle
        cx={callout.anchorX}
        cy={callout.anchorY}
        r={1}
        className="fill-accent-500"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: shouldReduceMotion ? 0 : 0.6 }}
      />
    </>
  );
}

export function AnnotatedDiagram() {
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  // Raw pointer offset (-0.5 to 0.5) from the card's center.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 150, damping: 18, mass: 0.4 });
  const smoothY = useSpring(pointerY, { stiffness: 150, damping: 18, mass: 0.4 });
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-7, 7]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (shouldReduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    pointerX.set((e.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <div
      className="relative mx-auto aspect-[4/3.6] w-full max-w-[480px]"
      role="img"
      aria-label="Diagram: a central AI platform connected to RAG, AI Agents, Model Routing, and Human Review capabilities"
    >
      {/* Connecting lines, drawn in the same 0-100 x 0-100 coordinate space
          used for the labels' CSS percentage positions below, so the two
          systems always agree on where things actually are. */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        {callouts.map((c) => (
          <ConnectingLine key={c.id} callout={c} shouldReduceMotion={shouldReduceMotion} />
        ))}
      </svg>

      {/* Central card — tilts gently toward the cursor, like glass catching light */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ perspective: 700 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          ref={cardRef}
          className="flex h-[132px] w-[168px] flex-col items-center justify-center rounded-2xl border border-primary-200 bg-surface shadow-[0_20px_60px_-15px_rgba(34,71,190,0.25)] dark:border-primary-800 dark:bg-surface-dark"
          style={{ rotateX: shouldReduceMotion ? 0 : rotateX, rotateY: shouldReduceMotion ? 0 : rotateY }}
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
          className={`card-blueprint absolute w-[140px] border px-3.5 py-2.5 ${
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
