import Link from "next/link";
import { siteConfig } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line dark:border-line-dark">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <p className="font-display text-[15px] font-semibold text-ink dark:text-ink-inverse">
            Abdullah Wagih
          </p>
          <p className="mt-2 max-w-xs text-sm text-ink-soft dark:text-ink-inverse/70">
            {siteConfig.supportingMessage}
          </p>
        </div>

        <div>
          <p className="eyebrow mb-3">Explore</p>
          <ul className="space-y-2 text-sm">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-ink-soft transition-colors hover:text-primary-600 dark:text-ink-inverse/70 dark:hover:text-primary-300"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-3">Resources</p>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href={siteConfig.cv.technical.href}
                download
                className="text-ink-soft transition-colors hover:text-primary-600 dark:text-ink-inverse/70 dark:hover:text-primary-300"
              >
                Technical CV
              </a>
            </li>
            <li>
              <a
                href={siteConfig.cv.teaching.href}
                download
                className="text-ink-soft transition-colors hover:text-primary-600 dark:text-ink-inverse/70 dark:hover:text-primary-300"
              >
                Teaching CV
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-3">Contact</p>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-ink-soft transition-colors hover:text-primary-600 dark:text-ink-inverse/70 dark:hover:text-primary-300"
              >
                {siteConfig.email}
              </a>
            </li>
            <li>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-ink-soft transition-colors hover:text-primary-600 dark:text-ink-inverse/70 dark:hover:text-primary-300"
              >
                {siteConfig.linkedinLabel}
              </a>
            </li>
            <li className="text-ink-faint dark:text-ink-inverse/50">{siteConfig.location}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line py-6 dark:border-line-dark">
        <p className="container-page font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint dark:text-ink-inverse/40">
          © {year} Abdullah Wagih Ibrahim — Architect · Builder · Educator
        </p>
      </div>
    </footer>
  );
}
