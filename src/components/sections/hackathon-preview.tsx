import Link from "next/link";
import { ArrowRight, Trophy } from "lucide-react";
import { hackathons } from "@/content/hackathons";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/reveal";

export function HackathonPreview() {
  return (
    <section className="border-b border-line bg-canvas-alt py-20 sm:py-24 dark:border-line-dark dark:bg-canvas-dark-alt">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Hackathons"
            title="Designing challenges, not just entering them"
            description="Technical leadership of medical and healthcare AI hackathons, from challenge design to participant mentoring."
          />
          <Link
            href="/hackathons"
            className="inline-flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.1em] text-primary-600 dark:text-primary-300"
          >
            View hackathons
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {hackathons.map((h, i) => (
            <Reveal key={h.slug} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-line bg-canvas p-6 dark:border-line-dark dark:bg-canvas-dark">
                <Trophy className="text-accent-500" size={18} />
                <h3 className="mt-3 font-display text-[16px] font-semibold text-ink dark:text-ink-inverse">
                  {h.title}
                </h3>
                <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-faint dark:text-ink-inverse/45">
                  {h.roleTitle} · {h.domain}
                </p>
                <p className="mt-3 text-[13.5px] leading-relaxed text-ink-soft dark:text-ink-inverse/70">
                  {h.summary}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
