import { primaryExperience } from "@/content/experience";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/reveal";

export function ExperienceSection() {
  return (
    <section className="border-b border-line py-20 sm:py-24 dark:border-line-dark">
      <div className="container-page">
        <SectionHeading
          eyebrow="Experience & Leadership"
          title="Where the architecture gets built"
          description="Current and recent roles combining hands-on system design with technical leadership."
        />

        <div className="mt-12 space-y-5">
          {primaryExperience.map((role, i) => (
            <Reveal key={`${role.org}-${role.role}`} delay={i * 0.05}>
              <div className="grid gap-4 rounded-2xl border border-line p-6 sm:grid-cols-[1.1fr_2fr] sm:p-8 dark:border-line-dark">
                <div>
                  <h3 className="font-display text-[18px] font-semibold text-ink dark:text-ink-inverse">
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
                    {role.responsibility}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {role.capabilities.map((c) => (
                      <li
                        key={c}
                        className="rounded-full bg-canvas-alt px-2.5 py-1 font-mono text-[10.5px] text-ink-soft dark:bg-canvas-dark-alt dark:text-ink-inverse/60"
                      >
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 max-w-2xl text-[13.5px] leading-relaxed text-ink-faint dark:text-ink-inverse/50">
          Also active as an AI Instructor across multiple institutions, bringing current production
          practice into technical training.{" "}
          <a href="/teaching" className="underline decoration-line underline-offset-4 hover:text-primary-600">
            See teaching experience →
          </a>
        </p>
      </div>
    </section>
  );
}
