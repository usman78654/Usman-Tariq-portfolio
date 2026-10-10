export const profile = {
  name: "Usman Tariq",
  email: "m.usmantariq124@gmail.com",
  linkedin: "https://www.linkedin.com/in/m-usman-tariq-6581b022a/",
  github: "https://github.com/usman78654",
  location: "Islamabad, Pakistan",
};

export const focuses = [
  { id: "all", label: "All work" },
  { id: "software", label: "Software & AI" },
  { id: "cloud", label: "Cloud & DevOps" },
  { id: "qa", label: "SQA & Testing" },
] as const;
export type Focus = (typeof focuses)[number]["id"];
export const cvs = [
  {
    focus: "software",
    label: "Software & AI",
    description: "Applications, intelligent tools, and research.",
    href: "/resume/Usman-Tariq-Software-AI-CV.pdf",
  },
  {
    focus: "cloud",
    label: "Cloud & DevOps",
    description: "Distributed systems, deployment, and operations.",
    href: "/resume/Usman-Tariq-Cloud-DevOps-CV.pdf",
  },
  {
    focus: "qa",
    label: "SQA & Testing",
    description: "Test strategy, automation, and release confidence.",
    href: "/resume/Usman-Tariq-SQA-CV.pdf",
  },
];
export const experience = [
  {
    company: "Huawei",
    role: "Software Engineer",
    year: "2026 — Present",
    text: "Turning telecom network data into useful operational views. I work on KPI dashboards, recurring data automation, and context-aware chatbot and API capabilities.",
  },
  {
    company: "National Incubation Center",
    role: "Software Engineer Intern",
    year: "2025",
    text: "Built a Firebase-backed room scheduling system and worked with teams on requirements, ecosystem events, and digital content.",
  },
  {
    company: "Parliament of Pakistan",
    role: "Software Engineer Intern",
    year: "2024",
    text: "Worked on internal ticketing automation and gathered operational requirements with multidisciplinary teams.",
  },
  {
    company: "Pakistan Television",
    role: "Software Engineer Intern",
    year: "2024",
    text: "Collaborated with editorial and broadcast teams on digital public-service content, combining technical communication with visual storytelling.",
  },
];
