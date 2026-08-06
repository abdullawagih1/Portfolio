export type SkillGroup = {
  title: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "AI Architecture",
    items: [
      "AI System Design",
      "Enterprise AI Architecture",
      "End-to-End AI Pipelines",
      "Workflow Orchestration",
      "System Integration",
      "Scalable AI Platforms",
      "Technical Roadmapping",
      "Production AI Design",
    ],
  },
  {
    title: "Generative AI",
    items: [
      "Large Language Models (LLMs)",
      "Retrieval-Augmented Generation (RAG)",
      "AI Agents",
      "Prompt Engineering",
      "LLM Orchestration",
      "Conversational AI",
      "Embeddings",
      "Semantic Search",
      "Model Routing",
    ],
  },
  {
    title: "Machine Learning",
    items: [
      "Regression",
      "Classification",
      "Clustering",
      "Feature Engineering",
      "Model Evaluation",
      "Hyperparameter Tuning",
      "Transfer Learning",
      "CNNs",
      "RNNs",
      "Transformers",
    ],
  },
  {
    title: "NLP & Computer Vision",
    items: [
      "Text Classification",
      "Sentiment Analysis",
      "Topic Modeling",
      "Named Entity Recognition",
      "Word Embeddings",
      "BERT",
      "Object Detection (YOLO)",
      "Image Segmentation",
      "Instance Segmentation",
      "Medical Image Analysis",
    ],
  },
  {
    title: "Engineering & Cloud",
    items: [
      "Python",
      "SQL",
      "R",
      "REST APIs",
      "Git & GitHub",
      "PostgreSQL",
      "Microsoft SQL Server",
      "MongoDB",
      "Supabase",
      "Vector Databases",
      "Microsoft Azure",
      "Azure OpenAI",
      "Azure Synapse Analytics",
      "Azure Data Factory",
      "n8n",
      "MCP",
    ],
  },
  {
    title: "Frameworks & Analytics",
    items: [
      "TensorFlow",
      "PyTorch",
      "Scikit-learn",
      "LangChain",
      "LlamaIndex",
      "Power BI",
      "Tableau",
      "Matplotlib",
      "Seaborn",
    ],
  },
];

export const architectureHighlights = [
  {
    title: "Evidence-Traceable RAG",
    description: "Retrieval pipelines designed so every generated answer can be traced back to its trusted source.",
  },
  {
    title: "Secure Document Ingestion",
    description: "Controlled intake workflows for trusted source material, with review checkpoints before content enters a knowledge base.",
  },
  {
    title: "Deterministic Chunking",
    description: "Structured, repeatable content segmentation that keeps retrieval consistent and auditable.",
  },
  {
    title: "Multilingual Embeddings",
    description: "Embedding strategies built for cross-language retrieval, including Arabic-first contexts.",
  },
  {
    title: "Vector Retrieval",
    description: "Semantic search infrastructure tuned for relevance, latency, and cost across large knowledge bases.",
  },
  {
    title: "Human-in-the-Loop AI",
    description: "Review and approval checkpoints placed at the moments where human judgment matters most.",
  },
  {
    title: "Model Routing",
    description: "Directing requests to the right model for the task, balancing quality, latency, and cost.",
  },
  {
    title: "Caching & Quota Controls",
    description: "Infrastructure that keeps LLM-powered systems predictable and cost-efficient at scale.",
  },
  {
    title: "Role-Based Workflows",
    description: "Access and process design that reflects real organizational roles and responsibilities.",
  },
  {
    title: "Evaluation & Monitoring",
    description: "Quality metrics and production monitoring built in from the start, not bolted on afterward.",
  },
];

export const architectProcess = [
  {
    step: 1,
    title: "Problem Framing",
    description: "Translate business needs into measurable AI use cases.",
  },
  {
    step: 2,
    title: "Data & Knowledge Design",
    description: "Define trusted sources, ingestion pipelines, schemas, access, and governance.",
  },
  {
    step: 3,
    title: "AI Architecture",
    description: "Select models, retrieval strategies, agent workflows, and human-review checkpoints.",
  },
  {
    step: 4,
    title: "Evaluation & Safety",
    description: "Design quality metrics, traceability, guardrails, and failure handling.",
  },
  {
    step: 5,
    title: "Production Engineering",
    description: "Build scalable APIs, orchestration, caching, monitoring, and deployment workflows.",
  },
  {
    step: 6,
    title: "Continuous Improvement",
    description: "Use feedback, failures, cost, and performance data to improve the system.",
  },
];
