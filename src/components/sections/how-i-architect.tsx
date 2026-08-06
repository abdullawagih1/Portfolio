import { SectionHeading } from "@/components/ui/section-heading";
import { ProcessFlow } from "@/components/process-flow";

export function HowIArchitect() {
  return (
    <section id="how-i-architect" className="border-b border-line py-20 sm:py-24 dark:border-line-dark">
      <div className="container-page">
        <SectionHeading
          eyebrow="Process"
          title="How I architect AI products"
          description="A consistent method for turning a business problem into a production AI system — repeated across every engagement, regardless of domain."
        />
        <div className="mt-12">
          <ProcessFlow />
        </div>
      </div>
    </section>
  );
}
