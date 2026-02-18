"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  FileText,
  Briefcase,
  User,
  Mail,
  BookOpen,
  Layers,
  Image as ImageIcon,
  ArrowRight,
  Command,
  Globe,
  Download,
} from "lucide-react"

const searchItems = [
  // Pages
  { id: "page-blog", label: "Blog", description: "Read all articles and technical writing", icon: BookOpen, category: "Pages", action: "/blog" },
  { id: "page-resources", label: "Resource Hub", description: "Creative tools, libraries, and learning materials", icon: Download, category: "Pages", action: "/resources" },
  // Navigation
  { id: "nav-works", label: "Works", description: "View selected projects", icon: Briefcase, category: "Sections", action: "#works" },
  { id: "nav-playground", label: "Lab / Playground", description: "Experiments and UI explorations", icon: Layers, category: "Sections", action: "#playground" },
  { id: "nav-gallery", label: "Photo Gallery", description: "Personal moments", icon: ImageIcon, category: "Sections", action: "#gallery" },
  { id: "nav-blog", label: "Writing", description: "Technical articles preview", icon: BookOpen, category: "Sections", action: "#blog" },
  { id: "nav-resume", label: "Resume", description: "Experience and skills", icon: User, category: "Sections", action: "#resume" },
  { id: "nav-contact", label: "Contact", description: "Get in touch", icon: Mail, category: "Sections", action: "#contact" },
  // Works
  { id: "work-apex", label: "Apex Commerce", description: "Full-stack e-commerce platform", icon: Briefcase, category: "Works", action: "#works" },
  { id: "work-neuro", label: "NeuroFlow", description: "AI-powered SaaS dashboard", icon: Briefcase, category: "Works", action: "#works" },
  { id: "work-meridian", label: "Meridian Studio", description: "Webflow + CMS project", icon: Briefcase, category: "Works", action: "#works" },
  { id: "work-vault", label: "VaultSync", description: "Encrypted file sync platform", icon: Briefcase, category: "Works", action: "#works" },
  // Blog Articles
  { id: "blog-api", label: "Building Scalable APIs with Node.js", description: "Backend architecture deep dive", icon: FileText, category: "Articles", action: "/blog/building-scalable-apis-nodejs-mongodb" },
  { id: "blog-next", label: "Advanced Next.js Patterns", description: "Production patterns and optimization", icon: FileText, category: "Articles", action: "/blog/advanced-nextjs-patterns-production" },
  { id: "blog-webflow", label: "Webflow for Developers", description: "Beyond the basics", icon: FileText, category: "Articles", action: "/blog/webflow-for-developers-beyond-basics" },
  { id: "blog-perf", label: "Performance Optimization Guide", description: "60 to 100 Lighthouse score", icon: FileText, category: "Articles", action: "/blog/performance-optimization-60-to-100-lighthouse" },
  { id: "blog-arch", label: "Clean Architecture in MERN", description: "Structuring large-scale applications", icon: FileText, category: "Articles", action: "/blog/clean-architecture-mern-stack" },
  { id: "blog-ts", label: "TypeScript Patterns That Matter", description: "Advanced type-level programming", icon: FileText, category: "Articles", action: "/blog/typescript-patterns-real-world" },
  // Resources
  { id: "res-tailwind", label: "Tailwind CSS", description: "Utility-first CSS framework", icon: Globe, category: "Resources", action: "/resources" },
  { id: "res-shadcn", label: "Shadcn UI", description: "Beautiful component library", icon: Globe, category: "Resources", action: "/resources" },
  { id: "res-framer", label: "Framer Motion", description: "Animation library for React", icon: Globe, category: "Resources", action: "/resources" },
]

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const router = useRouter()

  const filteredItems = searchItems.filter(
    (item) =>
      item.label.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  )

  const groupedItems = filteredItems.reduce<Record<string, typeof searchItems>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = []
    acc[item.category].push(item)
    return acc
  }, {})

  const handleSelect = useCallback((item: (typeof searchItems)[0]) => {
    setIsOpen(false)
    setQuery("")
    if (item.action.startsWith("/")) {
      router.push(item.action)
    } else if (item.action.startsWith("#")) {
      const sectionId = item.action.slice(1)
      const el = document.getElementById(sectionId)
      if (el) {
        el.scrollIntoView({ behavior: "smooth" })
      } else {
        router.push(`/${item.action}`)
      }
    }
  }, [router])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      }
      if (e.key === "Escape") {
        setIsOpen(false)
        setQuery("")
      }
      if (isOpen) {
        if (e.key === "ArrowDown") {
          e.preventDefault()
          setSelectedIndex((prev) => Math.min(prev + 1, filteredItems.length - 1))
        }
        if (e.key === "ArrowUp") {
          e.preventDefault()
          setSelectedIndex((prev) => Math.max(prev - 1, 0))
        }
        if (e.key === "Enter" && filteredItems[selectedIndex]) {
          e.preventDefault()
          handleSelect(filteredItems[selectedIndex])
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, filteredItems, selectedIndex, handleSelect])

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  return (
    <>
      {/* Trigger hint */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-3 py-2 bg-card/80 backdrop-blur-sm border border-border/50 rounded-lg text-xs font-mono text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all duration-300 cursor-pointer"
        aria-label="Open command palette"
      >
        <Command className="w-3 h-3" />
        <span className="hidden sm:inline">K</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[200] bg-background/80 backdrop-blur-sm flex items-start justify-center pt-[15vh]"
            onClick={() => { setIsOpen(false); setQuery("") }}
          >
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-xl bg-card border border-border/60 rounded-xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-border/30">
                <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                <input
                  type="text"
                  placeholder="Search pages, articles, resources..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 outline-none"
                  autoFocus
                />
                <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground/40 bg-secondary/50 rounded border border-border/30">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div className="max-h-[50vh] overflow-y-auto py-2">
                {filteredItems.length === 0 ? (
                  <div className="px-4 py-8 text-center">
                    <p className="text-sm text-muted-foreground/50">No results found</p>
                  </div>
                ) : (
                  Object.entries(groupedItems).map(([category, items]) => (
                    <div key={category} className="mb-2">
                      <div className="px-4 py-1.5">
                        <span className="text-[10px] font-mono tracking-widest text-muted-foreground/40 uppercase">
                          {category}
                        </span>
                      </div>
                      {items.map((item) => {
                        const Icon = item.icon
                        const globalIndex = filteredItems.indexOf(item)
                        const isSelected = globalIndex === selectedIndex
                        return (
                          <button
                            key={item.id}
                            onClick={() => handleSelect(item)}
                            onMouseEnter={() => setSelectedIndex(globalIndex)}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors duration-100 cursor-pointer ${
                              isSelected
                                ? "bg-primary/10 text-foreground"
                                : "text-muted-foreground hover:bg-secondary/30"
                            }`}
                          >
                            <Icon className={`w-4 h-4 shrink-0 ${isSelected ? "text-primary" : "text-muted-foreground/50"}`} />
                            <div className="flex-1 min-w-0">
                              <span className="text-sm font-medium block truncate">{item.label}</span>
                              <span className="text-xs text-muted-foreground/50 block truncate">{item.description}</span>
                            </div>
                            {isSelected && <ArrowRight className="w-3 h-3 text-primary shrink-0" />}
                          </button>
                        )
                      })}
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center gap-4 px-4 py-2.5 border-t border-border/30 text-[10px] font-mono text-muted-foreground/30">
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 bg-secondary/40 rounded border border-border/20">{"↑"}</kbd>
                  <kbd className="px-1 py-0.5 bg-secondary/40 rounded border border-border/20">{"↓"}</kbd>
                  Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-secondary/40 rounded border border-border/20">{"↵"}</kbd>
                  Select
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
