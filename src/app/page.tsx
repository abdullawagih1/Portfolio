import { buildMetadata } from "@/lib/metadata";
import { Hero } from "@/components/sections/hero";
import { RoleStrip } from "@/components/sections/role-strip";
import { TechMarquee } from "@/components/tech-marquee";
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
  title: "Abdullah Wagih | AI Engineer | Generative AI Engineer",
  description:
    "Portfolio of Abdullah Wagih, an AI Engineer and Generative AI Engineer with 3+ years of experience building enterprise AI products across LLMs, RAG, AI agents, computer vision, and NLP for clients in Egypt and Saudi Arabia.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <RoleStrip />
      <TechMarquee />
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
