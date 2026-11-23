export interface ProjectSpec {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  status: "LIVE DEPLOYMENT" | "PRODUCTION ENGINE";
  live: boolean;
  summary: string;
  architecture: string[];
  metrics: { label: string; value: string }[];
  tech: string[];
  accent: "cyan" | "ember" | "slate";
  spanClass: string;
}

export const PROJECTS: ProjectSpec[] = [
  {
    id: "salesphere",
    code: "SYS-01 // COMMERCIAL POS",
    title: "SaleSphere — POS & Billing Engine",
    subtitle: "Real-Time Retail Operations & Direct Thermal Printing",
    status: "LIVE DEPLOYMENT",
    live: true,
    summary:
      "Production point-of-sale and billing engine engineered for high-throughput retail counters. Synchronizes multi-terminal checkout events, executes automated stock reconciliation, and drives 80mm ESC/POS thermal receipt printers directly from the browser via Web Bluetooth.",
    architecture: [
      "React (Vite) SPA with deterministic offline-resilient cart state and sub-100ms barcode entry handling.",
      "Django REST Framework transactional ledger API with atomic PostgreSQL row-level locking to eliminate stock race conditions.",
      "Direct Web Bluetooth ESC/POS command serializer for wireless 80mm thermal receipt printing without native driver overhead.",
      "Hardened Ubuntu VPS deployment behind Nginx reverse proxy with TLS termination and automated PostgreSQL backups.",
    ],
    metrics: [
      { label: "PRINT LATENCY", value: "< 1.2s" },
      { label: "STOCK SYNC", value: "ATOMIC" },
      { label: "THERMAL SPEC", value: "80MM ESC/POS" },
      { label: "RUNTIME", value: "LIVE PROD" },
    ],
    tech: ["React (Vite)", "Django REST", "PostgreSQL", "Nginx", "Web Bluetooth ESC/POS"],
    accent: "cyan",
    spanClass: "lg:col-span-7",
  },
  {
    id: "construction-tracker",
    code: "SYS-02 // FIELD LOGISTICS",
    title: "Construction Inventory & QR Tool Tracker",
    subtitle: "Multi-Site Asset Telemetry & End-to-End Type Safety",
    status: "LIVE DEPLOYMENT",
    live: true,
    summary:
      "Multi-site construction inventory platform unifying heavy tool checkouts, consumables allocation, and QR-coded field verification across distributed project sites with live stock dashboards and role-gated approvals.",
    architecture: [
      "Strict TypeScript + React frontend with shared schema contracts guaranteeing end-to-end type safety across inventory mutations.",
      "QR scan-to-assign workflow tracking custody chain between warehouse depots, site supervisors, and active field crews.",
      "Django + PostgreSQL relational model supporting multi-site transfers, depreciation logs, and low-stock threshold alerts.",
      "Real-time operational stock dashboards designed for rapid auditing under low-bandwidth field conditions.",
    ],
    metrics: [
      { label: "SITE COVERAGE", value: "MULTI-SITE" },
      { label: "ASSET ID", value: "QR MATRIX" },
      { label: "TYPE SAFETY", value: "END-TO-END" },
      { label: "AUDIT TRAIL", value: "100% LOGGED" },
    ],
    tech: ["TypeScript", "React", "Django", "PostgreSQL", "QR Telemetry"],
    accent: "ember",
    spanClass: "lg:col-span-5",
  },
  {
    id: "gps-routing-engine",
    code: "SYS-03 // MOBILE TELEMETRY",
    title: "Mobile GPS & Routing Engine",
    subtitle: "Kalman-Filtered Positioning & High-Efficiency Route Projection",
    status: "PRODUCTION ENGINE",
    live: false,
    summary:
      "Cross-platform React Native telemetry and routing core that unified three competing GPS watchers into a single deterministic pipeline, stabilized noisy coordinates with Kalman filtering, and engineered segment-projection routing to stay cleanly within a 10k/mo API free-tier budget.",
    architecture: [
      "Consolidated 3 competing GPS watchers into a single unified location provider eliminating battery drain and duplicate state dispatches.",
      "Implemented 1D/2D Kalman-Filter smoothing to suppress urban canyon multipath jitter and produce clean heading vectors.",
      "Solved off-route snap inaccuracies via custom geometric segment-projection routing against OSRM & OpenRouteService polylines.",
      "Verified core geospatial math with 36 automated unit tests and automated release pipelines via Expo EAS CI/CD.",
    ],
    metrics: [
      { label: "WATCHERS UNIFIED", value: "3 → 1" },
      { label: "TEST SUITE", value: "36 UNIT TESTS" },
      { label: "API BUDGET", value: "10K/MO OPT" },
      { label: "SIGNAL FILTER", value: "KALMAN" },
    ],
    tech: [
      "React Native",
      "Kalman-Filter Smoothing",
      "OSRM",
      "OpenRouteService API",
      "EAS CI/CD",
    ],
    accent: "slate",
    spanClass: "lg:col-span-12",
  },
];

