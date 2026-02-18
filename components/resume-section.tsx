"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Download, X, Briefcase, GraduationCap, Award } from "lucide-react"

const experience = [
  {
    role: "Senior Full-Stack Developer",
    company: "Freelance / Contract",
    period: "2023 - Present",
    description: "Building scalable web applications for startups and agencies using MERN stack and Next.js. Specialized in e-commerce, SaaS, and Webflow projects.",
  },
  {
    role: "Full-Stack Developer",
    company: "Digital Agency",
    period: "2021 - 2023",
    description: "Led development of 20+ client projects. Introduced component-driven architecture and CI/CD pipelines, reducing deployment time by 60%.",
  },
  {
    role: "Frontend Developer",
    company: "Startup",
    period: "2019 - 2021",
    description: "Built responsive web applications with React and TypeScript. Collaborated with design team to implement pixel-perfect interfaces.",
  },
]

const skills = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
  { category: "Backend", items: ["Node.js", "Express", "MongoDB", "PostgreSQL", "Redis"] },
  { category: "Tools", items: ["Webflow", "Figma", "Git", "Docker", "AWS"] },
  { category: "Methods", items: ["Clean Architecture", "TDD", "CI/CD", "Agile", "System Design"] },
]

export function ResumeSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section id="resume" className="relative py-32 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="text-xs font-mono tracking-widest text-primary uppercase">05</span>
          <div className="h-px flex-1 bg-border" />
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Resume</h2>
          <div className="h-px flex-1 bg-border" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Experience */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Briefcase className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-mono tracking-widest text-primary uppercase">Experience</h3>
            </div>
            <div className="flex flex-col gap-8">
              {experience.map((exp, index) => (
                <motion.div
                  key={exp.role}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="relative pl-6 border-l border-border/50 hover:border-primary/30 transition-colors duration-300"
                >
                  <div className="absolute left-0 top-0 w-2 h-2 rounded-full bg-primary -translate-x-[5px]" />
                  <span className="text-xs font-mono text-muted-foreground/60">{exp.period}</span>
                  <h4 className="text-base font-semibold text-foreground mt-1">{exp.role}</h4>
                  <span className="text-sm text-primary/70">{exp.company}</span>
                  <p className="text-sm text-muted-foreground/70 mt-2 leading-relaxed">{exp.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Award className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-mono tracking-widest text-primary uppercase">Skills</h3>
            </div>
            <div className="flex flex-col gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <span className="text-xs font-mono text-muted-foreground/50 tracking-wider uppercase mb-3 block">
                    {skill.category}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item) => (
                      <span key={item} className="px-3 py-1.5 text-xs font-mono bg-secondary/50 text-secondary-foreground rounded-md border border-border/40 hover:border-primary/30 transition-colors duration-300">
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center gap-4 mt-12"
        >
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 bg-primary text-primary-foreground text-sm font-semibold rounded-xl hover:bg-primary/90 transition-all duration-300 animate-emerald-pulse cursor-pointer"
          >
            View Full Resume
          </button>
          <button className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-muted-foreground border border-border rounded-lg hover:border-primary/40 hover:text-foreground transition-all duration-300 cursor-pointer">
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </motion.div>
      </div>

      {/* Resume Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm overflow-y-auto"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="min-h-screen flex items-start justify-center py-12 px-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full max-w-3xl bg-card border border-border/50 rounded-xl p-8 lg:p-12">
                {/* Close button */}
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="fixed top-6 right-6 p-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  aria-label="Close resume"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Resume header */}
                <div className="text-center mb-10 pb-8 border-b border-border/30">
                  <h2 className="text-3xl font-bold text-foreground">Siyam Mahdi</h2>
                  <p className="text-sm text-primary mt-2">MERN + Next.js Developer / Webflow Expert</p>
                  <p className="text-xs text-muted-foreground/60 mt-2 font-mono">siyam@email.com / github.com/siyam / linkedin.com/in/siyam</p>
                </div>

                {/* Summary */}
                <div className="mb-8">
                  <h3 className="text-xs font-mono tracking-widest text-primary uppercase mb-3">Summary</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Full-stack developer with 5+ years of experience building scalable web applications. Specialized in MERN stack, Next.js, and Webflow. Strong focus on clean architecture, performance optimization, and refined user interactions.
                  </p>
                </div>

                {/* Experience */}
                <div className="mb-8">
                  <h3 className="text-xs font-mono tracking-widest text-primary uppercase mb-4">Experience</h3>
                  <div className="flex flex-col gap-6">
                    {experience.map((exp) => (
                      <div key={exp.role}>
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-semibold text-foreground">{exp.role}</h4>
                          <span className="text-xs font-mono text-muted-foreground/50">{exp.period}</span>
                        </div>
                        <span className="text-xs text-primary/70">{exp.company}</span>
                        <p className="text-xs text-muted-foreground/70 mt-1.5 leading-relaxed">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills in resume */}
                <div className="mb-8">
                  <h3 className="text-xs font-mono tracking-widest text-primary uppercase mb-4">Technical Skills</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {skills.map((skill) => (
                      <div key={skill.category}>
                        <span className="text-xs font-semibold text-foreground block mb-1">{skill.category}</span>
                        <span className="text-xs text-muted-foreground/60">{skill.items.join(", ")}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div>
                  <h3 className="text-xs font-mono tracking-widest text-primary uppercase mb-4">Education</h3>
                  <div className="flex items-center gap-3">
                    <GraduationCap className="w-4 h-4 text-primary/50" />
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">B.Sc. in Computer Science</h4>
                      <span className="text-xs text-muted-foreground/60">University / 2015 - 2019</span>
                    </div>
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
