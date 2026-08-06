import { SectionHeading } from "@/components/ui/section-heading";
import { CapabilityGroups } from "@/components/capability-groups";

export function CapabilitiesSection() {
  return (
    <section className="border-b border-line bg-canvas-alt py-20 sm:py-24 dark:border-line-dark dark:bg-canvas-dark-alt">
      <div className="container-page">
        <SectionHeading
          eyebrow="Technical Capabilities"
          title="The toolkit behind the architecture"
          description="Grouped by function rather than skill bars — because what matters is how these tools combine into a working system."
        />
        <div className="mt-12">
          <CapabilityGroups />
        </div>
      </div>
    </section>
  );
}
