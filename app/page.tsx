"use client"

import { useEffect, useState, useCallback } from "react"
import { AnimatedGrid } from "@/components/animated-grid"
import { SideNavigation } from "@/components/side-navigation"
import { HeroSection } from "@/components/hero-section"
import { WorksSection } from "@/components/works-section"
import { PlaygroundSection } from "@/components/playground-section"
import { PhotoGallery } from "@/components/photo-gallery"
import { BlogSection } from "@/components/blog-section"
import { ResumeSection } from "@/components/resume-section"
import { ContactSection } from "@/components/contact-section"
import { CommandPalette } from "@/components/command-palette"

const sections = ["hero", "works", "playground", "gallery", "blog", "resume", "contact"]

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero")

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY + window.innerHeight / 3

    for (const sectionId of [...sections].reverse()) {
      const el = document.getElementById(sectionId)
      if (el && el.offsetTop <= scrollPosition) {
        setActiveSection(sectionId)
        break
      }
    }
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  const [isBottom, setIsBottom] = useState(false)
  const [isTop, setIsTop] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const windowHeight = window.innerHeight
      const docHeight = document.documentElement.scrollHeight

      // Detect top
      setIsTop(scrollTop <= 5)

      // Detect bottom
      setIsBottom(scrollTop + windowHeight >= docHeight - 5)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="relative min-h-screen">
      <div className={`h-[20vh] w-[100vw] fixed top-0 bg-gradient-to-b from-black via-black/80 to-transparent z-99 ${isTop ? "hidden" : "block"}`}></div>
      <div className={`h-[20vh] w-[100vw] fixed bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent z-99 ${isBottom ? "hidden" : "block"}`}></div>
      <AnimatedGrid />
      <SideNavigation activeSection={activeSection} />
      <CommandPalette />

      <div className="relative z-10">
        <HeroSection />
        <WorksSection />
        <PlaygroundSection />
        <PhotoGallery />
        <BlogSection />
        <ResumeSection />
        <ContactSection />
      </div>
    </main>
  )
}
