import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { publication } from "@/content/publication";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/reveal";

export function PublicationPreview() {
  return (
    <section className="border-b border-line py-20 sm:py-24 dark:border-line-dark">
      <div className="container-page">
        <SectionHeading eyebrow="Publication" title="Peer-reviewed research" />

        <Reveal delay={0.06} className="mt-10">
          <Link
            href="/publication"
            className="card-blueprint group flex flex-col gap-4 border p-7 transition-colors hover:border-primary-400 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex gap-4">
              <BookOpen className="mt-1 flex-shrink-0 text-primary-500" size={20} />
              <div>
                <h3 className="font-display text-[17px] font-semibold text-ink dark:text-ink-inverse">
                  {publication.title}
                </h3>
                <p className="mt-1.5 text-[13.5px] text-ink-soft dark:text-ink-inverse/70">
                  {publication.journal}, {publication.year}
                </p>
              </div>
            </div>
            <ArrowRight
              size={16}
              className="flex-shrink-0 text-ink-faint transition-transform group-hover:translate-x-1 group-hover:text-primary-500"
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
