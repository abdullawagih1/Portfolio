export type Experience = {
  role: string;
  org: string;
  location: string;
  period: string;
  employment: string;
  scope: string;
  responsibility: string;
  capabilities: string[];
};

// Primary architecture & leadership roles, shown in full on the homepage
// and About page. Teaching roles are intentionally summarized separately —
// see teaching.ts — to keep this list focused on architecture leadership.
export const primaryExperience: Experience[] = [
  {
    role: "AI Team Leader",
    org: "Vitamera",
    location: "KSA (Remote)",
    period: "Jun 2026 — Present",
    employment: "Part-time",
    scope: "Leading a multidisciplinary AI team building production AI products for the Saudi market.",
    responsibility:
      "Own solution architecture, task allocation, code review, technical standards, and delivery coordination across AI/LLM, backend, data, and product workstreams.",
    capabilities: [
      "LLM & RAG systems",
      "AI agents",
      "Computer-vision intelligence",
      "Interview-analysis capabilities",
      "Evaluation & deployment readiness",
    ],
  },
  {
    role: "AI Solution Architect",
    org: "Rubix",
    location: "Cairo, Egypt",
    period: "Jan 2026 — Present",
    employment: "Full-time",
    scope: "Designing and implementing end-to-end AI systems that turn business requirements into production platforms.",
    responsibility:
      "Architect AI solutions across the full lifecycle — problem framing, data pipelines, model development, evaluation, deployment, and monitoring — with cross-functional teams.",
    capabilities: [
      "LLM-powered platforms",
      "Retrieval systems",
      "Modern MLOps practices",
      "Cost-efficient, scalable architecture",
    ],
  },
  {
    role: "Data Scientist",
    org: "Sahwah",
    location: "KSA (Remote)",
    period: "Sep 2023 — Oct 2025",
    employment: "Part-time",
    scope: "Scalable machine learning for real-time logistics operations.",
    responsibility:
      "Designed shipment delay prediction and risk detection models, built Spark and Hadoop data pipelines, and deployed predictive models for real-time use.",
    capabilities: [
      "Real-time predictive ML",
      "Spark & Hadoop pipelines",
      "Power BI / Tableau dashboards",
      "NLP on operational text",
    ],
  },
];
