"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Github, Linkedin, Facebook, FileText, ArrowDown, Terminal, Sparkles } from "lucide-react"

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
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Emerald radial glow behind the entire hero */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/[0.04] blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left side - Content */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col gap-6"
          >
            {/* Status badge */}
            <motion.div variants={fadeUp} className="flex items-center gap-3">
              <div className="relative flex items-center gap-2 px-3 py-1.5 bg-primary/[0.08] border border-primary/20 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                <span className="text-xs font-mono tracking-wider text-primary">
                  Available for projects
                </span>
              </div>
            </motion.div>

            {/* Terminal-style intro */}
            <motion.div variants={fadeUp} className="flex items-center gap-2 text-muted-foreground/50">
              <Terminal className="w-3.5 h-3.5" />
              <span className="text-xs font-mono tracking-widest uppercase">whoami</span>
            </motion.div>

            {/* Name with creative treatment */}
            <motion.div variants={fadeUp}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold tracking-tight leading-[0.9]">
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

            {/* Tech stack badges */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
              {["Next.js", "React", "Node.js", "TypeScript", "MongoDB", "Webflow"].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 text-xs font-mono bg-secondary/60 text-secondary-foreground rounded-md border border-border/50 hover:border-primary/30 hover:bg-primary/5 hover:text-primary transition-all duration-300 cursor-default"
                >
                  {tech}
                </span>
              ))}
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

          {/* Right side - Photo with creative frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative group">
              {/* Multi-layer glow */}
              <div className="absolute -inset-8 bg-primary/[0.06] rounded-3xl blur-3xl transition-all duration-700 group-hover:bg-primary/[0.1]" />
              <div className="absolute -inset-4 bg-primary/[0.04] rounded-2xl blur-xl" />

              {/* Main photo container */}
              <div className="relative w-72 h-96 sm:w-80 sm:h-[28rem] lg:w-[22rem] lg:h-[30rem] rounded-2xl overflow-hidden border-2 border-primary/20 group-hover:border-primary/40 transition-all duration-500">
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

                {/* Name overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
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
