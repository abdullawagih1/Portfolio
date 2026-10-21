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

// Primary engineering roles, shown in full on the homepage and About page.
// Titles, dates, and metrics must match the approved Technical CV. Teaching
// roles are intentionally summarized separately — see teaching.ts.
export const primaryExperience: Experience[] = [
  {
    role: "AI Engineer",
    org: "Vitamera",
    location: "KSA (Remote)",
    period: "Jun 2026 — Present",
    employment: "Part-time",
    scope: "Leading a multidisciplinary AI team delivering production-ready AI products for the Saudi market.",
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
    role: "AI Engineer",
    org: "Rubix",
    location: "Cairo, Egypt",
    period: "Oct 2025 — Present",
    employment: "Full-time",
    scope: "Designing and implementing end-to-end AI systems that turn business requirements into scalable, production-ready solutions.",
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
      "Designed shipment delay prediction and risk detection models that improved forecast accuracy by 15%, built Spark and Hadoop data pipelines, and deployed predictive models for real-time operational use at 920 shipments/day scale.",
    capabilities: [
      "Real-time predictive ML",
      "Spark & Hadoop pipelines",
      "Power BI / Tableau dashboards",
      "NLP on operational text",
    ],
  },
];
