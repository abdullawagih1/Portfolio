export type ProjectStatus = "confidential-engagement" | "prototype";

export type ArchitectureNode = {
  label: string;
  description: string;
};

export type Project = {
  slug: string;
  title: string;
  name: string;
  subtitle: string;
  category: string;
  domain: string;
  role: string;
  status: ProjectStatus;
  statusLabel: string;
  featured: boolean;
  confidentialityNote: string;
  summary: string;
  problem: string[];
  responsibilities: string[];
  capabilities: string[];
  architecture: ArchitectureNode[];
  aiDesign: string[];
  security: string[];
  outcomes: string[];
  technologies: string[];
  relatedProjects: string[];
  visualSystem: "evidence-trail" | "operations-inbox" | "diagnosis-roadmap" | "proposal-flow" | "privacy-tracking" | "modular-exam" | "property-graph";
  /**
   * Internal note for the content owner — never rendered in the UI.
   * Used to flag facts that still need confirmation against a primary source.
   */
  reviewNote?: string;
};

const sharedConfidentiality =
  "Some implementation details are intentionally limited to protect client confidentiality and intellectual property.";

export const projects: Project[] = [
  {
    slug: "noor",
    title: "NOOR — Clinical Intelligence Platform",
    name: "NOOR",
    subtitle: "Clinical Intelligence Platform",
    category: "Healthcare AI",
    domain: "Healthcare",
    role: "AI Solution Architect",
    status: "confidential-engagement",
    statusLabel: "Confidential Client Engagement",
    featured: true,
    confidentialityNote: sharedConfidentiality,
    summary:
      "An enterprise-grade clinical intelligence platform that transforms trusted medical guidelines into structured, AI-ready knowledge — built for evidence traceability, not autonomous diagnosis.",
    problem: [
      "Clinical teams needed a reliable way to turn large volumes of trusted medical guidelines into knowledge that AI systems could retrieve accurately, without losing the ability to trace an answer back to its source.",
      "Healthcare content carries a higher bar for accuracy and auditability than general-purpose AI use cases, which meant the ingestion and retrieval layers had to be designed around trust from the start.",
    ],
    responsibilities: [
      "Architected the platform end-to-end, from source intake to retrieval-augmented generation.",
      "Designed the human review workflow that sits between raw source material and structured knowledge.",
      "Defined the retrieval and evaluation strategy for evidence-traceable answers.",
    ],
    capabilities: [
      "Secure source intake",
      "Human review workflows",
      "Structured extraction",
      "Deterministic chunking",
      "Multilingual embeddings",
      "Vector retrieval",
      "Evidence-traceable RAG",
    ],
    architecture: [
      { label: "Secure Source Intake", description: "Trusted medical guidelines enter the system through a controlled intake process." },
      { label: "Human Review", description: "Domain reviewers validate source material before it becomes structured knowledge." },
      { label: "Deterministic Chunking", description: "Content is segmented in a structured, repeatable way to keep retrieval consistent." },
      { label: "Multilingual Embeddings", description: "Knowledge is embedded for accurate cross-language retrieval." },
      { label: "Vector Retrieval", description: "Semantic search surfaces the most relevant, trusted passages for a query." },
      { label: "Evidence-Traceable RAG", description: "Generated responses are grounded in retrieved passages that can be traced back to source." },
    ],
    aiDesign: [
      "Retrieval-augmented generation grounded in reviewed, trusted sources rather than open-web content.",
      "Deterministic chunking and multilingual embeddings designed for consistency and auditability.",
      "Evaluation and traceability built around the requirement that every answer can be linked back to its source.",
      "The system is explicitly scoped as a knowledge and retrieval platform — it is not designed or presented as an autonomous diagnostic or treatment tool.",
    ],
    security: [
      "Access control around who can submit, review, and approve source material.",
      "Human review checkpoints between raw content and anything the system can retrieve.",
      "Monitoring and evaluation processes to catch retrieval quality issues in production.",
    ],
    outcomes: [
      "Delivered a production-ready architecture for turning trusted clinical guidelines into an evidence-traceable knowledge system for healthcare professionals.",
    ],
    technologies: ["LLMs", "RAG", "Vector Databases", "Python", "Azure OpenAI"],
    relatedProjects: ["careeros", "edusys"],
    visualSystem: "evidence-trail",
  },
  {
    slug: "logibrain",
    title: "LogiBrain — Logistics Intelligence OS",
    name: "LogiBrain",
    subtitle: "Logistics Intelligence OS",
    category: "Logistics AI",
    domain: "Logistics",
    role: "AI Solution Architect",
    status: "confidential-engagement",
    statusLabel: "Confidential Client Engagement",
    featured: true,
    confidentialityNote: sharedConfidentiality,
    summary:
      "An AI-enabled operations platform that converts unstructured WhatsApp messages and files into structured shipments, tasks, incidents, and approvals — with a human always in the loop.",
    problem: [
      "Day-to-day logistics coordination was happening through unstructured WhatsApp messages and files, which made it hard to track shipments, incidents, and approvals in one searchable system.",
      "The platform needed to bring structure to that operational chaos without removing human judgment from decisions that require it.",
    ],
    responsibilities: [
      "Architected the hybrid operations platform end-to-end.",
      "Designed the Smart Inbox, operations command center, and File Vault.",
      "Defined role-based workflows and the human-in-the-loop AI review process.",
    ],
    capabilities: [
      "Message & file ingestion",
      "Smart Inbox",
      "Structured shipments",
      "Tasks & incidents",
      "Approvals",
      "Searchable records",
      "File Vault",
      "Operations command center",
    ],
    architecture: [
      { label: "WhatsApp Ingestion", description: "Messages and files enter the system from operational WhatsApp channels." },
      { label: "Smart Inbox", description: "Incoming content is classified and routed for action." },
      { label: "Structured Records", description: "Shipments, tasks, and incidents are extracted into structured, searchable records." },
      { label: "Approvals", description: "Actions that require sign-off are routed through role-based approval workflows." },
      { label: "Human Review", description: "Operators review and confirm AI-assisted classifications before they become records of truth." },
      { label: "Command Center", description: "A unified operations view brings shipments, tasks, and incidents together." },
    ],
    aiDesign: [
      "AI-assisted classification of incoming messages and files into structured operational entities.",
      "Human-in-the-loop review at the points where an incorrect classification would have real operational cost.",
      "Role-based workflows that reflect how logistics teams actually make decisions and approvals.",
    ],
    security: [
      "Role-based access across shipments, tasks, incidents, and approvals.",
      "A File Vault for controlled handling of operational documents.",
      "Human review as a safeguard against unchecked automated actions.",
    ],
    outcomes: [
      "Delivered an operations platform that turns unstructured WhatsApp communication into structured, searchable logistics records with human-reviewed AI assistance.",
    ],
    technologies: ["LLMs", "AI Agents", "Workflow Orchestration", "PostgreSQL", "n8n"],
    relatedProjects: ["careeros", "noor"],
    visualSystem: "operations-inbox",
  },
  {
    slug: "careeros",
    title: "CareerOS — AI-Powered Career Development Platform",
    name: "CareerOS",
    subtitle: "AI-Powered Career Development Platform",
    category: "Career & Education AI",
    domain: "Education",
    role: "AI Solution Architect",
    status: "confidential-engagement",
    statusLabel: "Confidential Client Engagement",
    featured: true,
    confidentialityNote: sharedConfidentiality,
    summary:
      "An AI career operating system for CV extraction and analysis, skill-gap diagnosis, readiness scoring, and personalized career planning.",
    problem: [
      "Job seekers needed more than generic advice — they needed a system that could analyze their actual background against a target role and generate a concrete, personalized plan.",
      "Doing this well required combining structured CV analysis with retrieval-based reasoning, while keeping the system cost-efficient at scale.",
    ],
    responsibilities: [
      "Designed the AI career operating system architecture.",
      "Built the retrieval, model-routing, and caching strategy for cost-efficient operation at scale.",
      "Defined the human review process for generated career guidance.",
    ],
    capabilities: [
      "CV extraction & analysis",
      "Target-role analysis",
      "Skill-gap diagnosis",
      "Readiness scoring",
      "Personalized roadmap generation",
      "Learning-content support",
      "Job-readiness support",
    ],
    architecture: [
      { label: "CV Ingestion", description: "A candidate's CV is extracted and structured for analysis." },
      { label: "Diagnosis Pipeline", description: "The candidate's profile is compared against target-role requirements." },
      { label: "Skill-Gap Analysis", description: "Gaps between current profile and target role are identified." },
      { label: "RAG", description: "Retrieval-augmented generation supports grounded, relevant career guidance." },
      { label: "Model Routing", description: "Requests are routed across models to balance quality and cost." },
      { label: "Roadmap Generation", description: "A personalized, actionable career roadmap is produced for the candidate." },
    ],
    aiDesign: [
      "Retrieval-augmented generation combined with structured CV analysis for grounded, relevant guidance.",
      "Model routing, caching, and quota controls to keep the system cost-efficient at scale.",
      "Human review built into the generation of career guidance and roadmaps.",
    ],
    security: [
      "Quota controls to prevent runaway usage and cost.",
      "Human review of AI-generated career guidance before it reaches the candidate.",
    ],
    outcomes: [
      "Delivered an AI career operating system covering CV analysis, skill-gap diagnosis, and personalized roadmap generation.",
    ],
    technologies: ["RAG", "Vector Search", "Model Routing", "LLMs", "Python"],
    relatedProjects: ["rashad", "noor"],
    visualSystem: "diagnosis-roadmap",
  },
  {
    slug: "rashad",
    title: "Rashad — AI Technical Proposal Generator",
    name: "Rashad",
    subtitle: "AI Technical Proposal Generator",
    category: "Enterprise Automation AI",
    domain: "Enterprise Automation",
    role: "AI Solution Architect",
    status: "confidential-engagement",
    statusLabel: "Confidential Client Engagement",
    featured: false,
    confidentialityNote: sharedConfidentiality,
    summary:
      "An AI-powered platform for analyzing client requirements and RFPs and generating structured technical and commercial proposals.",
    problem: [
      "Producing technical and commercial proposals in response to client RFPs is a time-intensive, knowledge-heavy process that depends on reusing an organization's own expertise consistently.",
      "The platform needed to combine requirements analysis with retrieval from an organization's own knowledge base, while keeping a human in control of what actually goes out the door.",
    ],
    responsibilities: [
      "Architected the requirements-to-proposal generation workflow.",
      "Designed the organizational knowledge retrieval and prompt orchestration layer.",
      "Defined the human review and document export workflow.",
    ],
    capabilities: [
      "RFP & requirements analysis",
      "Proposal structure generation",
      "Organization knowledge retrieval",
      "Template-aware generation",
      "Reusable knowledge",
      "Document export workflow",
    ],
    architecture: [
      { label: "Requirements Intake", description: "Client requirements and RFP documents are analyzed for scope and structure." },
      { label: "Knowledge Retrieval", description: "Relevant organizational knowledge is retrieved to ground the proposal." },
      { label: "Prompt Orchestration", description: "Retrieved knowledge and requirements are orchestrated into a structured draft." },
      { label: "Template-Aware Generation", description: "Proposals are generated in a way that respects the organization's own templates and structure." },
      { label: "Human Review", description: "Reviewers refine and approve generated content before export." },
      { label: "Export", description: "Approved proposals are exported in a client-ready document format." },
    ],
    aiDesign: [
      "Retrieval-augmented generation grounded in an organization's own reusable knowledge base.",
      "Prompt orchestration designed around template-aware, consistent proposal structure.",
      "Human review as a required step before any proposal is finalized.",
    ],
    security: [
      "Access control over organizational knowledge used for retrieval.",
      "Human review as a quality and consistency safeguard before export.",
    ],
    outcomes: [
      "Delivered an architecture for turning RFP analysis and organizational knowledge into structured, human-reviewed proposal drafts.",
    ],
    technologies: ["RAG", "LLMs", "Prompt Orchestration", "Vector Databases"],
    relatedProjects: ["careeros", "logibrain"],
    visualSystem: "proposal-flow",
    reviewNote:
      "Rashad is described in the site brief but does not currently appear in either source CV. Recommend adding it to the Technical CV's Selected Client Projects section for consistency, or confirming details before publishing this case study live.",
  },
  {
    slug: "hormonify",
    title: "Hormonify — AI-Powered Hormonal Health Platform",
    name: "Hormonify",
    subtitle: "AI-Powered Hormonal Health Platform",
    category: "Health & Wellness AI",
    domain: "Healthcare",
    role: "AI Solution Architect",
    status: "confidential-engagement",
    statusLabel: "Confidential Client Engagement",
    featured: false,
    confidentialityNote: sharedConfidentiality,
    summary:
      "A privacy-conscious platform combining structured symptom and cycle tracking with personalized AI insights and educational content.",
    problem: [
      "Hormonal health tracking involves sensitive personal data, so the platform needed an architecture that treated privacy as a first-class design constraint rather than an afterthought.",
      "It also needed to turn structured tracking data into insights that were genuinely useful without overstating what the AI could responsibly claim.",
    ],
    responsibilities: [
      "Architected the platform's privacy-conscious data and AI workflows.",
      "Designed the structured tracking model and its connection to personalized insight generation.",
    ],
    capabilities: [
      "Structured symptom & cycle tracking",
      "Personalized AI insights",
      "Educational content",
      "Scalable data workflows",
    ],
    architecture: [
      { label: "Structured Tracking", description: "Symptoms and cycle data are captured in a structured, privacy-conscious model." },
      { label: "Insight Generation", description: "Tracked data informs personalized, scoped AI insights." },
      { label: "Educational Layer", description: "Insights are paired with educational content rather than open-ended claims." },
    ],
    aiDesign: [
      "Personalized insights generated from structured user data, scoped to informational and educational use.",
      "Privacy-conscious architecture as a core design constraint, not a bolt-on feature.",
    ],
    security: [
      "Privacy-conscious handling of sensitive personal health data throughout the architecture.",
    ],
    outcomes: [
      "Delivered a privacy-conscious architecture combining structured tracking with personalized, educationally scoped AI insights.",
    ],
    technologies: ["LLMs", "Data Modeling", "Python"],
    relatedProjects: ["noor"],
    visualSystem: "privacy-tracking",
  },
  {
    slug: "edusys",
    title: "EduSys — Secure Education and Examination Platform",
    name: "EduSys",
    subtitle: "Secure Education and Examination Platform",
    category: "EdTech",
    domain: "Education",
    role: "AI Solution Architect",
    status: "confidential-engagement",
    statusLabel: "Confidential Client Engagement",
    featured: false,
    confidentialityNote: sharedConfidentiality,
    summary:
      "A modular, Arabic-first education platform covering identity, secure examinations, proctoring, learner tracking, and AI governance.",
    problem: [
      "Running secure, trustworthy examinations at scale for Arabic-first learner populations required a modular architecture spanning identity, proctoring, and administrative monitoring — not just a testing UI.",
      "AI governance needed to be part of the architecture from the start, given the platform's role in high-stakes assessment.",
    ],
    responsibilities: [
      "Architected the modular, service-oriented platform structure.",
      "Designed integration flows across identity, examinations, proctoring, and administration.",
    ],
    capabilities: [
      "Identity",
      "Secure examinations",
      "Proctoring events",
      "Learner tracking",
      "Administrative monitoring",
      "Wallet simulation",
      "AI governance",
    ],
    architecture: [
      { label: "Identity", description: "Learner and administrator identity is established before any exam access." },
      { label: "Secure Examinations", description: "Examinations run within a controlled, monitored environment." },
      { label: "Proctoring Events", description: "Proctoring signals are captured as structured events for review." },
      { label: "Learner Tracking", description: "Learner progress and history are tracked across the platform." },
      { label: "AI Governance", description: "AI-assisted components operate within defined governance boundaries." },
    ],
    aiDesign: [
      "AI components scoped within explicit governance boundaries appropriate for high-stakes assessment.",
      "Service-oriented architecture allowing identity, examination, and proctoring concerns to evolve independently.",
    ],
    security: [
      "Identity verification ahead of examination access.",
      "Structured proctoring events for administrative review.",
      "AI governance controls appropriate for a high-stakes assessment context.",
    ],
    outcomes: [
      "Delivered a modular, Arabic-first education platform architecture spanning identity, secure examinations, and AI governance.",
    ],
    technologies: ["Service-Oriented Architecture", "Python", "PostgreSQL"],
    relatedProjects: ["noor", "real-estate"],
    visualSystem: "modular-exam",
  },
  {
    slug: "real-estate",
    title: "AI-Powered Real Estate Platform",
    name: "Real Estate Platform",
    subtitle: "AI-Powered Real Estate Platform",
    category: "PropTech",
    domain: "Real Estate",
    role: "AI Solution Architect",
    status: "confidential-engagement",
    statusLabel: "Confidential Client Engagement",
    featured: false,
    confidentialityNote: sharedConfidentiality,
    summary:
      "An intelligent real estate platform supporting semantic property search, personalized recommendations, and conversational AI assistance for lead qualification.",
    problem: [
      "Property discovery through keyword search misses buyer intent that doesn't map to exact listing text, and lead qualification was a manual, inconsistent process.",
      "The platform needed semantic understanding of both properties and buyer intent, connected to real business workflows.",
    ],
    responsibilities: [
      "Architected the semantic search and recommendation data workflows.",
      "Designed the conversational AI assistance layer for lead qualification.",
    ],
    capabilities: [
      "Semantic property search",
      "Recommendation logic",
      "Conversational AI",
      "Lead qualification",
      "Business workflow integration",
    ],
    architecture: [
      { label: "Property Discovery", description: "Listings are indexed for semantic, intent-aware search." },
      { label: "Semantic Search", description: "Buyer queries are matched against listings by meaning, not just keywords." },
      { label: "Recommendations", description: "Relevant properties are surfaced based on buyer intent and history." },
      { label: "Conversational AI", description: "A conversational layer helps buyers explore options and qualifies leads." },
      { label: "Workflow Integration", description: "Qualified leads flow into real estate business processes." },
    ],
    aiDesign: [
      "Semantic search built around buyer intent rather than exact keyword matching.",
      "Conversational AI scoped to assistance and lead qualification, connected to real business workflows.",
    ],
    security: [
      "Structured handoff from AI-qualified leads into existing business workflows.",
    ],
    outcomes: [
      "Delivered a semantic search and conversational assistance architecture connected to real estate lead-qualification workflows.",
    ],
    technologies: ["Semantic Search", "LLMs", "Vector Databases"],
    relatedProjects: ["edusys", "careeros"],
    visualSystem: "property-graph",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getRelatedProjects(project: Project): Project[] {
  return project.relatedProjects
    .map((slug) => getProjectBySlug(slug))
    .filter((p): p is Project => Boolean(p));
}
