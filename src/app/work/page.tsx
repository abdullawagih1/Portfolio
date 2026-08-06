import { buildMetadata } from "@/lib/metadata";
import { projects } from "@/content/projects";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/reveal";

export const metadata = buildMetadata({
  title: "Work",
  description:
    "Selected AI architecture engagements across healthcare, logistics, education, real estate, and enterprise automation.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <div className="py-16 sm:py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow="Work"
          title="Selected AI architecture engagements"
          description="Confidential client platforms across healthcare, logistics, career development, and enterprise automation — presented at the level of architecture and capability."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.04}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
