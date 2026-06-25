/**
 * SINGLE SOURCE OF TRUTH for all portfolio content.
 * Edit everything here — name, links, skills, projects, timeline.
 * The UI components just render whatever this file exports.
 *
 * 👉 TODO markers below show exactly where to plug in real data later.
 */

export const profile = {
  name: "Poojary Karunakar",
  title: "Full-Stack GenAI Application Engineer",
  // Shown as a smaller secondary line under the title.
  positioning: "Mid-Level Full-Stack Software Engineer",
  valueStatement:
    "I build full-stack products, GenAI agent platforms, backend APIs, and observability tooling that are reliable, usable, and production-ready.",
  location: "India", // TODO: adjust if you want this shown
  yearsExperience: 3,
};

export const links = {
  github: "https://github.com/Poojary-K",
  // TODO: replace with your real LinkedIn URL
  linkedin: "https://www.linkedin.com/",
  email: "kotianr002@gmail.com",
  // TODO: drop your resume PDF into /public and point here, e.g. "/Poojary-Karunakar-Resume.pdf"
  resume: "/resume-placeholder.pdf",
};

export const about = {
  intro:
    "I am a full-stack software engineer with 3 years of experience working across Angular, Node.js, Express, FastAPI, PostgreSQL, MongoDB, Docker, Kubernetes, CI/CD, and production debugging. I have also worked on GenAI agent platforms using AutoGen, RAG, MCP tools, and user-configurable agent workflows.",
  whatIDo:
    "I build frontend interfaces, backend APIs, database-backed applications, agent platform features, internal tooling, testing flows, and observability integrations.",
  problemsILike:
    "I enjoy solving end-to-end product problems, debugging complex production issues, improving developer experience, building reusable tooling, and turning AI/agent systems into usable product experiences.",
  workingStyle:
    "Practical, curious, debugging-oriented, ownership-driven, and quality-focused. I break vague requirements into tasks, implement features, validate approaches with senior engineers, review PRs, and mentor juniors.",
  // Quick stats for the About strip.
  stats: [
    { label: "Years of experience", value: "3+" },
    { label: "On a GenAI agent platform", value: "~1 yr" },
    { label: "Core domains", value: "5" },
  ],
};

export type SkillGroup = {
  category: string;
  // Short tagline shown under the category heading.
  blurb: string;
  accent: "cyan" | "blue" | "violet" | "green";
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    blurb: "Component-driven, responsive, tested UIs.",
    accent: "cyan",
    skills: ["Angular", "React / Next.js", "TypeScript", "JavaScript", "HTML", "CSS", "Cypress"],
  },
  {
    category: "Backend",
    blurb: "End-to-end APIs with auth and validation.",
    accent: "blue",
    skills: ["Node.js", "Express.js", "FastAPI", "REST APIs", "JWT Auth", "Password Hashing"],
  },
  {
    category: "Databases",
    blurb: "Relational, document, and graph stores.",
    accent: "violet",
    skills: ["PostgreSQL", "MongoDB", "Neo4j"],
  },
  {
    category: "GenAI",
    blurb: "Agent platforms, orchestration, and RAG.",
    accent: "green",
    skills: ["AutoGen", "Agent Workflows", "RAG", "Embeddings", "MCP Tools", "Document Context"],
  },
  {
    category: "DevOps / Platform",
    blurb: "Ship, observe, and debug in production.",
    accent: "blue",
    skills: ["Docker", "Kubernetes", "GitLab CI/CD", "Prometheus", "YAML"],
  },
  {
    category: "Engineering Practices",
    blurb: "How I work, not just what I use.",
    accent: "cyan",
    skills: [
      "Microservices",
      "API Design",
      "Production Debugging",
      "Testing",
      "PR Reviews",
      "Mentoring",
    ],
  },
];

export type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  role: string;
  tools: string[];
  highlights: string[];
  outcome: string;
  accent: "cyan" | "blue" | "violet" | "green";
  // TODO: add a screenshot to /public and set e.g. image: "/projects/fundraising.png"
  image?: string;
  // TODO: add live/repo links if available
  repo?: string;
  live?: string;
  // Company/NDA work where real screenshots can't be shown. When true, the
  // case study renders an abstract architecture diagram from `diagram` instead.
  confidential?: boolean;
  // Labels for the architecture-diagram placeholder (top row → bottom row).
  diagram?: string[];
};

