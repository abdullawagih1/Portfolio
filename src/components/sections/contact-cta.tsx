import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ContactCta() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-page">
        <div className="rounded-3xl border border-line bg-ink px-8 py-14 text-center dark:border-line-dark sm:px-16">
          <p className="eyebrow text-primary-300">Let&apos;s build something</p>
          <h2 className="mx-auto mt-4 max-w-xl font-display text-[28px] font-semibold leading-tight text-ink-inverse sm:text-[34px]">
            Have an AI platform to architect, or a team to train?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[14.5px] leading-relaxed text-ink-inverse/70">
            Open to architecture consulting, enterprise RAG systems, technical leadership, and AI
            training engagements.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary-500 px-7 py-3.5 text-[14px] font-medium text-white transition-colors hover:bg-primary-400"
          >
            Get in touch
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
