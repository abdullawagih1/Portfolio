import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 font-display text-[26px] font-semibold text-ink dark:text-ink-inverse">
        This page doesn&apos;t exist.
      </h1>
      <p className="mt-3 max-w-sm text-[14.5px] text-ink-soft dark:text-ink-inverse/70">
        The page you&apos;re looking for may have moved. Head back to explore the work instead.
      </p>
      <Link
        href="/"
        className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary-600 px-6 py-3 text-[14px] font-medium text-white transition-colors hover:bg-primary-700"
      >
        <ArrowLeft size={15} />
        Back home
      </Link>
    </div>
  );
}
