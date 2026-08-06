import { Building2, GraduationCap, Hammer, MapPin } from "lucide-react";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/content/site";
import { publication } from "@/content/publication";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata = buildMetadata({
  title: "About",
  description: "Architect, builder, and educator — the background and approach behind Abdullah Wagih's AI work.",
  path: "/about",
});

const identities = [
  {
    icon: Building2,
    title: "Architect",
    body: "I design AI systems around the same discipline used in traditional enterprise architecture: clear boundaries, traceability, and a plan for what happens when something fails.",
  },
  {
    icon: Hammer,
    title: "Builder",
    body: "I stay close to implementation. Architecture decisions are informed by what actually ships — data pipelines, retrieval quality, deployment realities — not just diagrams.",
  },
  {
    icon: GraduationCap,
    title: "Educator",
    body: "I teach the systems I build. Bringing production constraints into the classroom keeps both the teaching and the architecture honest.",
  },
];

export default function AboutPage() {
  return (
    <div className="py-16 sm:py-20">
      <div className="container-page max-w-2xl">
        <SectionHeading eyebrow="About" title={siteConfig.tagline} />
        <p className="mt-5 text-[15.5px] leading-relaxed text-ink-soft dark:text-ink-inverse/75">
          I&apos;m an AI Solution Architect and Generative AI Engineer based in Cairo, currently
          architecting production AI platforms for clients in Egypt and Saudi Arabia while leading
          a multidisciplinary AI team and teaching applied AI across several institutions. My work
          spans healthcare, logistics, education, real estate, and enterprise automation — always
          with the same underlying question: how do we get an AI system from a good idea to
          something a real team can rely on in production.
        </p>
      </div>

      <div className="container-page mt-14 grid gap-5 sm:grid-cols-3">
        {identities.map((id) => (
          <div key={id.title} className="rounded-2xl border border-line p-6 dark:border-line-dark">
            <id.icon className="text-primary-500" size={20} />
            <h2 className="mt-4 font-display text-[16px] font-semibold text-ink dark:text-ink-inverse">
              {id.title}
            </h2>
            <p className="mt-2 text-[13.5px] leading-relaxed text-ink-soft dark:text-ink-inverse/70">
              {id.body}
            </p>
          </div>
        ))}
      </div>

      <div className="container-page mt-16 grid gap-10 border-t border-line pt-14 dark:border-line-dark sm:grid-cols-2">
        <div>
          <h2 className="eyebrow">Approach to Architecture</h2>
          <p className="mt-3 text-[14.5px] leading-relaxed text-ink-soft dark:text-ink-inverse/75">
            Every engagement starts with problem framing, not tooling — translating a business
            requirement into a measurable AI use case before selecting a model, retrieval strategy,
            or agent workflow. Evaluation, traceability, and human review checkpoints are designed
            in from the start, not added after something breaks in production.
          </p>
        </div>
        <div>
          <h2 className="eyebrow">Leadership Approach</h2>
          <p className="mt-3 text-[14.5px] leading-relaxed text-ink-soft dark:text-ink-inverse/75">
            Leading a multidisciplinary AI team means owning solution architecture, task allocation,
            code review, and technical standards — while staying close enough to the work to make
            good calls quickly when requirements shift.
          </p>
        </div>
        <div>
          <h2 className="eyebrow">Teaching Philosophy</h2>
          <p className="mt-3 text-[14.5px] leading-relaxed text-ink-soft dark:text-ink-inverse/75">
            Every concept is anchored to a real, working system, so learners leave with something
            they built. Labs reflect current industry tooling and real production constraints
            rather than textbook simplifications.
          </p>
        </div>
        <div>
          <h2 className="eyebrow">Domains of Experience</h2>
          <p className="mt-3 text-[14.5px] leading-relaxed text-ink-soft dark:text-ink-inverse/75">
            Healthcare, logistics, career development and education, real estate, and enterprise
            automation — across confidential client engagements and applied research.
          </p>
        </div>
      </div>

      <div className="container-page mt-16 grid gap-6 border-t border-line pt-14 dark:border-line-dark sm:grid-cols-2">
        <div className="rounded-2xl border border-line p-6 dark:border-line-dark">
          <h2 className="eyebrow">Education</h2>
          <p className="mt-3 font-display text-[16px] font-semibold text-ink dark:text-ink-inverse">
            B.Sc. Computer Science
          </p>
          <p className="mt-1 text-[13.5px] text-ink-soft dark:text-ink-inverse/70">
            Zagazig University · Sep 2019 – Jul 2023 · Medical Informatics
          </p>
          <p className="mt-3 text-[13px] leading-relaxed text-ink-soft dark:text-ink-inverse/65">
            Graduation project: an end-to-end Brain Tumor Classification and Segmentation System
            using CNN-based models for medical image analysis.
          </p>
        </div>
        <div className="rounded-2xl border border-line p-6 dark:border-line-dark">
          <h2 className="eyebrow">Publication</h2>
          <p className="mt-3 font-display text-[16px] font-semibold text-ink dark:text-ink-inverse">
            {publication.title}
          </p>
          <p className="mt-1 text-[13.5px] text-ink-soft dark:text-ink-inverse/70">
            {publication.journal} · {publication.year}
          </p>
        </div>
      </div>

      <div className="container-page mt-16 flex items-center gap-2 border-t border-line pt-10 dark:border-line-dark">
        <MapPin size={15} className="text-ink-faint" />
        <span className="text-[14px] text-ink-soft dark:text-ink-inverse/70">{siteConfig.location}</span>
      </div>
    </div>
  );
}
