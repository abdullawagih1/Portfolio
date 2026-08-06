import Link from "next/link";
import { ArrowRight, GraduationCap } from "lucide-react";
import { teachingPhilosophy } from "@/content/teaching";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/reveal";

const highlights = [
  "Applied AI education",
  "Curriculum design",
  "Hands-on labs",
  "Live coding",
  "Capstone mentoring",
  "Technical workshops",
  "Hackathon mentorship",
];

export function TeachingPreview() {
  return (
    <section className="border-b border-line py-20 sm:py-24 dark:border-line-dark">
      <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <Reveal>
          <SectionHeading
            eyebrow="Teaching & Mentorship"
            title="Production experience, brought into the classroom"
          />
          <p className="mt-5 text-[14.5px] leading-relaxed text-ink-soft dark:text-ink-inverse/75">
            {teachingPhilosophy}
          </p>
          <Link
            href="/teaching"
            className="mt-6 inline-flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.1em] text-primary-600 dark:text-primary-300"
          >
            Visit the teaching page
            <ArrowRight size={13} />
          </Link>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="rounded-2xl border border-line p-7 dark:border-line-dark">
            <GraduationCap className="text-accent-500" size={22} />
            <ul className="mt-5 grid grid-cols-2 gap-3">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="rounded-lg bg-canvas-alt px-3 py-2.5 text-[13px] text-ink-soft dark:bg-canvas-dark-alt dark:text-ink-inverse/70"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
