import { skillGroups } from "@/content/skills";
import { Reveal } from "@/components/reveal";

export function CapabilityGroups() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {skillGroups.map((group, i) => (
        <Reveal key={group.title} delay={i * 0.04}>
          <div className="h-full rounded-2xl border border-line p-6 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-md hover:shadow-primary-900/5 dark:border-line-dark dark:hover:border-primary-700">
            <h3 className="font-display text-[14px] font-semibold uppercase tracking-[0.06em] text-primary-700 dark:text-primary-300">
              {group.title}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-md bg-canvas-alt px-2.5 py-1.5 text-[12.5px] text-ink-soft dark:bg-canvas-dark-alt dark:text-ink-inverse/70"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
