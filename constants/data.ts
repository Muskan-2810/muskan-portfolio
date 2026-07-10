// -----------------------------------------------------------------------------
// SINGLE SOURCE OF TRUTH for all portfolio content.
// Every section pulls from here — never hardcode copy inside components.
// -----------------------------------------------------------------------------

// Replace with the real production domain once deployed — used by metadata,
// sitemap.xml, and robots.txt.
export const SITE_URL = "https://muskan-vishwakarma.vercel.app";

export const PROFILE = {
  name: "Muskan Vishwakarma",
  roles: ["Software Developer", "AI Engineer"],

  tagline:
    "Building reliable software with Java while exploring how Artificial Intelligence can solve real-world problems.",

  intro:
    "I'm Muskan Vishwakarma, a third-year Computer Science Engineering student specializing in Artificial Intelligence and Machine Learning at Lakshmi Narain College of Technology Excellence. I enjoy building reliable software with Java while exploring practical applications of AI. My focus is on creating scalable solutions, strengthening problem-solving skills, and continuously learning through real-world projects.",

  aboutPhilosophy:
    "I believe technology should solve practical problems rather than introduce unnecessary complexity. My goal is to become a skilled Java Developer with strong expertise in Artificial Intelligence, building software that is efficient, scalable, and created with purpose. Every project I work on is an opportunity to learn, improve, and create meaningful solutions.",

  location: "Bhopal, India",
  email: "muskanvishwakarma2569@gmail.com",
  phone: "+91 9303571614",
};

// Hero-specific copy — written to sound like a person talking, not a slogan
// generator. Kept separate from PROFILE.tagline (used elsewhere as the
// canonical one-liner, e.g. meta description / About section).
export const HERO_TAGLINE = "I write code the way I think — carefully, and with a reason for every line.";

export const HERO_INTRO =
  "Third-year CS student majoring in AI & ML, currently spending most late nights teaching machines to make slightly better decisions than I do. I like software that's dependable first and clever second.";

export const COURSEWORK = [
  "Data Structures & Algorithms",
  "Object-Oriented Programming (Java)",
  "Machine Learning Fundamentals",
  "Database Management Systems",
  "Operating Systems",
  "Computer Networks",
];

// Chronological milestones for the "My Journey" timeline. Order matters —
// rendered top to bottom exactly as listed.
export const JOURNEY = [
  {
    id: "start",
    year: "2023",
    title: "Started B.Tech CSE (AI & ML)",
    description:
      "Walked into my first semester not fully sure what 'AI & ML' would mean day to day — just sure I wanted to build things, not just study them.",
  },
  {
    id: "java",
    year: "2023",
    title: "Started learning Java",
    description:
      "Picked Java as my first serious language. The strictness annoyed me at first, then became the thing I trusted most about it.",
  },
  {
    id: "backend",
    year: "2024",
    title: "Built first backend projects",
    description:
      "Moved from syntax exercises to actual services — routes, databases, things that could break in interesting ways. This is where it started feeling like engineering.",
  },
  {
    id: "cp",
    year: "2024",
    title: "Competitive Programming",
    description:
      "Started solving problems daily, not for the ranking, but because it rewired how I think about complexity before I write a single line.",
  },
  {
    id: "hackathons",
    year: "2024",
    title: "Hackathons",
    description:
      "Traded solo problem-sets for team sprints — tight deadlines, shared whiteboards, and the first taste of shipping something under pressure.",
  },
  {
    id: "pragati",
    year: "2026",
    title: "Infosys Pragati Selection",
    description:
      "Selected for Infosys' Pragati program — a signal that the discipline was starting to show in ways beyond my own judgment of it.",
  },
  {
    id: "certifications",
    year: "2025",
    title: "Google & AWS Certifications",
    description:
      "Formalized what I'd been piecing together — Generative AI and Cloud Computing — to close gaps between what I could build and what I understood.",
  },
  {
    id: "ai-projects",
    year: "2025 — Present",
    title: "Current AI Projects",
    description:
      "Building Grovio and other ML-backed systems now — the shift from 'learning AI' to 'shipping AI' is the one I'm most proud of.",
  },
  {
    id: "future",
    year: "Next",
    title: "Java Backend + AI Engineer",
    description:
      "The goal isn't a job title — it's becoming someone who can take a system from idea to production, with intelligence built in where it earns its place.",
    isFuture: true,
  },
] as const;

