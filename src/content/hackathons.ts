export type Hackathon = {
  slug: string;
  title: string;
  domain: string;
  roleTitle: string;
  summary: string;
  details: string[];
  partners: string[];
};

export const hackathons: Hackathon[] = [
  {
    slug: "brats-instance-segmentation",
    title: "BraTS Instance Image Segmentation Hackathon",
    domain: "Medical AI",
    roleTitle: "Lead Mentor",
    summary:
      "Led the technical planning and delivery of a medical AI hackathon on instance image segmentation using the BraTS dataset.",
    details: [
      "Designed the challenge workflow and structure",
      "Defined evaluation criteria for participant submissions",
      "Provided participant guidance and technical mentoring",
    ],
    partners: ["Orange Digital Center (ODC)", "Instant Software Solutions"],
  },
  {
    slug: "ai-clinical-decision-support-lite",
    title: "AI Clinical Decision Support Lite Hackathon",
    domain: "Healthcare AI",
    roleTitle: "Lead Mentor",
    summary:
      "Led the technical design and execution of a healthcare AI hackathon focused on lightweight clinical decision support.",
    details: [
      "Defined challenge scope and evaluation criteria",
      "Designed the mentoring process and implementation guidelines",
      "Delivered under the supervision of the listed partner organizations",
    ],
    partners: [
      "Ministry of Communications and Information Technology (MCIT)",
      "Orange Digital Center (ODC)",
      "Instant Software Solutions",
    ],
  },
];
