"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

const navItems = [
  { id: "hero", label: "Origin" },
  { id: "works", label: "Works" },
  { id: "playground", label: "Lab" },
  { id: "gallery", label: "Gallery" },
  { id: "blog", label: "Writing" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
]

interface SideNavigationProps {
  activeSection: string
}

export function SideNavigation({ activeSection }: SideNavigationProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-end gap-3"
      aria-label="Section navigation"
    >
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => scrollToSection(item.id)}
          onMouseEnter={() => setHoveredItem(item.id)}
          onMouseLeave={() => setHoveredItem(null)}
          className="flex items-center gap-3 group cursor-pointer"
          aria-label={`Navigate to ${item.label}`}
        >
          <AnimatePresence>
            {hoveredItem === item.id && (
              <motion.span
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.15 }}
                className="text-xs font-mono tracking-wider text-muted-foreground uppercase"
              >
                {item.label}
              </motion.span>
            )}
          </AnimatePresence>
          <div className="relative flex items-center justify-center">
            <div
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                activeSection === item.id
                  ? "bg-primary scale-125"
                  : "bg-muted-foreground/30 group-hover:bg-muted-foreground/60"
              )}
            />
            {activeSection === item.id && (
              <motion.div
                layoutId="nav-glow"
                className="absolute inset-0 w-2 h-2 rounded-full bg-primary/40 blur-sm"
                transition={{ duration: 0.3 }}
              />
            )}
          </div>
        </button>
      ))}
    </nav>
  )
}
