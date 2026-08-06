export const siteConfig = {
  name: "Abdullah Wagih Ibrahim",
  shortName: "Abdullah Wagih",
  title: "Abdullah Wagih | AI Solution Architect & Generative AI Engineer",
  description:
    "Portfolio of Abdullah Wagih, an AI Solution Architect and Generative AI Engineer designing enterprise LLM, RAG, AI-agent, computer vision, and intelligent automation platforms.",
  tagline: "Architect. Builder. Educator.",
  supportingMessage:
    "I architect production-ready AI platforms and help teams understand how to build them.",
  // Resolved at build/runtime from the environment. Falls back to a relative
  // origin during local development so metadata never hard-codes a guessed domain.
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://abdullahwagih.example",
  location: "Cairo, Egypt",
  email: "abdullawagih1@gmail.com",
  phone: "+20 100 214 3879",
  linkedin: "https://linkedin.com/in/abdullah-wagih",
  linkedinLabel: "linkedin.com/in/abdullah-wagih",
  roleLine: "AI Solution Architect at Rubix · AI Team Leader at Vitamera · AI Instructor · Cairo, Egypt",
  cv: {
    technical: {
      href: "/Abdullah-Wagih-Technical-CV.docx",
      label: "Download Technical CV",
    },
    teaching: {
      href: "/Abdullah-Wagih-Teaching-CV.docx",
      label: "Download Teaching CV",
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
