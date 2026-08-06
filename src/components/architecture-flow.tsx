import { ArrowRight } from "lucide-react";
import type { ArchitectureNode } from "@/content/projects";

const accentByVisualSystem: Record<string, string> = {
  "evidence-trail": "primary",
  "operations-inbox": "accent",
  "diagnosis-roadmap": "primary",
  "proposal-flow": "accent",
  "privacy-tracking": "primary",
  "modular-exam": "accent",
  "property-graph": "primary",
};

export function ArchitectureFlow({
  nodes,
  visualSystem,
}: {
  nodes: ArchitectureNode[];
  visualSystem: string;
}) {
  const accent = accentByVisualSystem[visualSystem] ?? "primary";
  const dot = accent === "accent" ? "bg-accent-500" : "bg-primary-500";
  const border = accent === "accent" ? "hover:border-accent-400" : "hover:border-primary-400";

  return (
    <div
      className="-mx-6 flex gap-4 overflow-x-auto px-6 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3"
      role="list"
      aria-label="System architecture flow"
    >
      {nodes.map((node, i) => (
        <div
          key={node.label}
          role="listitem"
          className={`card-blueprint min-w-[240px] flex-shrink-0 border p-5 transition-colors sm:min-w-0 ${border}`}
        >
          <div className="mb-3 flex items-center gap-2">
            <span className={`h-1.5 w-1.5 rounded-full ${dot}`} aria-hidden="true" />
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint dark:text-ink-inverse/40">
              Node {String(i + 1).padStart(2, "0")}
            </span>
          </div>
          <h3 className="font-display text-[15px] font-semibold text-ink dark:text-ink-inverse">
            {node.label}
          </h3>
          <p className="mt-2 text-[13.5px] leading-relaxed text-ink-soft dark:text-ink-inverse/70">
            {node.description}
          </p>
          {i < nodes.length - 1 && (
            <ArrowRight
              size={14}
              className="mt-4 text-ink-faint sm:hidden"
              aria-hidden="true"
            />
          )}
        </div>
      ))}
    </div>
  );
}
