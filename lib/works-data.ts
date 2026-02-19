export type Project = {
  id: string
  title: string
  category: string
  description: string
  problem: string
  solution: string
  architecture: string
  stack: string[]
  performance: string[]
  year: string
  color: string
  thumbnail: string
  gallery?: string[]
}

export const projects: Project[] = [
  {
    id: "project-1",
    title: "Apex Commerce",
    category: "Full-Stack Platform",
    description: "Scalable e-commerce platform with real-time inventory and headless CMS.",
    problem: "Legacy monolith couldn't handle traffic spikes during sales events, leading to downtime and lost revenue.",
    solution: "Rebuilt with microservices architecture using Next.js + Node.js + MongoDB, with Redis caching and Stripe integration.",
    architecture: "Next.js App Router / Node.js REST API / MongoDB Atlas / Redis / Vercel Edge",
    stack: ["Next.js", "Node.js", "MongoDB", "Redis", "Stripe", "Vercel"],
    performance: ["99.9% uptime", "< 200ms TTFB", "40% conversion increase"],
    year: "2025",
    color: "from-primary/10 to-transparent",
    thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=800&q=80",
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=800&q=80",
    ],
  },
  {
    id: "project-2",
    title: "NeuroFlow",
    category: "SaaS Dashboard",
    description: "AI-powered project management dashboard with real-time collaboration.",
    problem: "Teams struggled with context switching between tools, losing productivity and project visibility.",
    solution: "Unified dashboard combining task management, analytics, and AI-assisted planning in one interface.",
    architecture: "Next.js / Express.js / PostgreSQL / WebSocket / OpenAI API",
    stack: ["React", "TypeScript", "Express.js", "PostgreSQL", "WebSocket"],
    performance: ["50% faster planning", "Real-time sync < 50ms", "10k+ active users"],
    year: "2024",
    color: "from-accent/10 to-transparent",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80",
      "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?w=800&q=80",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=80",
    ],
  },
  {
    id: "project-3",
    title: "Meridian Studio",
    category: "Webflow + CMS",
    description: "Premium creative agency website with dynamic content management.",
    problem: "Agency needed a site that felt custom-coded but could be managed by non-technical team members.",
    solution: "Designed and built in Webflow with custom interactions, CMS collections, and automated workflows.",
    architecture: "Webflow / Custom CSS / Zapier / Airtable CMS",
    stack: ["Webflow", "Custom CSS", "JavaScript", "Zapier", "Airtable"],
    performance: ["95+ Lighthouse score", "60% more inquiries", "0 developer maintenance"],
    year: "2024",
    color: "from-primary/10 to-transparent",
    thumbnail: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=800&q=80",
      "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=800&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    ],
  },
  {
    id: "project-4",
    title: "VaultSync",
    category: "API Platform",
    description: "Encrypted file sync and sharing platform for enterprise teams.",
    problem: "Enterprise teams needed secure, self-hosted file sharing that integrated with existing auth systems.",
    solution: "End-to-end encrypted sync with SSO integration, granular permissions, and audit logging.",
    architecture: "Next.js / Node.js / AWS S3 / MongoDB / Auth0",
    stack: ["Next.js", "Node.js", "AWS S3", "MongoDB", "Auth0"],
    performance: ["256-bit encryption", "99.99% data integrity", "SOC 2 compliant"],
    year: "2023",
    color: "from-accent/10 to-transparent",
    thumbnail: "https://images.unsplash.com/photo-1633265486064-086b21a93951?w=400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=80",
      "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=800&q=80",
    ],
  },
]
