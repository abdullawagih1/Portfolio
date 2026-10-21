export type TeachingRole = {
  role: string;
  org: string;
  location: string;
  period: string;
  employment: string;
  summary: string;
  highlights: string[];
};

export const teachingPhilosophy =
  "I teach the way I build: project-first. Every concept is anchored to a real, working system so learners leave with something they built, not just something they understood. Because I actively practice as an AI Engineer, my labs reflect current industry tooling and real production constraints rather than textbook simplifications.";

export const teachingRoles: TeachingRole[] = [
  {
    role: "AI Instructor",
    org: "Digital Egypt Pioneers Initiative (DEPI)",
    location: "Cairo, Egypt",
    period: "Oct 2024 — Present",
    employment: "Part-time",
    summary: "Teaching NLP and LLM-driven application development to university students and industry trainees.",
    highlights: [
      "Transformer architectures, encoder-decoder models, embeddings, and RAG in hands-on labs",
      "Real-world NLP capstone projects in healthcare and finance using Python and deep learning frameworks",
    ],
  },
  {
    role: "AI Instructor",
    org: "Instant Software Solutions",
    location: "Giza, Egypt",
    period: "Jun 2023 — Present",
    employment: "Part-time",
    summary: "Delivering foundational-to-advanced machine learning and AI courses for beginner and professional cohorts.",
    highlights: [
      "Regression analysis workshops for sales prediction",
      "K-means clustering for customer segmentation",
      "CNN and RNN labs for image recognition and time-series forecasting",
      "One-on-one mentorship on real project workflows",
    ],
  },
  {
    role: "AI Instructor",
    org: "AMIT Learning",
    location: "Cairo, Egypt",
    period: "Jun 2023 — Oct 2025",
    employment: "Part-time",
    summary: "Delivering industry-relevant training in machine learning, computer vision, and NLP.",
    highlights: [
      "Fraud-detection curriculum using logistic regression and decision trees",
      "TensorFlow-based medical image classification module",
      "Live coding sessions on hyperparameter tuning and feature engineering",
    ],
  },
];

export const curricula = [
  { title: "NLP & LLM Applications", detail: "Transformers, embeddings, RAG, encoder-decoder architectures", org: "DEPI" },
  { title: "Applied Machine Learning Foundations", detail: "Regression, clustering, feature engineering", org: "Instant Software Solutions" },
  { title: "Deep Learning for Computer Vision", detail: "CNNs for medical image classification", org: "AMIT Learning" },
  { title: "Fraud Detection with Classical ML", detail: "Logistic regression and decision trees", org: "AMIT Learning" },
];

export const teachingSubjects = [
  "Applied Machine Learning",
  "Deep Learning",
  "Natural Language Processing",
  "Computer Vision",
  "Transformers",
  "LLM Applications",
  "Retrieval-Augmented Generation",
  "AI Agents",
  "Python for AI",
  "SQL for Data & AI",
];
