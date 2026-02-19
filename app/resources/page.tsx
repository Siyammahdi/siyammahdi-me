"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowUpRight,
  Search,
  Palette,
  Code2,
  Figma,
  BookOpen,
  Wrench,
  Layers,
  Zap,
  Globe,
  Video,
  FileText,
  Download,
  Star,
} from "lucide-react"
import { AnimatedGrid } from "@/components/animated-grid"
import { resources, allCategories, type ResourceCategory } from "@/lib/resources-data"

const categoryIcons: Record<ResourceCategory, React.ElementType> = {
  Design: Palette,
  Development: Code2,
  Tools: Wrench,
  Learning: BookOpen,
  Templates: Layers,
  Inspiration: Zap,
}

const categoryColors: Record<ResourceCategory, string> = {
  Design: "text-pink-400/80 bg-pink-400/10 border-pink-400/20",
  Development: "text-primary bg-primary/10 border-primary/20",
  Tools: "text-amber-400/80 bg-amber-400/10 border-amber-400/20",
  Learning: "text-sky-400/80 bg-sky-400/10 border-sky-400/20",
  Templates: "text-violet-400/80 bg-violet-400/10 border-violet-400/20",
  Inspiration: "text-orange-400/80 bg-orange-400/10 border-orange-400/20",
}

const typeIcons: Record<string, React.ElementType> = {
  tool: Wrench,
  article: FileText,
  template: Layers,
  course: Video,
  library: Code2,
  collection: Globe,
}

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState<"All" | ResourceCategory>("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filtered = resources.filter((r) => {
    const matchCategory = activeCategory === "All" || r.category === activeCategory
    const matchSearch =
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchCategory && matchSearch
  })

  const featured = resources.filter((r) => r.featured)

  return (
    <main className="relative min-h-screen">
      <AnimatedGrid />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12 py-12">
        {/* Back */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-300 mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <Download className="w-5 h-5 text-primary" />
            <span className="text-xs font-mono tracking-widest text-primary uppercase">Resource Hub</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 text-balance">
            Creative <span className="text-primary">Resources</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            A curated collection of tools, libraries, design resources, and learning materials
            that power modern web development. Handpicked and regularly updated.
          </p>
        </motion.div>

        {/* Search + Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col gap-4 mb-12"
        >
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-card/60 border border-border/50 rounded-xl text-sm text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-primary/40 transition-colors duration-300"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory("All")}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg border transition-all duration-300 cursor-pointer ${
                activeCategory === "All"
                  ? "bg-primary/15 border-primary/40 text-primary"
                  : "bg-card/40 border-border/40 text-muted-foreground hover:border-primary/20"
              }`}
            >
              <Globe className="w-3 h-3" />
              All
            </button>
            {allCategories.map((cat) => {
              const Icon = categoryIcons[cat]
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg border transition-all duration-300 cursor-pointer ${
                    activeCategory === cat
                      ? "bg-primary/15 border-primary/40 text-primary"
                      : "bg-card/40 border-border/40 text-muted-foreground hover:border-primary/20"
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  {cat}
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* Featured Resources */}
        {activeCategory === "All" && searchQuery === "" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mb-16"
          >
            <div className="flex items-center gap-2 mb-6">
              <Star className="w-4 h-4 text-primary/60" />
              <h2 className="text-xs font-mono tracking-widest text-muted-foreground/50 uppercase">Featured Resources</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {featured.map((resource, i) => {
                const CatIcon = categoryIcons[resource.category]
                return (
                  <motion.a
                    key={resource.title}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                    className="group relative p-5 bg-card/50 border border-border/50 rounded-xl hover:border-primary/30 hover:bg-card/80 transition-all duration-500"
                  >
                    <div className="absolute inset-0 bg-primary/[0.03] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <div className={`p-2 rounded-lg border ${categoryColors[resource.category]}`}>
                          <CatIcon className="w-4 h-4" />
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                      <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors duration-300 mb-1.5">
                        {resource.title}
                      </h3>
                      <p className="text-xs text-muted-foreground/60 leading-relaxed line-clamp-2">
                        {resource.description}
                      </p>
                    </div>
                  </motion.a>
                )
              })}
            </div>
          </motion.div>
        )}

        {/* All Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-xs font-mono tracking-widest text-muted-foreground/50 uppercase mb-6">
            {activeCategory === "All" ? "All Resources" : activeCategory} ({filtered.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((resource, index) => {
              const TypeIcon = typeIcons[resource.type] || Globe
              const CatIcon = categoryIcons[resource.category]
              return (
                <motion.a
                  key={resource.title}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.03 }}
                  className="group relative p-5 bg-card/30 border border-border/30 rounded-xl hover:border-primary/20 hover:bg-card/50 transition-all duration-500"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-md border ${categoryColors[resource.category]}`}>
                        <CatIcon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[10px] font-mono text-muted-foreground/40 uppercase tracking-wider">{resource.type}</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground/20 group-hover:text-primary transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-300 mb-1.5">
                    {resource.title}
                  </h3>
                  <p className="text-xs text-muted-foreground/50 leading-relaxed line-clamp-2 mb-3">
                    {resource.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {resource.tags.map((tag) => (
                      <span key={tag} className="text-[9px] font-mono text-muted-foreground/40 px-1.5 py-0.5 bg-secondary/30 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.a>
              )
            })}
          </div>
          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-muted-foreground/50">No resources found matching your search.</p>
            </div>
          )}
        </motion.div>

        {/* Contribution CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 text-center p-8 bg-card/30 border border-border/30 rounded-2xl"
        >
          <h3 className="text-lg font-bold text-foreground mb-2">Know a great resource?</h3>
          <p className="text-sm text-muted-foreground/60 mb-6 max-w-md mx-auto">
            This collection is always growing. If you have a tool, library, or resource that should be here,
            reach out and share it.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm font-semibold rounded-xl hover:bg-primary/90 transition-all duration-300"
          >
            Suggest a Resource
          </Link>
        </motion.div>
      </div>
    </main>
  )
}
