import { Trophy } from "lucide-react";
import { buildMetadata } from "@/lib/metadata";
import { hackathons } from "@/content/hackathons";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/reveal";

export const metadata = buildMetadata({
  title: "Hackathons",
  description:
    "Technical leadership of medical and healthcare AI hackathons — challenge design, evaluation criteria, and participant mentoring.",
  path: "/hackathons",
});

export default function HackathonsPage() {
  return (
    <div className="py-16 sm:py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow="Hackathons"
          title="Designing the challenge, not just entering it"
          description="Technical leadership of AI hackathons — from challenge design and evaluation criteria to participant mentoring."
        />

        <div className="mt-12 space-y-6">
          {hackathons.map((h, i) => (
            <Reveal key={h.slug} delay={i * 0.06}>
              <div className="rounded-2xl border border-line p-7 sm:p-9 dark:border-line-dark">
                <div className="flex items-start gap-4">
                  <Trophy className="mt-1 flex-shrink-0 text-accent-500" size={22} />
                  <div>
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-faint dark:text-ink-inverse/45">
                      {h.roleTitle} · {h.domain}
                    </p>
                    <h2 className="mt-1.5 font-display text-[20px] font-semibold text-ink dark:text-ink-inverse">
                      {h.title}
                    </h2>
                  </div>
                </div>

                <p className="mt-5 max-w-2xl text-[14.5px] leading-relaxed text-ink-soft dark:text-ink-inverse/75">
                  {h.summary}
                </p>

                <ul className="mt-5 space-y-2">
                  {h.details.map((d) => (
                    <li
                      key={d}
                      className="flex gap-3 text-[14px] leading-relaxed text-ink-soft dark:text-ink-inverse/70"
                    >
                      <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-primary-500" />
                      {d}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2 border-t border-line pt-5 dark:border-line-dark">
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-faint dark:text-ink-inverse/40">
                    Partners
                  </span>
                  {h.partners.map((p) => (
                    <span
                      key={p}
                      className="rounded-full bg-canvas-alt px-3 py-1 text-[12px] text-ink-soft dark:bg-canvas-dark-alt dark:text-ink-inverse/70"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
