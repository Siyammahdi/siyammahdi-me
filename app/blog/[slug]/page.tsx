"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Clock, Tag, Calendar, ArrowUpRight } from "lucide-react"
import { getPostBySlug, blogPosts } from "@/lib/blog-data"
import type { BlogPost } from "@/lib/blog-data"
import { AnimatedGrid } from "@/components/animated-grid"

function MarkdownRenderer({ content }: { content: string }) {
  const lines = content.split("\n")
  const elements: React.ReactNode[] = []
  let inCodeBlock = false
  let codeContent = ""
  let codeLanguage = ""

  lines.forEach((line, idx) => {
    if (line.startsWith("```")) {
      if (!inCodeBlock) {
        inCodeBlock = true
        codeLanguage = line.slice(3).trim()
        codeContent = ""
      } else {
        inCodeBlock = false
        elements.push(
          <div key={`code-${idx}`} className="my-6 rounded-xl overflow-hidden border border-border/40">
            {codeLanguage && (
              <div className="px-4 py-2 bg-secondary/60 border-b border-border/30">
                <span className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-wider">{codeLanguage}</span>
              </div>
            )}
            <pre className="p-4 bg-card/80 overflow-x-auto">
              <code className="text-sm font-mono text-foreground/80 leading-relaxed">{codeContent.trim()}</code>
            </pre>
          </div>
        )
      }
      return
    }

    if (inCodeBlock) {
      codeContent += line + "\n"
      return
    }

    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={idx} className="text-xl font-bold text-foreground mt-10 mb-4">{line.slice(4)}</h3>
      )
    } else if (line.startsWith("## ")) {
      elements.push(
        <h2 key={idx} className="text-2xl font-bold text-foreground mt-12 mb-6 pb-3 border-b border-border/20">{line.slice(3)}</h2>
      )
    } else if (line.startsWith("- **")) {
      const match = line.match(/^- \*\*(.+?)\*\*(.*)$/)
      if (match) {
        elements.push(
          <li key={idx} className="flex items-start gap-2 ml-4 my-1.5 text-muted-foreground leading-relaxed">
            <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-2.5 shrink-0" />
            <span><strong className="text-foreground font-medium">{match[1]}</strong>{match[2]}</span>
          </li>
        )
      }
    } else if (line.startsWith("- ")) {
      elements.push(
        <li key={idx} className="flex items-start gap-2 ml-4 my-1.5 text-muted-foreground leading-relaxed">
          <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-2.5 shrink-0" />
          <span>{line.slice(2)}</span>
        </li>
      )
    } else if (line.match(/^\d+\./)) {
      const match = line.match(/^(\d+)\.\s\*\*(.+?)\*\*(.*)$/)
      if (match) {
        elements.push(
          <li key={idx} className="flex items-start gap-3 ml-4 my-2 text-muted-foreground leading-relaxed">
            <span className="text-xs font-mono text-primary/70 mt-1 shrink-0">{match[1]}.</span>
            <span><strong className="text-foreground font-medium">{match[2]}</strong>{match[3]}</span>
          </li>
        )
      } else {
        elements.push(
          <li key={idx} className="flex items-start gap-3 ml-4 my-2 text-muted-foreground leading-relaxed">
            <span className="text-xs font-mono text-primary/70 mt-1 shrink-0">{line.match(/^\d+/)?.[0]}.</span>
            <span>{line.replace(/^\d+\.\s*/, "")}</span>
          </li>
        )
      }
    } else if (line.trim() === "") {
      elements.push(<div key={idx} className="h-3" />)
    } else {
      const processed = line
        .replace(/\*\*(.+?)\*\*/g, '<strong class="text-foreground font-medium">$1</strong>')
        .replace(/`(.+?)`/g, '<code class="text-xs font-mono text-primary bg-primary/10 px-1.5 py-0.5 rounded">$1</code>')
        .replace(/--/g, "\u2014")
      elements.push(
        <p key={idx} className="text-muted-foreground leading-relaxed my-1" dangerouslySetInnerHTML={{ __html: processed }} />
      )
    }
  })

  return <div className="prose-custom">{elements}</div>
}

function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = (window.scrollY / scrollHeight) * 100
      setProgress(scrolled)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-border/20">
      <motion.div
        className="h-full bg-primary"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string
  const post = getPostBySlug(slug)

  if (!post) {
    return (
      <main className="relative min-h-screen flex items-center justify-center">
        <AnimatedGrid />
        <div className="relative z-10 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Article Not Found</h1>
          <Link href="/blog" className="text-primary hover:underline">Back to Blog</Link>
        </div>
      </main>
    )
  }

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug && (p.category === post.category || p.tags.some((t) => post.tags.includes(t))))
    .slice(0, 3)

  return (
    <main className="relative min-h-screen">
      <AnimatedGrid />
      <ReadingProgress />

      <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-12 py-12">
        {/* Back */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-300 mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            All Articles
          </Link>
        </motion.div>

        {/* Article header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="flex items-center gap-1.5 text-xs font-mono text-primary px-2.5 py-1 bg-primary/10 rounded-lg border border-primary/20">
              <Tag className="w-3 h-3" />
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground/50">
              <Calendar className="w-3 h-3" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground/50">
              <Clock className="w-3 h-3" />
              {post.readTime}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6 text-balance">
            {post.title}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {post.excerpt}
          </p>
          <div className="flex flex-wrap gap-2 mt-6">
            {post.tags.map((tag) => (
              <span key={tag} className="text-[11px] font-mono text-muted-foreground/50 px-2 py-0.5 bg-secondary/40 rounded">
                {tag}
              </span>
            ))}
          </div>
        </motion.header>

        <div className="h-px bg-border/30 mb-12" />

        {/* Article content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <MarkdownRenderer content={post.content} />
        </motion.article>

        <div className="h-px bg-border/30 my-16" />

        {/* Related articles */}
        {relatedPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-xs font-mono tracking-widest text-muted-foreground/50 uppercase mb-6">Related Articles</h2>
            <div className="flex flex-col gap-4">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group flex items-center justify-between p-4 bg-card/30 border border-border/30 rounded-xl hover:border-primary/20 hover:bg-card/50 transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono text-primary/60">{related.category}</span>
                      <span className="text-[10px] font-mono text-muted-foreground/30">{related.readTime}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                      {related.title}
                    </h3>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary transition-all duration-300 shrink-0 ml-4" />
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {/* Footer CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm font-semibold rounded-xl hover:bg-primary/90 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Articles
          </Link>
        </div>
      </div>
    </main>
  )
}
