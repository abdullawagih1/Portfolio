import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { featuredProjects } from "@/content/projects";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/reveal";

export function FeaturedWork() {
  return (
    <section className="border-b border-line py-20 sm:py-24 dark:border-line-dark">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Selected Work"
            title="Enterprise AI platforms, architected end to end"
            description="A sample of confidential client engagements spanning healthcare, logistics, and career development — shown at the level of architecture and capability, not implementation detail."
          />
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.1em] text-primary-600 dark:text-primary-300"
          >
            View all work
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.06}>
              <ProjectCard project={project} featured />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
