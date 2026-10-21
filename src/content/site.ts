export const siteConfig = {
  name: "Abdullah Wagih Ibrahim",
  shortName: "Abdullah Wagih",
  title: "Abdullah Wagih | AI Engineer | Generative AI Engineer",
  description:
    "Portfolio of Abdullah Wagih, an AI Engineer and Generative AI Engineer with 3+ years of experience building enterprise AI products across LLMs, RAG, AI agents, computer vision, and NLP for clients in Egypt and Saudi Arabia.",
  tagline: "Architect. Builder. Educator.",
  supportingMessage:
    "I engineer production-ready AI platforms and help teams understand how to build them.",
  // Resolved at build/runtime from the environment. Falls back to a relative
  // origin during local development so metadata never hard-codes a guessed domain.
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://abdullahwagih.example",
  location: "Cairo, Egypt",
  email: "abdullawagih1@gmail.com",
  phone: "+20 100 214 3879",
  linkedin: "https://linkedin.com/in/abdullah-wagih",
  linkedinLabel: "linkedin.com/in/abdullah-wagih",
  roleLine: "AI Engineer at Rubix · AI Engineer at Vitamera · AI Instructor · Cairo, Egypt",
  // The Teaching CV is intentionally not published until a reviewed edition
  // without placeholders is approved.
  cv: {
    technical: {
      href: "/Abdullah-Wagih-Technical-CV.pdf",
      label: "Download Technical CV",
    },
  },
  nav: [
    { label: "Work", href: "/work" },
    { label: "Architecture", href: "/#how-i-architect" },
    { label: "Teaching", href: "/teaching" },
    { label: "Hackathons", href: "/hackathons" },
    { label: "Publication", href: "/publication" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  contactReasons: [
    "AI architecture consulting",
    "Generative AI product development",
    "Enterprise RAG systems",
    "Technical leadership engagements",
    "AI training and workshops",
    "Hackathon design and mentoring",
    "Speaking or educational collaboration",
  ],
} as const;

export const roleStrip = [
  "Enterprise AI Architecture",
  "Generative AI & RAG",
  "AI Product Delivery",
  "Technical Leadership",
  "AI Education & Mentorship",
] as const;
