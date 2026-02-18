"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Play, Sparkles, Layers, Zap, MousePointer } from "lucide-react"

const experiments = [
  {
    id: "exp-1",
    title: "Fluid Hover States",
    description: "Magnetic cursor tracking with spring physics for interactive UI elements.",
    icon: MousePointer,
    category: "Interaction",
    color: "text-primary",
  },
  {
    id: "exp-2",
    title: "Morphing Layouts",
    description: "Shared layout animations between disparate UI states with smooth interpolation.",
    icon: Layers,
    category: "Animation",
    color: "text-accent-foreground",
  },
  {
    id: "exp-3",
    title: "Particle System",
    description: "WebGL-powered particle effects that respond to user input and scroll position.",
    icon: Sparkles,
    category: "WebGL",
    color: "text-primary",
  },
  {
    id: "exp-4",
    title: "Micro Transitions",
    description: "Choreographed state transitions with staggered enter/exit animations.",
    icon: Zap,
    category: "Motion",
    color: "text-accent-foreground",
  },
]

export function PlaygroundSection() {
  const [activeExperiment, setActiveExperiment] = useState<string | null>(null)

  return (
    <section id="playground" className="relative py-32 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-6"
        >
          <span className="text-xs font-mono tracking-widest text-primary uppercase">02</span>
          <div className="h-px flex-1 bg-border" />
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Lab / Playground</h2>
          <div className="h-px flex-1 bg-border" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-muted-foreground text-sm max-w-xl mb-16"
        >
          Experiments, UI explorations, and interaction prototypes. Where ideas get tested before shipping.
        </motion.p>

        {/* Experiments grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {experiments.map((exp, index) => {
            const Icon = exp.icon
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setActiveExperiment(exp.id)}
                onMouseLeave={() => setActiveExperiment(null)}
                className="group relative p-6 lg:p-8 bg-card/30 border border-border/40 rounded-xl hover:border-primary/30 transition-all duration-500 cursor-pointer overflow-hidden"
              >
                {/* Hover glow */}
                {activeExperiment === exp.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"
                  />
                )}
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2.5 bg-secondary/60 rounded-lg border border-border/30">
                      <Icon className={`w-5 h-5 ${exp.color}`} />
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground/60 tracking-widest uppercase">
                      {exp.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {exp.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {exp.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs font-mono text-primary/60 group-hover:text-primary transition-colors duration-300">
                    <Play className="w-3 h-3" />
                    <span>Run experiment</span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
