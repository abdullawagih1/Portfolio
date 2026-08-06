"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, FileDown } from "lucide-react";
import { siteConfig } from "@/content/site";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/85 backdrop-blur dark:border-line-dark dark:bg-canvas-dark/85">
      <div className="container-page flex h-16 items-center justify-between">
        <Link
          href="/"
          className="font-display text-[15px] font-semibold tracking-tight text-ink dark:text-ink-inverse"
        >
          Abdullah Wagih
          <span className="ml-2 hidden font-mono text-[11px] font-normal uppercase tracking-[0.14em] text-ink-faint sm:inline">
            AI Architect
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-body text-[14px] font-medium text-ink-soft transition-colors hover:text-primary-600 dark:text-ink-inverse/75 dark:hover:text-primary-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <a
            href={siteConfig.cv.technical.href}
            download
            className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-ink-soft transition-colors hover:border-primary-400 hover:text-primary-600 dark:border-line-dark dark:text-ink-inverse/75"
          >
            <FileDown size={13} />
            Technical CV
          </a>
          <a
            href={siteConfig.cv.teaching.href}
            download
            className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-ink-inverse transition-colors hover:bg-primary-700 dark:bg-primary-600"
          >
            <FileDown size={13} />
            Teaching CV
          </a>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink lg:hidden dark:border-line-dark dark:text-ink-inverse"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden border-t border-line bg-canvas lg:hidden dark:border-line-dark dark:bg-canvas-dark"
          >
            <nav aria-label="Mobile" className="container-page flex flex-col gap-1 py-4">
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-lg px-3 py-3 font-body text-[15px] font-medium text-ink-soft transition-colors hover:bg-canvas-alt hover:text-primary-600 dark:text-ink-inverse/80 dark:hover:bg-canvas-dark-alt"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-3 flex flex-col gap-2 border-t border-line pt-4 dark:border-line-dark">
                <a
                  href={siteConfig.cv.technical.href}
                  download
                  className="inline-flex items-center justify-center gap-1.5 rounded-full border border-line px-4 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-ink-soft dark:border-line-dark dark:text-ink-inverse/80"
                >
                  <FileDown size={13} />
                  Technical CV
                </a>
                <a
                  href={siteConfig.cv.teaching.href}
                  download
                  className="inline-flex items-center justify-center gap-1.5 rounded-full bg-ink px-4 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-ink-inverse dark:bg-primary-600"
                >
                  <FileDown size={13} />
                  Teaching CV
                </a>
                <div className="flex justify-center pt-1">
                  <ThemeToggle />
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
