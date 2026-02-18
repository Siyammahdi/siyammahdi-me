"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ExternalLink, Github } from "lucide-react"

const projects = [
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
  },
]

export function WorksSection() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)

  return (
    <section id="works" className="relative py-32 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="text-xs font-mono tracking-widest text-primary uppercase">01</span>
          <div className="h-px flex-1 bg-border" />
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Selected Works</h2>
          <div className="h-px flex-1 bg-border" />
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, index) => (
            <motion.button
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedProject(project)}
              className="group relative text-left p-6 lg:p-8 bg-card/50 border border-border/50 rounded-xl hover:border-primary/30 hover:bg-card/80 transition-all duration-500 cursor-pointer"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-muted-foreground tracking-wider">{project.year}</span>
                  <span className="text-xs font-mono text-primary/70 px-2 py-1 border border-primary/20 rounded-md">
                    {project.category}
                  </span>
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.slice(0, 4).map((tech) => (
                    <span key={tech} className="text-[10px] font-mono text-muted-foreground/60 px-2 py-0.5 bg-secondary/40 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm overflow-y-auto"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="min-h-screen flex items-start justify-center py-12 px-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full max-w-4xl">
                {/* Close button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="fixed top-6 right-6 p-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  aria-label="Close project details"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Modal content */}
                <div className="flex flex-col gap-12">
                  {/* Header */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs font-mono text-primary tracking-widest">{selectedProject.year}</span>
                      <span className="text-xs font-mono text-muted-foreground">/</span>
                      <span className="text-xs font-mono text-muted-foreground tracking-wider">{selectedProject.category}</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">{selectedProject.title}</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">{selectedProject.description}</p>
                  </div>

                  {/* Case study */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="flex flex-col gap-3">
                      <h3 className="text-xs font-mono tracking-widest text-primary uppercase">Problem</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{selectedProject.problem}</p>
                    </div>
                    <div className="flex flex-col gap-3">
                      <h3 className="text-xs font-mono tracking-widest text-primary uppercase">Solution</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{selectedProject.solution}</p>
                    </div>
                    <div className="flex flex-col gap-3">
                      <h3 className="text-xs font-mono tracking-widest text-primary uppercase">Architecture</h3>
                      <p className="text-sm font-mono text-muted-foreground leading-relaxed">{selectedProject.architecture}</p>
                    </div>
                  </div>

                  {/* Tech stack */}
                  <div>
                    <h3 className="text-xs font-mono tracking-widest text-primary uppercase mb-4">Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.stack.map((tech) => (
                        <span key={tech} className="px-3 py-1.5 text-xs font-mono bg-secondary text-secondary-foreground rounded-md border border-border/50">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Performance */}
                  <div>
                    <h3 className="text-xs font-mono tracking-widest text-primary uppercase mb-4">Performance</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {selectedProject.performance.map((metric) => (
                        <div key={metric} className="p-4 bg-secondary/30 border border-border/30 rounded-lg">
                          <span className="text-sm font-mono text-foreground">{metric}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4 pb-8">
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-xl hover:bg-primary/90 transition-all duration-300 cursor-pointer">
                      <ExternalLink className="w-4 h-4" />
                      Live Project
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-muted-foreground border border-border rounded-xl hover:border-primary/40 hover:text-foreground transition-all duration-300 cursor-pointer">
                      <Github className="w-4 h-4" />
                      Source Code
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