// Real, verified skill set only — grouped exactly as provided, no fabricated
// technologies. Accent colors rotate through the palette for visual identity
// per category without implying any ranking.
export const SKILL_CATEGORIES = [
  {
    id: "programming",
    label: "Programming",
    accent: "#3E8EFF",
    skills: ["Java"],
  },
  {
    id: "backend",
    label: "Backend",
    accent: "#274DFF",
    skills: ["Spring Boot"],
  },
  {
    id: "database",
    label: "Database",
    accent: "#8B7CFF",
    skills: ["MySQL"],
  },
  {
    id: "ai",
    label: "Artificial Intelligence",
    accent: "#3E8EFF",
    skills: ["Artificial Intelligence", "Machine Learning", "Generative AI", "Prompt Engineering"],
  },
  {
    id: "cloud",
    label: "Cloud",
    accent: "#274DFF",
    skills: ["AWS Cloud Computing"],
  },
  {
    id: "dev-tools",
    label: "Developer Tools",
    accent: "#8B7CFF",
    skills: ["Git", "GitHub", "VS Code", "IntelliJ IDEA", "Eclipse", "Figma"],
  },
  {
    id: "ai-tools",
    label: "AI Tools",
    accent: "#3E8EFF",
    skills: ["ChatGPT", "Claude", "Gemini", "GitHub Copilot", "Cursor AI", "Perplexity", "Hugging Face"],
  },
] as const;

// Technologies this *site* is built with — shown only as a footer credit,
// never presented as Muskan's personal skill set.
export const SITE_BUILT_WITH = [
  "Next.js",
  "React",
  "TypeScript",
  "TailwindCSS",
  "Three.js",
  "React Three Fiber",
  "GSAP",
  "Framer Motion",
];

// Experience presented as a chronological timeline rather than a resume list.
// `badge` is the short chip label reused by the Achievements section so both
// sections stay in sync without duplicating this data.
export const EXPERIENCE_TIMELINE = [
  {
    id: "gdgoc",
    org: "Google Developer Groups on Campus",
    role: "Lead",
    badge: "LEAD",
    period: "August 2025 – June 2026",
    logo: "google" as const,
    description:
      "Leading the GDG on Campus chapter — organizing technical workshops and community events centered on AI and cloud technologies, coordinating speakers, and driving developer engagement across campus.",
  },
  {
    id: "pragati",
    org: "Infosys Pragati Program",
    role: "Selected Participant",
    badge: "SELECTED",
    period: "2026",
    logo: "infosys" as const,
    description:
      "Selected for Infosys' national program supporting early-career women in technology — a structured push toward stronger engineering fundamentals and industry exposure.",
  },
  {
  id: "ecell",
  org: "E-Cell Hackathon",
  role: "Third Prize",
  badge: "3RD PRIZE",
  period: "2024",
  logo: "trophy" as const,
  description:
    "Built and pitched a working prototype in a 36-hour team hackathon, going from idea to demo with a team that met for the first time that weekend.",
},
] as const;

