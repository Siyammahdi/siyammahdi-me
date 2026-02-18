"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowUpRight, Mail, Github, Linkedin, Facebook, FileText } from "lucide-react"

const socialLinks = [
  {
    name: "GitHub",
    handle: "@siyam",
    icon: Github,
    href: "https://github.com/siyam",
    color: "group-hover:text-foreground group-hover:border-[#6e7681]/50",
    glow: "group-hover:shadow-[0_0_30px_rgba(110,118,129,0.15)]",
    bg: "group-hover:bg-[#333]/10",
  },
  {
    name: "LinkedIn",
    handle: "in/siyam",
    icon: Linkedin,
    href: "https://linkedin.com/in/siyam",
    color: "group-hover:text-[#0077b5] group-hover:border-[#0077b5]/40",
    glow: "group-hover:shadow-[0_0_30px_rgba(0,119,181,0.15)]",
    bg: "group-hover:bg-[#0077b5]/5",
  },
  {
    name: "Facebook",
    handle: "/siyam.mahdi",
    icon: Facebook,
    href: "https://facebook.com/siyam",
    color: "group-hover:text-[#1877f2] group-hover:border-[#1877f2]/40",
    glow: "group-hover:shadow-[0_0_30px_rgba(24,119,242,0.15)]",
    bg: "group-hover:bg-[#1877f2]/5",
  },
  {
    name: "Resume",
    handle: "Download PDF",
    icon: FileText,
    href: "#resume",
    color: "group-hover:text-primary group-hover:border-primary/40",
    glow: "group-hover:shadow-[0_0_30px_rgba(52,211,153,0.15)]",
    bg: "group-hover:bg-primary/5",
  },
  {
    name: "Email",
    handle: "siyam@email.com",
    icon: Mail,
    href: "mailto:siyam@email.com",
    color: "group-hover:text-amber-400 group-hover:border-amber-400/40",
    glow: "group-hover:shadow-[0_0_30px_rgba(251,191,36,0.15)]",
    bg: "group-hover:bg-amber-400/5",
  },
]

export function ContactSection() {
  return (
    <section id="contact" className="relative py-32 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="text-xs font-mono tracking-widest text-primary uppercase">06</span>
          <div className="h-px flex-1 bg-border" />
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Contact</h2>
          <div className="h-px flex-1 bg-border" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left - CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-6">
              {"Let's build something"}<br />
              <span className="text-primary">remarkable together.</span>
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-md">
              {"Have a project in mind? I'm always open to discussing new opportunities, creative ideas, or partnerships."}
            </p>
            <div className="flex items-center gap-4">
              <a
                href="mailto:siyam@email.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm font-semibold rounded-xl hover:bg-primary/90 transition-all duration-300 animate-emerald-pulse"
              >
                <Mail className="w-4 h-4" />
                Start a conversation
              </a>
              <Link
                href="/resources"
                className="px-6 py-3 text-sm font-medium text-muted-foreground border border-border rounded-xl hover:border-primary/40 hover:text-foreground transition-all duration-300"
              >
                Resources
              </Link>
            </div>
          </motion.div>

          {/* Right - Social links (highlighted) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-3"
          >
            {socialLinks.map((link, index) => {
              const Icon = link.icon
              const isInternal = link.href.startsWith("#")
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target={isInternal ? undefined : "_blank"}
                  rel={isInternal ? undefined : "noopener noreferrer"}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.08 }}
                  className={`group flex items-center justify-between p-4 border border-border/40 rounded-xl transition-all duration-400 ${link.color} ${link.glow} ${link.bg}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-secondary/60 rounded-lg border border-border/30 group-hover:border-current/20 transition-all duration-300">
                      <Icon className="w-5 h-5 text-muted-foreground group-hover:text-current transition-colors duration-300" />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-foreground block">{link.name}</span>
                      <span className="text-xs text-muted-foreground/50 font-mono">{link.handle}</span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-current transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </motion.a>
              )
            })}
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-24 pt-8 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <span className="text-xs font-mono text-muted-foreground/40">
            {'// Designed & built by Siyam Mahdi'}
          </span>
          <div className="flex items-center gap-6">
            <Link href="/blog" className="text-xs font-mono text-muted-foreground/40 hover:text-primary transition-colors duration-300">Blog</Link>
            <Link href="/resources" className="text-xs font-mono text-muted-foreground/40 hover:text-primary transition-colors duration-300">Resources</Link>
            <span className="text-xs font-mono text-muted-foreground/30">2026</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
