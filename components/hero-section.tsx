"use client"

import { useState, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import {
  Github,
  Linkedin,
  Facebook,
  FileText,
  ArrowDown,
  Terminal,
  Sparkles,
  Code2,
  Palette,
  Atom,
  Zap,
  Layers,
  Move,
  LayoutGrid,
  Server,
  Route,
  Database,
  Key,
  Link2,
  Flame,
  Cloud,
  Send,
  Mail,
  ChevronRight,
} from "lucide-react"
import Marquee from "react-fast-marquee"

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com/siyam",
    color: "hover:bg-[#333]/20 hover:border-[#6e7681] hover:text-foreground",
    glow: "hover:shadow-[0_0_20px_rgba(110,118,129,0.3)]",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://linkedin.com/in/siyam",
    color: "hover:bg-[#0077b5]/10 hover:border-[#0077b5]/50 hover:text-[#0077b5]",
    glow: "hover:shadow-[0_0_20px_rgba(0,119,181,0.25)]",
  },
  {
    name: "Facebook",
    icon: Facebook,
    href: "https://facebook.com/siyam",
    color: "hover:bg-[#1877f2]/10 hover:border-[#1877f2]/50 hover:text-[#1877f2]",
    glow: "hover:shadow-[0_0_20px_rgba(24,119,242,0.25)]",
  },
  {
    name: "Resume",
    icon: FileText,
    href: "#resume",
    color: "hover:bg-primary/10 hover:border-primary/50 hover:text-primary",
    glow: "hover:shadow-[0_0_20px_rgba(52,211,153,0.25)]",
  },
]

const skills = [
  { name: "TypeScript", icon: Code2 },
  { name: "JavaScript", icon: Code2 },
  { name: "Tailwind", icon: Palette },
  { name: "React.js", icon: Atom },
  { name: "Next.js", icon: Zap },
  { name: "Redux", icon: Layers },
  { name: "Framer Motion", icon: Move },
  { name: "Webflow", icon: LayoutGrid },
  { name: "Node.js", icon: Server },
  { name: "Express.js", icon: Route },
  { name: "Mongoose", icon: Database },
  { name: "Prisma", icon: Key },
  { name: "RESTful APIs", icon: Link2 },
  { name: "Firebase", icon: Flame },
  { name: "MongoDB", icon: Database },
  { name: "PostgreSQL", icon: Database },
  { name: "MySQL", icon: Database },
  { name: "Linux", icon: Terminal },
  { name: "Github", icon: Github },
  { name: "Vercel", icon: Cloud },
  { name: "Postman", icon: Send },
] as const

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}