// Certifications with light metadata for the premium card treatment.
// `fileUrl` stays null until real certificate files are supplied — the
// preview modal falls back to a branded placeholder in that case.
export const CERTIFICATIONS_DETAILED = [
  {
    id: "microsoft-ai",
    name: "Microsoft AI",
    issuer: "Microsoft",
    year: "2026",
    logo: "microsoft" as const,
    fileUrl: "/certificates/microsoft-ai.pdf",
  },
  {
    id: "aws-cloud",
    name: "AWS Cloud Computing",
    issuer: "Amazon Web Services",
    year: "2026",
    logo: "aws" as const,
    fileUrl: "/certificates/aws-cloud-computing.pdf",
  },
  {
    id: "cisco-data",
    name: "Cisco Data Analytics",
    issuer: "Cisco",
    year: "2026",
    logo: "cisco" as const,
    fileUrl: "/certificates/cisco-data-analytics.pdf",
  },
  {
    id: "infosys-java",
    name: "Programming Using Java",
    issuer: "Infosys Springboard",
    year: "2026",
    logo: "infosys" as const,
    fileUrl: "/certificates/java.pdf",
  },
] as const;

export const EDUCATION = {
  institution: "Lakshmi Narain College of Technology Excellence",
  degree: "B.Tech, Computer Science Engineering",
  specialization: "Artificial Intelligence & Machine Learning",
  year: "Third Year",
  cgpa: "7.43",
};

export const INTERESTS = [
  "Java Development",
  "Artificial Intelligence",
  "Machine Learning",
  "System Design",
  "Modern Software Architecture",
  "Problem Solving",
  "Product Development",
  "Emerging Technologies",
];

export const PERSONALITY = [
  "Thoughtful",
  "Observant",
  "Disciplined",
  "Adaptable",
  "Detail-Oriented",
  "Curious",
];

export const PROJECTS = [
  {
    id: "grovio",
    featured: true,
    name: "Grovio",
    description:
      "An AI-powered internship recommendation platform that intelligently analyzes resumes, user profiles, skills, and interests to recommend personalized internship opportunities using machine learning and scalable backend services.",
    stack: ["Java",
    "Spring Boot",
    "REST APIs",
    "MySQL",
    "JWT Authentication",
    "AI Recommendation",],
  },
  {
    id: "robotic-systems-analysis",
    featured: false,
    name: "Performance Analysis of Robotic Systems",
    description:
      "A research-driven evaluation of robotic system performance, examining efficiency, reliability, and optimization opportunities across core subsystems.",
    stack: ["Python", "Data Analysis", "Simulation"],
  },
] as const;

// Reserved for the Coding Profiles section — quantitative practice stats,
// kept separate from the Achievements section (which covers named
// recognitions: Google DGOC, E-Cell, Infosys Pragati).
export const CODING_STATS = [
  { label: "LeetCode Problems Solved", value: "100+" },
  { label: "GeeksforGeeks Problems Solved", value: "56+" },
];

export const CODING_PROFILES = [
  { name: "GitHub", handle: "Muskan-2810", url: "https://github.com/Muskan-2810" },
  {
    name: "LinkedIn",
    handle: "muskan-vishwakarma",
    url: "https://www.linkedin.com/in/muskan-vishwakarma-5b69892b6",
  },
  { name: "LeetCode", handle: "Muskan1985", url: "https://leetcode.com/u/Muskan1985/" },
  {
    name: "GeeksforGeeks",
    handle: "muskanvish",
    url: "https://www.geeksforgeeks.org/profile/muskanvish",
  },
] as const;

export const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Certifications", href: "#certifications" },
  { label: "Achievements", href: "#achievements" },
  { label: "Profiles", href: "#coding-profiles" },
  { label: "Contact", href: "#contact" },
] as const;

// Replace with the real hosted resume PDF path once available (e.g. in /public).
export const RESUME_URL = "/resume-muskan-vishwakarma.pdf";

// Boot-sequence lines shown by the loader — reinforces the "entering an AI
// universe" framing from the very first frame.
export const BOOT_SEQUENCE = [
  "Initializing Neural Network...",
  "Loading Universe...",
  "Calibrating Intelligence...",
  "Entering MuskanVerse...",
];
