import { architectProcess } from "@/content/skills";
import { Reveal } from "@/components/reveal";

export function ProcessFlow() {
  return (
    <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {architectProcess.map((item, i) => (
        <Reveal key={item.step} delay={i * 0.05} as="li">
          <div className="card-blueprint h-full border p-6">
            <span className="font-mono text-[28px] font-semibold leading-none text-primary-200 dark:text-primary-800">
              {String(item.step).padStart(2, "0")}
            </span>
            <h3 className="mt-4 font-display text-[16px] font-semibold text-ink dark:text-ink-inverse">
              {item.title}
            </h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-ink-soft dark:text-ink-inverse/70">
              {item.description}
            </p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
