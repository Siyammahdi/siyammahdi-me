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
  Globe,
  Download,
} from "lucide-react"
import { blogPosts } from "@/lib/blog-data"
import { resources } from "@/lib/resources-data"
import { projects } from "@/lib/works-data"

type SearchItem = {
  id: string
  label: string
  description: string
  icon: React.ElementType
  category: string
  action: string
  searchableText: string
}

function buildSearchItems(): SearchItem[] {
  const items: SearchItem[] = []

  // Pages — include keywords so "blog", "articles", "resources", "tools" etc. match
  items.push({
    id: "page-blog",
    label: "Blog",
    description: "Read all articles and technical writing",
    icon: BookOpen,
    category: "Pages",
    action: "/blog",
    searchableText: "blog articles technical writing read posts",
  })
  items.push({
    id: "page-resources",
    label: "Resource Hub",
    description: "Creative tools, libraries, and learning materials",
    icon: Download,
    category: "Pages",
    action: "/resources",
    searchableText: "resources hub tools libraries learning materials creative design development inspiration",
  })

  // Sections — rich text so section names and related words match
  const sections: { id: string; label: string; description: string; icon: React.ElementType; action: string; searchableText: string }[] = [
    { id: "nav-works", label: "Works", description: "View selected projects", icon: Briefcase, action: "#works", searchableText: "works projects portfolio selected case studies" },
    { id: "nav-playground", label: "Lab / Playground", description: "Experiments and UI explorations", icon: Layers, action: "#playground", searchableText: "lab playground experiments UI explorations" },
    { id: "nav-gallery", label: "Photo Gallery", description: "Personal moments", icon: ImageIcon, action: "#gallery", searchableText: "gallery photos images personal moments" },
    { id: "nav-blog", label: "Writing", description: "Technical articles preview", icon: BookOpen, action: "#blog", searchableText: "writing blog articles technical preview" },
    { id: "nav-resume", label: "Resume", description: "Experience and skills", icon: User, action: "#resume", searchableText: "resume experience skills work history education" },
    { id: "nav-contact", label: "Contact", description: "Get in touch", icon: Mail, action: "#contact", searchableText: "contact get in touch mail email hire" },
  ]
  sections.forEach((s) => items.push({ ...s, category: "Sections" }))

  // Works — full project text (description, problem, solution, stack, etc.)
  projects.forEach((p) => {
    const searchableText = [
      p.title,
      p.category,
      p.description,
      p.problem,
      p.solution,
      p.architecture,
      p.stack.join(" "),
      p.performance.join(" "),
      p.year,
    ].join(" ")
    items.push({
      id: `work-${p.id}`,
      label: p.title,
      description: p.description,
      icon: Briefcase,
      category: "Works",
      action: "#works",
      searchableText,
    })
  })

  // Blog — full post text (title, excerpt, content, category, tags)
  blogPosts.forEach((p) => {
    const searchableText = [p.title, p.excerpt, p.content, p.category, p.tags.join(" ")].join(" ")
    items.push({
      id: `blog-${p.slug}`,
      label: p.title,
      description: p.excerpt,
      icon: FileText,
      category: "Articles",
      action: `/blog/${p.slug}`,
      searchableText,
    })
  })

  // Resources — full text (title, description, category, tags)
  resources.forEach((r) => {
    const searchableText = [r.title, r.description, r.category, r.tags.join(" ")].join(" ")
    items.push({
      id: `res-${r.title.toLowerCase().replace(/\s+/g, "-")}`,
      label: r.title,
      description: r.description,
      icon: Globe,
      category: "Resources",
      action: "/resources",
      searchableText,
    })
  })

  return items
}

const searchItems = buildSearchItems()

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const router = useRouter()

  const filteredItems = searchItems.filter((item) =>
    item.searchableText.toLowerCase().includes(query.toLowerCase())
  )

  const groupedItems = filteredItems.reduce<Record<string, SearchItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = []
    acc[item.category].push(item)
    return acc
  }, {})

  const handleSelect = useCallback((item: SearchItem) => {
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

  useEffect(() => {
    const open = () => setIsOpen(true)
    window.addEventListener("open-command-palette", open)
    return () => window.removeEventListener("open-command-palette", open)
  }, [])

  return (
    <>
      {/* Trigger — visible on all devices (drawer overlay covers it when open) */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-[99] flex items-center gap-2 px-3 py-2.5 bg-card/90 backdrop-blur-sm border border-border/60 rounded-lg text-xs font-mono text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-card transition-all duration-300 cursor-pointer shadow-sm"
        aria-label="Open search (⌘K)"
      >
        <Search className="w-4 h-4 shrink-0" />
        <span className="hidden sm:inline">Search</span>
        <kbd className="hidden sm:inline text-[10px] px-1.5 py-0.5 rounded bg-muted/60 border border-border/40">⌘K</kbd>
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
