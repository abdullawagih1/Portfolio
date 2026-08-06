import { roleStrip } from "@/content/site";

export function RoleStrip() {
  return (
    <div className="border-b border-line dark:border-line-dark">
      <div className="container-page flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-6">
        {roleStrip.map((role) => (
          <span
            key={role}
            className="font-mono text-[11.5px] uppercase tracking-[0.1em] text-ink-faint dark:text-ink-inverse/45"
          >
            {role}
          </span>
        ))}
      </div>
    </div>
  );
}
