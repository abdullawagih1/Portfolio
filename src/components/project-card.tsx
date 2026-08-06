import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/projects";
import { StatusBadge } from "@/components/ui/status-badge";

export function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="card-blueprint group flex h-full flex-col border p-6 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.015] hover:border-primary-400 hover:shadow-lg hover:shadow-primary-900/5 sm:p-7"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint dark:text-ink-inverse/40">
          {project.domain}
        </span>
        <ArrowUpRight
          size={16}
          className="text-ink-faint transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary-500"
        />
      </div>

      <h3
        className={`mt-4 font-display font-semibold text-ink dark:text-ink-inverse ${
          featured ? "text-[21px]" : "text-[18px]"
        }`}
      >
        {project.name}
      </h3>
      <p className="mt-1 text-[13.5px] text-ink-soft dark:text-ink-inverse/60">{project.subtitle}</p>

      <p className="mt-4 flex-1 text-[14px] leading-relaxed text-ink-soft dark:text-ink-inverse/70">
        {project.summary}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <StatusBadge label={project.statusLabel} />
        <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-faint dark:text-ink-inverse/40">
          {project.role}
        </span>
      </div>

      {featured && (
        <ul className="mt-5 flex flex-wrap gap-1.5">
          {project.capabilities.slice(0, 4).map((c) => (
            <li
              key={c}
              className="rounded-full bg-canvas-alt px-2.5 py-1 font-mono text-[10px] text-ink-soft dark:bg-canvas-dark-alt dark:text-ink-inverse/60"
            >
              {c}
            </li>
          ))}
        </ul>
      )}
    </Link>
  );
}