export function HeroSection() {
  const [isHovered, setIsHovered] = useState(false)

  const handleHoverStart = useCallback(() => {
    setIsHovered(true)
  }, [])

  const handleHoverEnd = useCallback(() => {
    setIsHovered(false)
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Emerald radial glow behind the entire hero */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/[0.04] blur-[120px] pointer-events-none" />

      {/* Premium status pill — Dynamic Island inspired */}
      <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="absolute top-5 left-1/2 -translate-x-1/2 z-50"
    >
      <motion.div
        layout
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        onFocus={handleHoverStart}
        onBlur={handleHoverEnd}
        transition={{
          type: "spring",
          stiffness: 220,
          damping: 26,
        }}
        style={{
          borderRadius: isHovered ? 16 : 9999,
        }}
        whileHover={{ scale: 1.02 }}
        whileFocus={{ scale: 1.02 }}
        tabIndex={0}
        className="
          flex items-center overflow-hidden
          min-h-[30px] py-2 pl-3 pr-4
          md:min-h-[30px] md:py-2 md:pl-4 md:pr-5
          bg-white/[0.06] dark:bg-white/[0.04]
          border border-white/[0.08] dark:border-white/[0.06]
          backdrop-blur-xl
          shadow-[0_8px_32px_-8px_rgba(0,0,0,0.4)]
          cursor-default select-none
          outline-none
          focus-visible:ring-1 focus-visible:ring-primary/30
        "
      >
        {/* Status */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="relative flex h-2 w-2 shrink-0 rounded-full bg-primary shadow-[0_0_10px_var(--primary)] motion-safe:animate-pulse" />
          <span className="text-[13px] md:text-sm font-medium tracking-tight whitespace-nowrap">
            Currently not available
          </span>
        </div>

        {/* Expanded Section */}
        <AnimatePresence mode="wait" initial={false}>
          {isHovered && (
            <motion.div
              layout="position"
              key="expanded"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 26,
              }}
              className="flex flex-col gap-2 pl-4 ml-4 border-l border-white/10"
            >
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                But open for your proposal
              </span>

              <Link
                href="#contact"
                className="
                  inline-flex items-center gap-2
                  px-3 py-1.5 rounded-lg
                  bg-primary/15 border border-primary/30
                  text-primary text-xs font-medium
                  hover:bg-primary/25
                  transition-all duration-300
                "
              >
                <Mail className="w-3.5 h-3.5" />
                Send mail
                <ChevronRight className="w-3 h-3" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left side - Content */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col gap-6"
          >
            {/* Terminal-style intro */}
            <motion.div variants={fadeUp} className="flex items-center gap-2 text-muted-foreground/50">
              <Terminal className="w-3.5 h-3.5" />
              <span className="text-xs font-mono tracking-widest uppercase">whoami</span>
            </motion.div>

            {/* Name with creative treatment */}
            <motion.div variants={fadeUp}>
              <h1 className="flex items-end gap-3 text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold tracking-tight leading-[0.9]">
                <span className="block text-foreground">Siyam</span>
                <span className="block text-primary mt-2 relative">
                  Mahdi
                  <Sparkles className="absolute -right-8 top-0 w-6 h-6 text-primary/40 animate-float" />
                </span>
              </h1>
            </motion.div>

            {/* Positioning statement */}
            <motion.p
              variants={fadeUp}
              className="text-lg sm:text-xl text-muted-foreground max-w-xl leading-relaxed"
            >
              Engineering scalable digital systems with{" "}
              <span className="text-foreground font-medium">refined interaction layers</span>.
            </motion.p>

            {/* Code-style philosophy */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col gap-1.5 font-mono text-sm p-4 bg-card/50 border border-border/40 rounded-xl max-w-md"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-chart-2/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-primary/60" />
              </div>
              <span className="text-muted-foreground/50">
                <span className="text-primary/70">const</span>{" "}
                <span className="text-foreground/80">philosophy</span>{" "}
                <span className="text-primary/70">=</span>{" "}
                <span className="text-muted-foreground/70">{"{"}</span>
              </span>
              <span className="text-muted-foreground/50 pl-4">
                <span className="text-accent-foreground">architecture</span>
                <span className="text-muted-foreground/40">:</span>{" "}
                <span className="text-primary/80">{'"clean"'}</span>
                <span className="text-muted-foreground/40">,</span>
              </span>
              <span className="text-muted-foreground/50 pl-4">
                <span className="text-accent-foreground">motion</span>
                <span className="text-muted-foreground/40">:</span>{" "}
                <span className="text-primary/80">{'"intentional"'}</span>
                <span className="text-muted-foreground/40">,</span>
              </span>
              <span className="text-muted-foreground/50 pl-4">
                <span className="text-accent-foreground">execution</span>
                <span className="text-muted-foreground/40">:</span>{" "}
                <span className="text-primary/80">{'"fast"'}</span>
              </span>
              <span className="text-muted-foreground/70">{"}"}</span>
            </motion.div>

            {/* Social links - HIGHLIGHTED */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mt-2">
              {socialLinks.map((link) => {
                const Icon = link.icon
                const isInternal = link.href.startsWith("#")
                const Wrapper = isInternal ? "a" : Link
                return (
                  <Wrapper
                    key={link.name}
                    href={link.href}
                    {...(!isInternal && { target: "_blank", rel: "noopener noreferrer" })}
                    className={`group flex items-center gap-2.5 px-4 py-2.5 bg-card/60 border border-border/50 rounded-xl text-sm font-medium text-muted-foreground transition-all duration-300 ${link.color} ${link.glow}`}
                  >
                    <Icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                    <span>{link.name}</span>
                  </Wrapper>
                )
              })}
            </motion.div>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex items-center gap-4 mt-2">
              <button
                onClick={() => document.getElementById("works")?.scrollIntoView({ behavior: "smooth" })}
                className="px-6 py-3 bg-primary text-primary-foreground text-sm font-semibold rounded-xl hover:bg-primary/90 transition-all duration-300 animate-emerald-pulse"
              >
                View Works
              </button>
              <Link
                href="/blog"
                className="px-6 py-3 text-sm font-medium text-muted-foreground border border-border rounded-xl hover:border-primary/40 hover:text-foreground transition-all duration-300"
              >
                Read Blog
              </Link>
            </motion.div>
          </motion.div>

          {/* Right side - Photo frame + tech stack stacked below */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex flex-col items-center lg:items-end mt-8 lg:mt-0 w-full"
          >
            <div className="relative group w-full max-w-[22rem] flex justify-center lg:justify-end">
              {/* Multi-layer glow */}
              <div className="absolute -inset-8 bg-primary/[0.06] rounded-3xl blur-3xl transition-all duration-700 group-hover:bg-primary/[0.1]" />
              <div className="absolute -inset-4 bg-primary/[0.04] rounded-2xl blur-xl" />

              {/* Main photo container */}
              <div className="relative w-64 h-80 sm:w-72 sm:h-[22rem] lg:w-[22rem] lg:h-[24rem] rounded-2xl overflow-hidden border-2 border-primary/20 group-hover:border-primary/40 transition-all duration-500">
                <Image
                  src="/images/siyam-hero.jpg"
                  alt="Siyam Mahdi - Developer Portrait"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                  sizes="(max-width: 768px) 288px, (max-width: 1024px) 320px, 352px"
                />
                {/* Emerald gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-70" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.05] to-transparent" />

                {/* Name overlay at bottom of image only */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-px bg-primary/60" />
                    <span className="text-xs font-mono text-primary/80 tracking-widest uppercase">Developer</span>
                  </div>
                </div>
              </div>

              {/* Decorative corner brackets */}
              <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-primary/30 rounded-tl-lg" />
              <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-primary/30 rounded-tr-lg" />
              <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-primary/30 rounded-bl-lg" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-primary/30 rounded-br-lg" />

              {/* Floating status card */}
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-4 top-12 px-3 py-2 bg-card/90 backdrop-blur-md border border-primary/20 rounded-lg shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-subtle-glow" />
                  <span className="text-[10px] font-mono text-primary/80">5+ years exp</span>
                </div>
              </motion.div>

              {/* Floating stack card */}
              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -left-6 bottom-24 px-3 py-2 bg-card/90 backdrop-blur-md border border-primary/20 rounded-lg shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-primary/80">MERN + Next.js</span>
                </div>
              </motion.div>
            </div>

            {/* Tech stack slider — directly below image frame, same width */}
            <div className="relative w-full max-w-[22rem] mt-20 overflow-hidden ">
              <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-16 z-10 bg-gradient-to-r from-[#010805] via-[#010805]/50 to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-16 z-10 bg-gradient-to-l from-background via-background/80 to-transparent" />
              <Marquee
                gradient={false}
                speed={36}
                pauseOnHover
                className="[&>div]:flex [&>div]:gap-2 [&>div]:py-1"
              >
                {skills.map((skill) => {
                  const Icon = skill.icon
                  return (
                    <span
                      key={skill.name}
                      className="flex items-center gap-2 px-3 py-2 text-xs font-mono bg-card/80 text-foreground/90 rounded-lg border border-border/50 hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-all duration-300 cursor-default shrink-0"
                    >
                      <Icon className="w-3.5 h-3.5 text-primary/80 shrink-0" aria-hidden />
                      {skill.name}
                    </span>
                  )
                })}
              </Marquee>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-mono text-muted-foreground/40 tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-1"
        >
          <ArrowDown className="w-3.5 h-3.5 text-primary/40" />
        </motion.div>
      </motion.div>
    </section>
  )
}
