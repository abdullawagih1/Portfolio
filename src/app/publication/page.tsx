import { BookOpen, ExternalLink } from "lucide-react";
import { buildMetadata } from "@/lib/metadata";
import { publication } from "@/content/publication";
import { scholarlyArticleJsonLd } from "@/lib/structured-data";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata = buildMetadata({
  title: "Publication",
  description: `${publication.title} — ${publication.journal}, ${publication.year}.`,
  path: "/publication",
});

export default function PublicationPage() {
  const jsonLd = scholarlyArticleJsonLd();

  return (
    <div className="py-16 sm:py-20">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container-page">
        <SectionHeading eyebrow="Publication" title="Peer-reviewed research" />

        <div className="mt-10 max-w-2xl rounded-2xl border border-line p-7 sm:p-9 dark:border-line-dark">
          <BookOpen className="text-primary-500" size={22} />
          <h2 className="mt-4 font-display text-[21px] font-semibold leading-snug text-ink dark:text-ink-inverse">
            {publication.title}
          </h2>
          <p className="mt-2 text-[14.5px] text-ink-soft dark:text-ink-inverse/70">
            {publication.journal} · {publication.year}
          </p>
          <p className="mt-5 text-[14.5px] leading-relaxed text-ink-soft dark:text-ink-inverse/75">
            {publication.summary}
          </p>

          {publication.externalUrl && (
            <a
              href={publication.externalUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.1em] text-primary-600 dark:text-primary-300"
            >
              View publication
              <ExternalLink size={13} />
            </a>
          )}
        </div>

        <p className="mt-6 max-w-2xl text-[13px] text-ink-faint dark:text-ink-inverse/45">
          Reported here with the details confirmed at the time of writing. A direct link and full
          citation details (DOI, volume, issue) will be added once confirmed against the publisher
          record.
        </p>
      </div>
    </div>
  );
}