export const projects: Project[] = [
  {
    id: "fundraising-app",
    title: "Fundraising Group Full-Stack App",
    tagline: "End-to-end web app with secure auth.",
    description:
      "An end-to-end web application built for a fundraising group, owned across frontend, backend, database, and API flow.",
    role: "Full-stack developer & owner",
    tools: ["Angular", "Node.js", "Express.js", "PostgreSQL", "JWT", "REST APIs"],
    highlights: [
      "Built the complete frontend, backend, and database flow.",
      "Implemented JWT authentication with token validation.",
      "Created public and protected API routes.",
      "Hashed user passwords before storing credentials.",
    ],
    outcome:
      "Delivered a complete working full-stack app with secure authentication and database-backed workflows.",
    accent: "blue",
    repo: links.github,
  },
  {
    id: "genai-agent-platform",
    title: "GenAI Agent Platform",
    tagline: "User-configurable agent workflows.",
    description:
      "A GenAI platform where users configure prompts, tools, MCP integrations, and documents to drive agent workflows. ~1 year of work on an AutoGen-based system.",
    role: "Full-stack engineer — frontend/backend integration",
    tools: ["Angular", "FastAPI", "AutoGen", "RAG", "MCP Tools", "Embeddings"],
    highlights: [
      "Built product flows around planning, code-writing, and report-generation agents.",
      "Made agent configuration (prompts, tools, MCP, documents) usable from the UI.",
      "Integrated frontend experiences with backend orchestration APIs.",
      "Supported RAG and document-context workflows end to end.",
    ],
    outcome:
      "Helped build a practical GenAI platform where users could manage agent behavior, tools, and document context.",
    accent: "violet",
  },
  {
    id: "prometheus-metrics-packages",
    title: "Prometheus Metrics Packages",
    tagline: "Reusable observability for Node & Python.",
    description:
      "Reusable npm and pip packages that expose Prometheus metrics across Node.js and Python services, eliminating duplicate instrumentation code.",
    role: "Developer of reusable observability tooling",
    tools: ["Node.js", "Express.js", "Python", "Prometheus", "YAML"],
    highlights: [
      "Built Express middleware (accepts an app instance) to track API calls.",
      "Captured route, method, status code, request count, and response behavior.",
      "Exposed metrics for Prometheus scraping.",
      "Tuned scrape intervals and service targets via YAML.",
    ],
    outcome: "Reduced duplicate metrics code across services and improved observability consistency.",
    accent: "green",
  },
  {
    id: "production-cicd",
    title: "Production Debugging & CI/CD Quality Gates",
    tagline: "Reliability, tests, and release confidence.",
    description:
      "Maintenance and debugging work across production applications, plus CI/CD quality gates that block releases on failing tests.",
    role: "Full-stack engineer",
    tools: ["Angular", "Node.js", "FastAPI", "Docker", "Kubernetes", "GitLab CI/CD", "Cypress"],
    highlights: [
      "Debugged issues from browser network calls to backend logs and DB behavior.",
      "Wrote and maintained Cypress / component tests.",
      "Integrated tests into GitLab CI/CD so failures block tag/release creation.",
      "Investigated container, pod, port, and readiness deployment issues.",
    ],
    outcome: "Improved reliability, test coverage, and release confidence.",
    accent: "cyan",
  },
];

export type TimelineItem = {
  period: string;
  title: string;
  description: string;
  tags: string[];
};

// TODO: adjust years to your real timeline.
export const timeline: TimelineItem[] = [
  {
    period: "2023",
    title: "B.E. in Computer Science",
    description:
      "Bachelor of Engineering in Computer Science — Alvas Institute of Engineering and Technology.",
    tags: ["Education"],
  },
  {
    period: "2023 — Present",
    title: "Software Engineer",
    description:
      "Building frontend and backend features across Angular, Node.js, Express, MongoDB, and PostgreSQL. Production feature development, maintenance, and debugging.",
    tags: ["Angular", "Node.js", "PostgreSQL", "MongoDB"],
  },
  {
    period: "~1 year",
    title: "GenAI Agent Platform",
    description:
      "Worked on an AutoGen-based GenAI application — agent workflows, RAG, MCP tools, and user-configurable agent behavior with a FastAPI backend.",
    tags: ["AutoGen", "RAG", "FastAPI", "MCP"],
  },
  {
    period: "Ongoing",
    title: "Observability & Platform",
    description:
      "Built reusable Prometheus metrics packages for Node.js and Python, and worked with Docker, Kubernetes, GitLab CI/CD, and Cypress tests.",
    tags: ["Prometheus", "Docker", "Kubernetes", "CI/CD"],
  },
  {
    period: "Ongoing",
    title: "Ownership & Mentoring",
    description:
      "Shipped a personal full-stack fundraising app, started reviewing PRs, mentoring juniors, and breaking vague requirements into technical tasks.",
    tags: ["PR Reviews", "Mentoring", "Planning"],
  },
];

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];
