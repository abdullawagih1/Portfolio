import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ShieldCheck, Sparkles, Wrench } from "lucide-react";
import { projects, getProjectBySlug, getRelatedProjects } from "@/content/projects";
import { buildMetadata } from "@/lib/metadata";
import { StatusBadge } from "@/components/ui/status-badge";
import { ArchitectureFlow } from "@/components/architecture-flow";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};

  return buildMetadata({
    title: project.title,
    description: project.summary,
    path: `/work/${project.slug}`,
  });
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const related = getRelatedProjects(project);

  return (
    <div className="py-16 sm:py-20">
      {/* 1. Hero */}
      <div className="container-page">
        <Link
          href="/work"
          className="inline-flex items-center gap-1.5 font-mono text-[11.5px] uppercase tracking-[0.1em] text-ink-faint transition-colors hover:text-primary-600 dark:text-ink-inverse/45"
        >
          <ArrowLeft size={13} />
          All work
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-primary-600 dark:text-primary-300">
            {project.category}
          </span>
        </div>

        <h1 className="mt-3 max-w-3xl font-display text-[32px] font-semibold leading-tight tracking-tight text-ink sm:text-[42px] dark:text-ink-inverse">
          {project.name}
        </h1>
        <p className="mt-2 text-[17px] text-ink-soft dark:text-ink-inverse/70">{project.subtitle}</p>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <StatusBadge label={project.statusLabel} />
          <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-faint dark:text-ink-inverse/45">
            Role: {project.role}
          </span>
        </div>
      </div>

      {/* 2. Executive Overview */}
      <div className="container-page mt-12 max-w-3xl">
        <h2 className="eyebrow">Executive Overview</h2>
        <p className="mt-3 text-[16px] leading-relaxed text-ink-soft dark:text-ink-inverse/80">
          {project.summary}
        </p>
      </div>

      {/* 3. The Problem */}
      <div className="container-page mt-12 max-w-3xl">
        <h2 className="eyebrow">The Problem</h2>
        <div className="mt-3 space-y-3">
          {project.problem.map((p, i) => (
            <p key={i} className="text-[15px] leading-relaxed text-ink-soft dark:text-ink-inverse/75">
              {p}
            </p>
          ))}
        </div>
      </div>

      {/* 4. My Role */}
      <div className="container-page mt-12 max-w-3xl">
        <h2 className="eyebrow">My Role</h2>
        <ul className="mt-3 space-y-2">
          {project.responsibilities.map((r) => (
            <li key={r} className="flex gap-3 text-[15px] leading-relaxed text-ink-soft dark:text-ink-inverse/75">
              <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-primary-500" />
              {r}
            </li>
          ))}
        </ul>
      </div>

      {/* 5. System Architecture */}
      <div className="border-y border-line bg-canvas-alt py-14 mt-14 dark:border-line-dark dark:bg-canvas-dark-alt">
        <div className="container-page">
          <h2 className="eyebrow">System Architecture</h2>
          <p className="mt-2 max-w-2xl text-[14px] text-ink-soft dark:text-ink-inverse/70">
            A simplified view of how data and decisions move through the platform.
          </p>
          <div className="mt-8">
            <ArchitectureFlow nodes={project.architecture} visualSystem={project.visualSystem} />
          </div>
        </div>
      </div>

      {/* 6. Key Capabilities */}
      <div className="container-page mt-14 max-w-3xl">
        <h2 className="eyebrow flex items-center gap-2">
          <Sparkles size={13} />
          Key Capabilities
        </h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.capabilities.map((c) => (
            <li
              key={c}
              className="rounded-full border border-line px-3 py-1.5 text-[13px] text-ink-soft dark:border-line-dark dark:text-ink-inverse/70"
            >
              {c}
            </li>
          ))}
        </ul>
      </div>

      {/* 7. AI Design */}
      <div className="container-page mt-12 max-w-3xl">
        <h2 className="eyebrow">AI Design</h2>
        <ul className="mt-3 space-y-2">
          {project.aiDesign.map((item) => (
            <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-ink-soft dark:text-ink-inverse/75">
              <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-accent-500" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* 8. Security and Reliability */}
      <div className="container-page mt-12 max-w-3xl">
        <h2 className="eyebrow flex items-center gap-2">
          <ShieldCheck size={13} />
          Security &amp; Reliability
        </h2>
        <ul className="mt-3 space-y-2">
          {project.security.map((item) => (
            <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-ink-soft dark:text-ink-inverse/75">
              <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-primary-500" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* 9. Outcomes */}
      <div className="container-page mt-12 max-w-3xl">
        <h2 className="eyebrow">Outcomes</h2>
        <div className="mt-3 space-y-3">
          {project.outcomes.map((o, i) => (
            <p key={i} className="text-[15px] leading-relaxed text-ink-soft dark:text-ink-inverse/75">
              {o}
            </p>
          ))}
        </div>
      </div>

      {/* 10. Technology */}
      <div className="container-page mt-12 max-w-3xl">
        <h2 className="eyebrow flex items-center gap-2">
          <Wrench size={13} />
          Technology
        </h2>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {project.technologies.map((t) => (
            <li
              key={t}
              className="rounded-md bg-canvas-alt px-2.5 py-1.5 font-mono text-[11.5px] text-ink-soft dark:bg-canvas-dark-alt dark:text-ink-inverse/70"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>

      {/* 11. Confidentiality Note */}
      <div className="container-page mt-12 max-w-3xl">
        <p className="rounded-xl border border-line bg-canvas-alt p-4 text-[13px] italic leading-relaxed text-ink-faint dark:border-line-dark dark:bg-canvas-dark-alt dark:text-ink-inverse/50">
          {project.confidentialityNote}
        </p>
      </div>

      {/* 12. Related Work */}
      {related.length > 0 && (
        <div className="container-page mt-16 border-t border-line pt-14 dark:border-line-dark">
          <h2 className="eyebrow">Related Work</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {related.map((p) => (
              <Reveal key={p.slug}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
