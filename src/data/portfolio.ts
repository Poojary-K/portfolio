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
  linkedin: "https://www.linkedin.com/in/poojary-karunakar-ramanath-85b894211",
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
    id: "for-the-society",
    title: "For The Society",
    tagline: "Live · End-to-end fundraising app.",
    description:
      "A live end-to-end web application for a society/fundraising group, owned across frontend, backend, database, and API flow.",
    role: "Full-stack developer & owner",
    tools: ["Angular", "Node.js", "Express.js", "PostgreSQL", "JWT", "REST APIs"],
    highlights: [
      "Built the complete frontend, backend, and database flow.",
      "Implemented JWT authentication with token validation.",
      "Created public and protected API routes.",
      "Hashed user passwords before storing credentials.",
    ],
    outcome:
      "Delivered and deployed a complete full-stack app with secure authentication and database-backed workflows.",
    accent: "blue",
    live: "http://for-the-society.netlify.app/",
    image: "/projects/Forthesociety.png",
  },
  {
    id: "spend-tracker",
    title: "Spend Tracker",
    tagline: "Live · Personal finance PWA.",
    description:
      "A polished personal finance management app — track expenses and income, monitor financial health, and get spending insights. Built solo as a personal product, mobile-first and installable as a PWA. All data stays local in the browser.",
    role: "Solo developer (personal project)",
    tools: ["Angular 20", "Bootstrap 5", "RxJS", "PWA", "TypeScript"],
    highlights: [
      "Financial dashboard with monthly summaries and health indicators.",
      "Expense + income tracking with remembered categories and insights.",
      "Lending/borrowing records and a shared-expense split calculator.",
      "Data import/export, dark & light themes, and offline-capable PWA.",
    ],
    outcome:
      "Shipped a fast, mobile-first finance app on Netlify with privacy-first local-only storage.",
    accent: "green",
    live: "https://devk-spend-tracker.netlify.app/dashboard",
    image: "/projects/spendtracker.png",
  },
  {
    id: "genai-agent-platform",
    title: "GenAI Agent Platform",
    tagline: "Agent workflows · RAG · Neo4j prompts.",
    description:
      "A GenAI platform where users configure prompts, tools, MCP integrations, and documents to drive agent workflows. My current focus — RAG pipelines and Neo4j-backed prompt engineering (system prompts that shape specific feature flows).",
    role: "Full-stack engineer — frontend/backend integration",
    tools: ["Angular", "FastAPI", "AutoGen", "RAG", "Neo4j", "MCP Tools", "Embeddings"],
    highlights: [
      "Built product flows around planning, code-writing, and report-generation agents.",
      "Designed system prompts / prompt engineering for specific feature flows.",
      "Worked on RAG pipelines, embeddings, and document-context retrieval.",
      "Made agent configuration (prompts, tools, MCP, documents) usable from the UI.",
    ],
    outcome:
      "Helped build a practical GenAI platform where users manage agent behavior, tools, and document context.",
    accent: "violet",
    confidential: true,
    diagram: ["UI / Angular", "FastAPI orchestration", "AutoGen agents", "RAG + Embeddings", "Neo4j", "MCP tools & docs"],
  },
  {
    id: "prometheus-metrics-packages",
    title: "Observability Metrics Packages",
    tagline: "Reusable npm & pip for Prometheus.",
    description:
      "Reusable npm and pip packages that expose Prometheus metrics across Node.js and Python services in Docker/IoT-oriented systems, eliminating duplicate instrumentation code.",
    role: "Developer of reusable observability tooling",
    tools: ["Node.js", "Express.js", "Python", "Prometheus", "Docker", "YAML"],
    highlights: [
      "Built Express middleware (accepts an app instance) to track API calls.",
      "Captured route, method, status code, request count, and response behavior.",
      "Exposed a /metrics endpoint for Prometheus scraping.",
      "Tuned scrape intervals and service targets via YAML.",
    ],
    outcome: "Reduced duplicate metrics code across services and improved observability consistency.",
    accent: "cyan",
    confidential: true,
    diagram: ["Node / Python service", "Metrics middleware", "/metrics endpoint", "Prometheus scrape", "Dashboards"],
  },
  {
    id: "production-cicd",
    title: "Production Debugging & CI/CD Gates",
    tagline: "Reliability, tests, release confidence.",
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
    accent: "blue",
    confidential: true,
    diagram: ["Browser", "API services", "Databases", "Docker / K8s", "GitLab CI gates"],
  },
];

export type TimelineItem = {
  period: string;
  title: string;
  description: string;
  tags: string[];
};

// Chronological — oldest first. TODO: adjust exact years if needed.
export const timeline: TimelineItem[] = [
  {
    period: "2023",
    title: "B.E. in Computer Science",
    description:
      "Bachelor of Engineering in Computer Science — Alvas Institute of Engineering and Technology.",
    tags: ["Education"],
  },
  {
    period: "First role · ~9 months",
    title: "MEAN-Stack Application",
    description:
      "Started my engineering career building features across a MEAN-stack app — MongoDB, Express, Angular, and Node.js. Frontend + backend development, maintenance, and bug fixes.",
    tags: ["MongoDB", "Express", "Angular", "Node.js"],
  },
  {
    period: "Next",
    title: "Observability · Prometheus & Docker",
    description:
      "Moved onto Prometheus / Docker work on IoT-oriented systems. Built reusable npm and pip metrics packages so multiple Node.js and Python services could expose Prometheus metrics without duplicating instrumentation.",
    tags: ["Prometheus", "Docker", "npm + pip", "IoT"],
  },
  {
    period: "Now",
    title: "GenAI · RAG & Agent Platform",
    description:
      "Currently working on a GenAI agent platform — RAG pipelines and Neo4j-backed prompt engineering (system prompts that shape specific feature flows), built around AutoGen with a FastAPI backend and an Angular frontend.",
    tags: ["RAG", "Neo4j", "Prompt Engineering", "AutoGen", "FastAPI"],
  },
  {
    period: "Throughout",
    title: "Ownership & Mentoring",
    description:
      "Shipped personal products (For The Society, Spend Tracker), reviewed PRs, mentored juniors, and broke vague requirements into technical tasks with senior validation.",
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
