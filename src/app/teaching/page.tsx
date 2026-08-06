import Link from "next/link";
import { FileDown, ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/metadata";
import { teachingPhilosophy, teachingRoles, curricula, teachingSubjects } from "@/content/teaching";
import { hackathons } from "@/content/hackathons";
import { siteConfig } from "@/content/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/reveal";

export const metadata = buildMetadata({
  title: "Teaching",
  description:
    "Applied AI education from Abdullah Wagih — curriculum design, hands-on labs, capstone mentoring, and hackathon leadership grounded in production AI practice.",
  path: "/teaching",
});

export default function TeachingPage() {
  return (
    <div className="py-16 sm:py-20">
      {/* Summary */}
      <div className="container-page">
        <p className="eyebrow">Teaching</p>
        <h1 className="mt-3 max-w-2xl font-display text-[32px] font-semibold leading-tight tracking-tight text-ink sm:text-[42px] dark:text-ink-inverse">
          Teaching AI the way it is built in production.
        </h1>
        <p className="mt-5 max-w-2xl text-[15.5px] leading-relaxed text-ink-soft dark:text-ink-inverse/75">
          An AI Instructor across multiple institutions, teaching applied machine learning, NLP,
          computer vision, and LLM development to university students, industry trainees, and
          career-changers — grounded in the same architecture practice used with enterprise clients.
        </p>
      </div>

      {/* Philosophy */}
      <div className="container-page mt-12 max-w-2xl">
        <h2 className="eyebrow">Teaching Philosophy</h2>
        <p className="mt-3 rounded-2xl border border-line bg-canvas-alt p-6 text-[15px] italic leading-relaxed text-ink-soft dark:border-line-dark dark:bg-canvas-dark-alt dark:text-ink-inverse/75">
          {teachingPhilosophy}
        </p>
      </div>

      {/* Institutions / Teaching Experience */}
      <div className="border-t border-line py-16 mt-14 dark:border-line-dark">
        <div className="container-page">
          <SectionHeading eyebrow="Institutions" title="Courses and curricula" />
          <div className="mt-10 space-y-5">
            {teachingRoles.map((role, i) => (
              <Reveal key={role.org} delay={i * 0.05}>
                <div className="grid gap-4 rounded-2xl border border-line p-6 sm:grid-cols-[1.1fr_2fr] sm:p-8 dark:border-line-dark">
                  <div>
                    <h3 className="font-display text-[17px] font-semibold text-ink dark:text-ink-inverse">
                      {role.role}
                    </h3>
                    <p className="mt-1 text-[14px] text-ink-soft dark:text-ink-inverse/70">
                      {role.org} · {role.location}
                    </p>
                    <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint dark:text-ink-inverse/45">
                      {role.period} · {role.employment}
                    </p>
                  </div>
                  <div>
                    <p className="text-[14px] leading-relaxed text-ink-soft dark:text-ink-inverse/75">
                      {role.summary}
                    </p>
                    <ul className="mt-4 space-y-1.5">
                      {role.highlights.map((h) => (
                        <li
                          key={h}
                          className="flex gap-2.5 text-[13.5px] leading-relaxed text-ink-soft dark:text-ink-inverse/70"
                        >
                          <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-accent-500" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Workshops and Labs */}
      <div className="border-t border-line bg-canvas-alt py-16 dark:border-line-dark dark:bg-canvas-dark-alt">
        <div className="container-page">
          <SectionHeading eyebrow="Workshops & Labs" title="Curricula designed" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {curricula.map((c) => (
              <div key={c.title} className="rounded-2xl border border-line bg-canvas p-5 dark:border-line-dark dark:bg-canvas-dark">
                <h3 className="font-display text-[15px] font-semibold text-ink dark:text-ink-inverse">
                  {c.title}
                </h3>
                <p className="mt-1.5 text-[13.5px] text-ink-soft dark:text-ink-inverse/70">{c.detail}</p>
                <p className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-faint dark:text-ink-inverse/40">
                  {c.org}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Industry-to-Classroom / Subjects */}
      <div className="border-t border-line py-16 dark:border-line-dark">
        <div className="container-page">
          <SectionHeading
            eyebrow="Industry-to-Classroom"
            title="Subjects taught"
            description="Every subject below is one I actively practice as a working AI Solution Architect — not a topic taught from a textbook alone."
          />
          <ul className="mt-8 flex flex-wrap gap-2">
            {teachingSubjects.map((s) => (
              <li
                key={s}
                className="rounded-full border border-line px-3.5 py-2 text-[13px] text-ink-soft dark:border-line-dark dark:text-ink-inverse/70"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mentoring & Hackathons */}
      <div className="border-t border-line bg-canvas-alt py-16 dark:border-line-dark dark:bg-canvas-dark-alt">
        <div className="container-page">
          <SectionHeading
            eyebrow="Mentoring & Hackathons"
            title="Capstones and technical leadership"
            description="Beyond the classroom, mentoring learners through capstone projects and leading AI hackathon design end to end."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {hackathons.map((h) => (
              <Link
                key={h.slug}
                href="/hackathons"
                className="card-blueprint group border p-5 transition-colors hover:border-accent-400"
              >
                <p className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-faint dark:text-ink-inverse/45">
                  {h.roleTitle}
                </p>
                <h3 className="mt-1.5 font-display text-[15px] font-semibold text-ink dark:text-ink-inverse">
                  {h.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* CV download + Contact CTA */}
      <div className="py-16">
        <div className="container-page flex flex-col items-start gap-6 rounded-3xl border border-line p-8 dark:border-line-dark sm:flex-row sm:items-center sm:justify-between sm:p-12">
          <div>
            <h2 className="font-display text-[22px] font-semibold text-ink dark:text-ink-inverse">
              Looking for a technical trainer?
            </h2>
            <p className="mt-2 max-w-md text-[14px] text-ink-soft dark:text-ink-inverse/70">
              Download the full Teaching CV, or get in touch about a training or workshop
              collaboration.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={siteConfig.cv.teaching.href}
              download
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[14px] font-medium text-ink-inverse dark:bg-primary-600"
            >
              <FileDown size={15} />
              Teaching CV
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-[14px] font-medium text-ink dark:border-line-dark dark:text-ink-inverse"
            >
              Contact
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
