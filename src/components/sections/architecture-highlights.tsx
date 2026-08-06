import { architectureHighlights } from "@/content/skills";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/reveal";

export function ArchitectureHighlightsSection() {
  return (
    <section className="border-b border-line bg-canvas-alt py-20 sm:py-24 dark:border-line-dark dark:bg-canvas-dark-alt">
      <div className="container-page">
        <SectionHeading
          eyebrow="Technical Architecture"
          title="What holds these platforms together"
          description="The recurring architectural patterns behind every enterprise AI system I build — designed for trust, traceability, and production reliability."
        />

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5 dark:border-line-dark dark:bg-line-dark">
          {architectureHighlights.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.03} className="bg-canvas p-6 dark:bg-canvas-dark">
              <h3 className="font-display text-[14px] font-semibold text-ink dark:text-ink-inverse">
                {item.title}
              </h3>
              <p className="mt-2 text-[12.5px] leading-relaxed text-ink-soft dark:text-ink-inverse/65">
                {item.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
