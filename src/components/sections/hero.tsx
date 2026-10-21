"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, FileDown } from "lucide-react";
import { siteConfig } from "@/content/site";
import { AnnotatedDiagram } from "@/components/annotated-diagram";
import { WordReveal } from "@/components/word-reveal";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const fade = (delay: number) => ({
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section className="relative overflow-hidden border-b border-line dark:border-line-dark">
      <div
        className="pointer-events-none absolute inset-0 bg-grid-faint opacity-40 [background-size:44px_44px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]"
        aria-hidden="true"
      />
      <div className="container-page relative grid gap-14 py-20 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-10">
        <div>
          <motion.p {...fade(0)} className="eyebrow">
            AI Engineer · Generative AI Engineer
          </motion.p>

          <h1 className="mt-5 max-w-xl font-display text-[34px] font-semibold leading-[1.12] tracking-tight text-ink sm:text-[46px] lg:text-[50px] dark:text-ink-inverse">
            <WordReveal text="I build AI systems that move from idea to production." delay={0.05} />
          </h1>

          <motion.p
            {...fade(0.62)}
            className="mt-6 max-w-lg text-[16px] leading-relaxed text-ink-soft sm:text-[17px] dark:text-ink-inverse/75"
          >
            I design, build, and ship AI products across LLMs, RAG, AI agents, computer vision,
            and NLP — while leading teams and translating complex business requirements into
            secure, scalable solutions.
          </motion.p>

          <motion.p
            {...fade(0.7)}
            className="mt-5 font-mono text-[12.5px] text-ink-faint dark:text-ink-inverse/50"
          >
            {siteConfig.roleLine}
          </motion.p>

          <motion.div {...fade(0.78)} className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-full bg-primary-600 px-6 py-3 text-[14px] font-medium text-white transition-colors hover:bg-primary-700"
            >
              Explore Selected Work
              <ArrowRight size={15} />
            </Link>
            <a
              href={siteConfig.cv.technical.href}
              download
              className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-[14px] font-medium text-ink transition-colors hover:border-primary-400 hover:text-primary-600 dark:border-line-dark dark:text-ink-inverse dark:hover:text-primary-300"
            >
              <FileDown size={14} />
              View Technical CV
            </a>
            <Link
              href="/teaching"
              className="inline-flex items-center gap-1 text-[14px] font-medium text-ink-soft underline decoration-line underline-offset-4 transition-colors hover:text-primary-600 dark:text-ink-inverse/70"
            >
              Teaching &amp; Training
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="hidden lg:block"
        >
          <AnnotatedDiagram />
        </motion.div>
      </div>
    </section>
  );
}
