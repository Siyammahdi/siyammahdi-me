"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { X, ExternalLink, Github, ArrowUpRight } from "lucide-react"
import { projects, type Project } from "@/lib/works-data"

export function WorksSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const modalNode = (
    <AnimatePresence>
      {selectedProject && (
        <motion.div
          key="works-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] pointer-events-none"
        >
          {/* Backdrop — blocks page gradients (z-[99]); click to close */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm pointer-events-auto cursor-default"
            onClick={() => setSelectedProject(null)}
            aria-hidden
          />
          {/* Modal content — z-[101] */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="absolute inset-4 sm:inset-8 lg:inset-16 pointer-events-none flex items-center justify-center z-[101]"
          >
            <div
              className="pointer-events-auto w-full max-w-6xl max-h-[85vh] flex flex-col rounded-2xl overflow-hidden bg-background/98 border border-border/60 shadow-[0_18px_60px_rgba(0,0,0,0.55)]"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal
              aria-labelledby="project-title"
            >
              <div className="flex items-start justify-between gap-4 px-6 pt-5 sm:px-8 sm:pt-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono text-primary tracking-widest">{selectedProject.year}</span>
                    <span className="text-muted-foreground/50">/</span>
                    <span className="text-xs font-mono text-muted-foreground tracking-wider">{selectedProject.category}</span>
                  </div>
                  <h2 id="project-title" className="text-3xl sm:text-4xl font-bold text-foreground mb-1 tracking-tight">
                    {selectedProject.title}
                  </h2>
                  <p className="text-base text-muted-foreground max-w-2xl leading-relaxed mb-2">
                    {selectedProject.description}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer shrink-0"
                  aria-label="Close project"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto overscroll-contain">
                <div className="px-6 pb-6 pt-4 sm:px-8 sm:pb-8 sm:pt-4 lg:px-10 lg:pb-10 lg:pt-4 flex flex-col gap-8">
                  {/* Gallery-style media strip */}
                  <div>
                    <h3 className="text-[11px] font-mono tracking-widest text-primary uppercase mb-3">Gallery</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {(selectedProject.gallery ?? [
                        selectedProject.thumbnail,
                        selectedProject.thumbnail,
                        selectedProject.thumbnail,
                      ]).map((src, index) => (
                        <div
                          key={`${src}-${index}`}
                          className="relative aspect-video w-full rounded-xl overflow-hidden border border-border/50 bg-muted/20"
                        >
                          <Image
                            src={src}
                            alt="Project media"
                            fill
                            className="object-cover"
                            sizes="(max-width: 896px) 100vw, 896px"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col gap-2">
                      <h3 className="text-[11px] font-mono tracking-widest text-primary uppercase">Problem</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{selectedProject.problem}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-[11px] font-mono tracking-widest text-primary uppercase">Solution</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{selectedProject.solution}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-[11px] font-mono tracking-widest text-primary uppercase">Architecture</h3>
                      <p className="text-sm font-mono text-muted-foreground leading-relaxed">{selectedProject.architecture}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-[11px] font-mono tracking-widest text-primary uppercase mb-3">Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 text-xs font-mono bg-secondary/50 text-secondary-foreground rounded-lg border border-border/50"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-[11px] font-mono tracking-widest text-primary uppercase mb-3">Highlights</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {selectedProject.performance.map((metric) => (
                        <div key={metric} className="p-4 bg-secondary/20 border border-border/40 rounded-xl">
                          <span className="text-sm font-mono text-foreground">{metric}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2 pb-2">
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-xl hover:bg-primary/90 transition-all duration-300 cursor-pointer"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Project
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-muted-foreground border border-border rounded-xl hover:border-primary/40 hover:text-foreground transition-all duration-300 cursor-pointer"
                    >
                      <Github className="w-4 h-4" />
                      Source Code
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <section id="works" className="relative py-32 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="text-xs font-mono tracking-widest text-primary uppercase">01</span>
          <div className="h-px flex-1 bg-border" />
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">Selected Works</h2>
          <div className="h-px flex-1 bg-border" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project, index) => (
            <motion.button
              key={project.id}
              type="button"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.07 }}
              onClick={() => setSelectedProject(project)}
              className="group relative text-left rounded-2xl overflow-hidden bg-card/40 border border-border/50 hover:border-primary/30 hover:bg-card/60 transition-all duration-500 cursor-pointer shadow-md hover:shadow-lg hover:shadow-primary/5"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
              <div className="relative z-10 flex gap-4 p-5 lg:p-6">
                {/* Creative small thumbnail — rounded, not dominant */}
                <div className="relative shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden border border-border/50 bg-muted/30 ring-2 ring-transparent group-hover:ring-primary/20 transition-all duration-300">
                  <Image
                    src={project.thumbnail}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="112px"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-40 group-hover:opacity-20 transition-opacity duration-300`} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono text-muted-foreground tracking-wider">{project.year}</span>
                    <span className="text-[10px] font-mono text-primary/80 px-2 py-0.5 border border-primary/20 rounded-md shrink-0">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-lg lg:text-xl font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors duration-300 truncate">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.slice(0, 3).map((tech) => (
                      <span key={tech} className="text-[10px] font-mono text-muted-foreground/70 px-2 py-0.5 bg-secondary/40 rounded border border-border/30">
                        {tech}
                      </span>
                    ))}
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-mono text-primary/80">
                      View
                      <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Modal rendered in portal so z-[100]/z-[101] sit above page gradients (z-[99]) */}
      {mounted &&
        typeof document !== "undefined" &&
        createPortal(modalNode, document.body)}
    </section>
  )
}