export const STACK_NODES = [
  {
    id: "react-next",
    label: "React / Next.js",
    layer: "PRESENTATION ENGINE",
    status: "ACTIVE",
    detail: "SSR, App Router, kinetic UI architecture & sub-60ms interactive state.",
  },
  {
    id: "typescript",
    label: "TypeScript",
    layer: "TYPE CONTRACT",
    status: "STRICT",
    detail: "End-to-end strict domain modeling across web, mobile, and API payloads.",
  },
  {
    id: "django-rest",
    label: "Django REST",
    layer: "API & SECURITY CORE",
    status: "HARDENED",
    detail: "Zero-trust REST endpoints, RBAC, and context-aware BOLA middleware.",
  },
  {
    id: "postgresql",
    label: "PostgreSQL",
    layer: "TRANSACTIONAL LEDGER",
    status: "ATOMIC",
    detail: "ACID-compliant schemas, indexed queries, and high-integrity reconciliation.",
  },
  {
    id: "react-native",
    label: "React Native",
    layer: "MOBILE RUNTIME",
    status: "DEPLOYED",
    detail: "Kalman-filtered GPS pipelines, offline-first sync, and EAS CI/CD builds.",
  },
];

export const EDUCATION_CREDENTIALS = [
  {
    code: "CRED-01 // DEGREE",
    title: "BSc (Hons) in Software Engineering",
    institution: "University of Bedfordshire (SLIIT Northern UNI)",
    period: "Coursework Completed: Sep 2026",
    highlight: "Honours Research: Context-Aware Middleware for BOLA Mitigation in RESTful APIs",
  },
  {
    code: "CRED-02 // DIPLOMA",
    title: "Higher Diploma in Information Technology (HDIT)",
    institution: "SLIIT City UNI",
    period: "2024 – 2025",
    highlight: "Full-Stack Software Engineering, Database Systems & Network Architecture",
  },
];

export const CERTIFICATIONS = [
  {
    title: "Career Essentials in Cybersecurity",
    issuer: "Microsoft & LinkedIn",
    tag: "SECURITY CORE",
  },
  {
    title: "The Cybersecurity Threat Landscape",
    issuer: "LinkedIn Learning",
    tag: "THREAT INTEL",
  },
  {
    title: "Python (Basic)",
    issuer: "HackerRank",
    tag: "VERIFIED SKILL",
  },
];

export const FOUNDER_PILLARS = [
  {
    id: "01",
    title: "01. Custom Enterprise Systems",
    headline: "Bespoke Operational Engines Built for Real-World Scale",
    description:
      "We architect mission-critical ERP, POS, and multi-site inventory platforms tailored to exact business workflows — eliminating brittle off-the-shelf compromises.",
    deliverables: [
      "Atomic PostgreSQL & Django REST Backends",
      "Hardware Integrations (ESC/POS, QR, Telemetry)",
      "Self-Hosted VPS & Nginx High-Availability Ops",
    ],
  },
  {
    id: "02",
    title: "02. High-Velocity MVP Engineering",
    headline: "Zero-to-Production Velocity Without Architectural Debt",
    description:
      "Rapidly turning founder visions into commercial-grade web and React Native products with strict TypeScript foundations and automated CI/CD from day one.",
    deliverables: [
      "Next.js App Router & React Native Cross-Platform",
      "Strict Type-Safe API & Schema Contracts",
      "Production Telemetry, Testing & EAS Pipelines",
    ],
  },
  {
    id: "03",
    title: "03. Security-First Architecture",
    headline: "Zero-Trust API Defense Engineered Into Every Layer",
    description:
      "Object-level authorization, hardened infrastructure, and adversarial threat modeling built directly into the SDLC — not bolted on after an incident.",
    deliverables: [
      "Context-Aware BOLA & RBAC Enforcement",
      "Least-Privilege Cloud & API Key Hardening",
      "Linux VPS, SSL/TLS & Reverse Proxy Defense",
    ],
  },
];

export const CYBER_PILLARS = [
  {
    code: "SEC-01",
    title: "Zero-Trust API Hardening & RBAC",
    description:
      "Designing strict object-level ownership checks, scoped JWT/session policies, rate limiting, and deterministic schema validation across RESTful services.",
    tags: ["OWASP API Top 10", "BOLA Defense", "RBAC / ABAC"],
  },
  {
    code: "SEC-02",
    title: "DevOps & Linux VPS Defense",
    description:
      "Hardening Ubuntu production servers behind Nginx and Gunicorn with strict SSL/TLS ciphers, firewall policies, isolated systemd units, and GCP/API key restrictions.",
    tags: ["Nginx", "Gunicorn", "SSL/TLS", "GCP Restrictions"],
  },
  {
    code: "SEC-03",
    title: "Adversarial Thinking & Threat Modeling",
    description:
      "Deconstructing authentication flows, multi-tenant boundaries, and privilege escalation vectors during design reviews to neutralize vulnerabilities before code ships.",
    tags: ["STRIDE", "Attack Surface", "API Auditing"],
  },
];

export const CONTACT_CHANNELS = [
  {
    id: "email",
    label: "DIRECT EMAIL",
    value: "sabeesan@ultrakerb.com",
    copyValue: "sabeesan@ultrakerb.com",
    href: "mailto:sabeesan@ultrakerb.com",
  },
  {
    id: "linkedin",
    label: "LINKEDIN UPLINK",
    value: "linkedin.com/in/gnanavel-sabeesan",
    copyValue: "https://www.linkedin.com/in/gnanavel-sabeesan",
    href: "https://www.linkedin.com/in/gnanavel-sabeesan",
  },
  {
    id: "github",
    label: "GITHUB REPOSITORY",
    value: "github.com/sabeesan",
    copyValue: "https://github.com/sabeesan",
    href: "https://github.com/sabeesan",
  },
];
