import { Mail, Linkedin, MapPin } from "lucide-react";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/content/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContactForm } from "@/components/contact-form";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Get in touch about AI architecture consulting, enterprise RAG systems, technical leadership, or AI training and workshops.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="py-16 sm:py-20">
      <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Let's talk about what you're building"
            description="Open to architecture consulting, enterprise RAG systems, technical leadership, and AI training engagements."
          />

          <ul className="mt-8 space-y-3">
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-3 text-[14.5px] text-ink-soft transition-colors hover:text-primary-600 dark:text-ink-inverse/75"
              >
                <Mail size={16} className="text-ink-faint" />
                {siteConfig.email}
              </a>
            </li>
            <li>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-[14.5px] text-ink-soft transition-colors hover:text-primary-600 dark:text-ink-inverse/75"
              >
                <Linkedin size={16} className="text-ink-faint" />
                {siteConfig.linkedinLabel}
              </a>
            </li>
            <li className="flex items-center gap-3 text-[14.5px] text-ink-soft dark:text-ink-inverse/75">
              <MapPin size={16} className="text-ink-faint" />
              {siteConfig.location}
            </li>
          </ul>

          <div className="mt-10 border-t border-line pt-8 dark:border-line-dark">
            <p className="eyebrow mb-4">Good reasons to reach out</p>
            <ul className="space-y-2">
              {siteConfig.contactReasons.map((r) => (
                <li
                  key={r}
                  className="flex gap-2.5 text-[13.5px] leading-relaxed text-ink-soft dark:text-ink-inverse/70"
                >
                  <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-primary-500" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-2xl border border-line p-6 sm:p-9 dark:border-line-dark">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
