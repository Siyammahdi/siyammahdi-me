"use client"

import { useEffect, useState, useCallback } from "react"
import { usePathname } from "next/navigation"
import { SideNavigation } from "@/components/side-navigation"
import { CommandPalette } from "@/components/command-palette"

const sections = ["hero", "works", "playground", "gallery", "blog", "resume", "contact"]

export function GlobalNavigation() {
  const pathname = usePathname()
  const [activeSection, setActiveSection] = useState<string>("")

  const handleScroll = useCallback(() => {
    // Only track active section on home page
    if (pathname !== "/") {
      setActiveSection("")
      return
    }

    const scrollPosition = window.scrollY + window.innerHeight / 3

    for (const sectionId of [...sections].reverse()) {
      const el = document.getElementById(sectionId)
      if (el && el.offsetTop <= scrollPosition) {
        setActiveSection(sectionId)
        break
      }
    }
  }, [pathname])

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("")
      return
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initial check

    // Handle hash navigation when coming from other pages
    if (window.location.hash) {
      const hash = window.location.hash.slice(1)
      setTimeout(() => {
        const el = document.getElementById(hash)
        if (el) {
          el.scrollIntoView({ behavior: "smooth" })
        }
      }, 100)
    }

    return () => window.removeEventListener("scroll", handleScroll)
  }, [pathname, handleScroll])

  return (
    <>
      <SideNavigation activeSection={activeSection} />
      <CommandPalette />
    </>
  )
}
