import { buildMetadata } from "@/lib/metadata";
import { Hero } from "@/components/sections/hero";
import { RoleStrip } from "@/components/sections/role-strip";
import { FeaturedWork } from "@/components/sections/featured-work";
import { ArchitectureHighlightsSection } from "@/components/sections/architecture-highlights";
import { HowIArchitect } from "@/components/sections/how-i-architect";
import { CapabilitiesSection } from "@/components/sections/capabilities";
import { ExperienceSection } from "@/components/sections/experience-section";
import { TeachingPreview } from "@/components/sections/teaching-preview";
import { HackathonPreview } from "@/components/sections/hackathon-preview";
import { PublicationPreview } from "@/components/sections/publication-preview";
import { ContactCta } from "@/components/sections/contact-cta";

export const metadata = buildMetadata({
  title: "Abdullah Wagih | AI Solution Architect & Generative AI Engineer",
  description:
    "Portfolio of Abdullah Wagih, an AI Solution Architect and Generative AI Engineer designing enterprise LLM, RAG, AI-agent, computer vision, and intelligent automation platforms.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <RoleStrip />
      <FeaturedWork />
      <ArchitectureHighlightsSection />
      <HowIArchitect />
      <CapabilitiesSection />
      <ExperienceSection />
      <TeachingPreview />
      <HackathonPreview />
      <PublicationPreview />
      <ContactCta />
    </>
  );
}
