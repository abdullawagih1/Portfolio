import { Lock } from "lucide-react";

export function StatusBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-canvas-alt px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-ink-soft dark:border-line-dark dark:bg-canvas-dark-alt dark:text-ink-inverse/70">
      <Lock size={10} />
      {label}
    </span>
  );
}
