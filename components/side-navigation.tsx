"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import {
  Search,
  Home,
  Briefcase,
  FlaskConical,
  Images,
  BookOpen,
  FolderOpen,
  User,
  Mail,
  Menu,
  X,
  ChevronRight,
} from "lucide-react"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

type NavKind = "section" | "page"

const navItems: { id: string; label: string; href?: string; kind: NavKind; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "hero", label: "Origin", kind: "section", icon: Home },
  { id: "works", label: "Works", kind: "section", icon: Briefcase },
  { id: "playground", label: "Lab", kind: "section", icon: FlaskConical },
  { id: "gallery", label: "Gallery", kind: "section", icon: Images },
  { id: "blog", label: "Blog", href: "/blog", kind: "page", icon: BookOpen },
  { id: "resources", label: "Resources", href: "/resources", kind: "page", icon: FolderOpen },
  { id: "resume", label: "Resume", kind: "section", icon: User },
  { id: "contact", label: "Contact", kind: "section", icon: Mail },
]

interface SideNavigationProps {
  activeSection?: string
}

function openSearch() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-command-palette"))
  }
}

export function SideNavigation({ activeSection }: SideNavigationProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const isActive = (item: (typeof navItems)[0]) => {
    if (item.kind === "page" && item.href) {
      if (item.id === "blog") return pathname?.startsWith("/blog")
      if (item.id === "resources") return pathname?.startsWith("/resources")
    }
    // Only check activeSection if we're on the home page
    if (pathname === "/" && activeSection) {
      return activeSection === item.id
    }
    return false
  }

  const scrollToSection = (id: string) => {
    setDrawerOpen(false)
    const isHomePage = pathname === "/"
    if (!isHomePage) {
      // Navigate to home first, then scroll to section
      router.push(`/#${id}`)
      // After navigation, scroll will happen via hash
      return
    }
    setTimeout(() => {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: "smooth" })
      }
    }, 150)
  }

  const handleNavClick = (item: (typeof navItems)[0]) => {
    if (item.kind === "page" && item.href) {
      setDrawerOpen(false)
      return
    }
    scrollToSection(item.id)
  }

  useEffect(() => {
    if (typeof window === "undefined") return
    window.dispatchEvent(new CustomEvent(drawerOpen ? "nav-drawer-open" : "nav-drawer-close"))
  }, [drawerOpen])

  const sections = navItems.filter((i) => i.kind === "section")
  const pages = navItems.filter((i) => i.kind === "page")

  return (
    <>
      {/* ——— Desktop: vertical rail with On this page / Pages labels (xl only) ——— */}
      <nav
        className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col items-start gap-0.5"
        aria-label="Section and page navigation"
      >
        <div className="absolute right-[0.875rem] top-0 bottom-0 w-px bg-border/40 rounded-full" aria-hidden />

        {/* On this page */}
        <div className="pr-1 pl-4 pb-0.5">
          <span className="text-[10px] font-mono tracking-widest text-primary/70 uppercase">On this page</span>
        </div>
        {sections.map((item) => {
          const active = isActive(item)
          const hovered = hoveredId === item.id
          const content = (
            <>
              <span className={cn("text-xs font-mono tracking-wider uppercase transition-colors duration-200", active ? "text-primary" : "text-muted-foreground", hovered && !active && "text-foreground/80")}>
                {item.label}
              </span>
              <div className="relative flex items-center justify-center w-6 h-6 shrink-0">
                <div className={cn("w-2.5 h-2.5 rounded-full border-2 transition-all duration-200", active ? "bg-primary border-primary scale-100" : "bg-transparent border-muted-foreground/40 group-hover:border-muted-foreground/70", hovered && !active && "border-muted-foreground/60")} />
                {active && <motion.div layoutId="nav-dot-glow" className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-primary/30 blur-[6px]" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
              </div>
            </>
          )
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group flex items-center gap-3 py-2 pr-1 pl-4 cursor-pointer rounded-l-full rounded-r-md transition-colors duration-200 hover:bg-card/50 text-left w-full"
              aria-label={`Scroll to ${item.label}`}
            >
              {content}
            </button>
          )
        })}

        {/* Pages */}
        <div className="pr-1 pl-4 pt-2 pb-0.5 border-t border-border/40 mt-0.5">
          <span className="text-[10px] font-mono tracking-widest text-primary/70 uppercase">Pages</span>
        </div>
        {pages.map((item) => {
          const active = isActive(item)
          const hovered = hoveredId === item.id
          const content = (
            <>
              <span className={cn("text-xs font-mono tracking-wider uppercase transition-colors duration-200", active ? "text-primary" : "text-muted-foreground", hovered && !active && "text-foreground/80")}>
                {item.label}
              </span>
              <div className="relative flex items-center justify-center w-6 h-6 shrink-0">
                <div className={cn("w-2.5 h-2.5 rounded-full border-2 transition-all duration-200", active ? "bg-primary border-primary scale-100" : "bg-transparent border-muted-foreground/40 group-hover:border-muted-foreground/70", hovered && !active && "border-muted-foreground/60")} />
                {active && <motion.div layoutId="nav-dot-glow-pages" className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-primary/30 blur-[6px]" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
              </div>
            </>
          )
          return (
            <Link
              key={item.id}
              href={item.href!}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group flex items-center gap-3 py-2 pr-1 pl-4 cursor-pointer rounded-l-full rounded-r-md transition-colors duration-200 hover:bg-card/50"
              aria-label={`Go to ${item.label}`}
            >
              {content}
            </Link>
          )
        })}

        {/* Search */}
        <div className="border-t border-border/40">
          <button
            type="button"
            onClick={openSearch}
            onMouseEnter={() => setHoveredId("search")}
            onMouseLeave={() => setHoveredId(null)}
            className="group flex items-center gap-3 py-2 pr-1 pl-4 cursor-pointer rounded-l-full rounded-r-md transition-colors duration-200 hover:bg-card/50 w-full"
            aria-label="Open search"
          >
            <span className={cn("text-xs font-mono tracking-wider uppercase transition-colors duration-200", hoveredId === "search" ? "text-foreground/90" : "text-muted-foreground")}>
              Search
            </span>
            <div className="flex items-center justify-center w-6 h-6 shrink-0 rounded-md bg-muted/40 group-hover:bg-primary/20 border border-transparent group-hover:border-primary/30 transition-colors duration-200">
              <Search className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </button>
        </div>
      </nav>

      {/* ——— Mobile / Tablet: FAB (Menu / Close) + bottom drawer ——— */}
      <div className="fixed z-[999] bottom-6 right-6 z-[100] flex xl:hidden">
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} direction="bottom">
          {drawerOpen ? (
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              className="flex items-center gap-2 px-4 py-3 rounded-full bg-primary/20 backdrop-blur-md border border-primary/40 text-primary shadow-lg hover:bg-primary/30 transition-all duration-300 cursor-pointer"
              aria-label="Close navigation menu"
            >
              <X className="w-5 h-5 shrink-0" />
              <span className="text-sm font-medium">Close</span>
            </button>
          ) : (
            <DrawerTrigger asChild>
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-3 rounded-full bg-card/90 backdrop-blur-md border border-border/60 text-foreground shadow-lg hover:bg-card hover:border-primary/30 hover:shadow-primary/10 transition-all duration-300 cursor-pointer"
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5 shrink-0" />
                <span className="text-sm font-medium">Menu</span>
              </button>
            </DrawerTrigger>
          )}
          <DrawerContent className="max-h-[min(85vh,28rem)] rounded-t-2xl border-t border-border/60 bg-background/98 backdrop-blur-xl shadow-[0_-8px_40px_-12px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col">
            <div className="mx-auto mt-2.5 h-1 w-12 shrink-0 rounded-full bg-muted-foreground/20" />
            <DrawerHeader className="pb-0 pt-3 px-4">
              <DrawerTitle className="text-center text-[11px] font-mono tracking-widest text-muted-foreground uppercase">
                Navigate
              </DrawerTitle>
            </DrawerHeader>
            <div className="px-4 pb-6 pt-1 overflow-hidden flex flex-col">
              {/* On this page */}
              <div className="mb-2">
                <p className="text-[10px] font-mono tracking-widest text-primary/70 uppercase px-2 mb-1">On this page</p>
                <ul className="flex flex-col gap-0.5" role="list">
                  {sections.map((item) => {
                    const active = isActive(item)
                    const Icon = item.icon
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => handleNavClick(item)}
                          className={cn(
                            "flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-left transition-all duration-200 cursor-pointer border border-transparent",
                            active ? "bg-primary/15 text-primary border-primary/20" : "text-foreground hover:bg-muted/40"
                          )}
                        >
                          <Icon className="w-3.5 h-3.5 shrink-0 text-muted-foreground" />
                          <span className="text-sm font-medium flex-1">{item.label}</span>
                          <ChevronRight className="w-3.5 h-3.5 shrink-0 text-muted-foreground/50" />
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>

              {/* Pages */}
              <div className="mb-2">
                <p className="text-[10px] font-mono tracking-widest text-primary/70 uppercase px-2 mb-1">Pages</p>
                <ul className="flex flex-col gap-0.5" role="list">
                  {pages.map((item) => {
                    const active = isActive(item)
                    const Icon = item.icon
                    return (
                      <li key={item.id}>
                        <Link
                          href={item.href!}
                          onClick={() => setDrawerOpen(false)}
                          className={cn(
                            "flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-left transition-all duration-200 cursor-pointer border border-transparent",
                            active ? "bg-primary/15 text-primary border-primary/20" : "text-foreground hover:bg-muted/40"
                          )}
                        >
                          <Icon className="w-3.5 h-3.5 shrink-0 text-muted-foreground" />
                          <span className="text-sm font-medium flex-1">{item.label}</span>
                          <ChevronRight className="w-3.5 h-3.5 shrink-0 text-muted-foreground/50" />
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>

              {/* Search — looks like a search input */}
              <div className="pt-2 border-t border-border/50 mt-0.5">
                <button
                  type="button"
                  onClick={() => {
                    setDrawerOpen(false)
                    setTimeout(openSearch, 200)
                  }}
                  className="flex items-center gap-2.5 w-2/3 px-3 py-2.5 rounded-lg bg-muted/30 border border-border/50 text-left hover:bg-muted/50 hover:border-primary/30 transition-all duration-200 cursor-pointer"
                >
                  <Search className="w-4 h-4 shrink-0 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Search...</span>
                  <kbd className="ml-auto text-[10px] font-mono px-1.5 py-0.5 rounded bg-background/80 border border-border/40 text-muted-foreground">⌘K</kbd>
                </button>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  )
}
