"use client"

import { useEffect, useState } from "react"
import { AnimatedGrid } from "@/components/animated-grid"
import { HeroSection } from "@/components/hero-section"
import { WorksSection } from "@/components/works-section"
import { PlaygroundSection } from "@/components/playground-section"
import { PhotoGallery } from "@/components/photo-gallery"
import { BlogSection } from "@/components/blog-section"
import { ResumeSection } from "@/components/resume-section"
import { ContactSection } from "@/components/contact-section"

export default function Home() {

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
      {/* Edge gradients — z-[99] so they stay below portaled modals (z-[100]+) */}
      <div className={`h-[20vh] w-[100vw] fixed top-0 bg-gradient-to-b from-black via-black/80 to-transparent z-[98] ${isTop ? "hidden" : "block"}`} aria-hidden />
      <div className={`h-[20vh] w-[100vw] fixed bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent z-[98] ${isBottom ? "hidden" : "block"}`} aria-hidden />
      <AnimatedGrid />

      {/* Right padding on xl so side nav never overlaps content (photo, etc.) */}
      <div className="relative z-10 pr-0 xl:pr-28">
        <HeroSection />
        <WorksSection />
        {/* <PlaygroundSection /> */}
        <PhotoGallery />
        <BlogSection />
        <ResumeSection />
        <ContactSection />
      </div>
    </main>
  )
}
