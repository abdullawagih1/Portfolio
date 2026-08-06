const techs = [
  "LLMs",
  "RAG",
  "AI Agents",
  "LangChain",
  "LlamaIndex",
  "Azure OpenAI",
  "Vector Databases",
  "Model Routing",
  "Semantic Search",
  "MCP",
  "n8n",
  "Transformers",
];

export function TechMarquee() {
  // Duplicate the list so the CSS translateX(-50%) loop is seamless.
  const items = [...techs, ...techs];

  return (
    <div
      className="group relative overflow-hidden border-b border-line py-5 dark:border-line-dark"
      role="list"
      aria-label="Technologies used"
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-canvas to-transparent dark:from-canvas-dark"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-canvas to-transparent dark:from-canvas-dark"
        aria-hidden="true"
      />
      <div className="flex w-max gap-10 motion-safe:animate-[marquee_44s_linear_infinite] group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]">
        {items.map((tech, i) => (
          <span
            key={`${tech}-${i}`}
            role="listitem"
            className="flex-shrink-0 font-mono text-[12.5px] uppercase tracking-[0.12em] text-ink-faint dark:text-ink-inverse/40"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
