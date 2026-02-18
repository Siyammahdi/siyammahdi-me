"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowUpRight, Clock, Tag, ArrowLeft, Sparkles, Search } from "lucide-react"
import { blogPosts, categories } from "@/lib/blog-data"
import { AnimatedGrid } from "@/components/animated-grid"

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filtered = blogPosts.filter((post) => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const featured = blogPosts.filter((p) => p.featured).slice(0, 2)

  return (
    <main className="relative min-h-screen">
      <AnimatedGrid />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12 py-12">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-300 mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-xs font-mono tracking-widest text-primary uppercase">Blog</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 text-balance">
            Writing & <span className="text-primary">Thoughts</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Technical deep-dives, architecture decisions, and development philosophy.
            Distilled from real-world projects and shipped code.
          </p>
        </motion.div>

        {/* Search + Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-4 mb-12"
        >
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-card/60 border border-border/50 rounded-xl text-sm text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-primary/40 transition-colors duration-300"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {["All", ...categories].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-all duration-300 cursor-pointer ${
                  activeCategory === cat
                    ? "bg-primary/15 border-primary/40 text-primary"
                    : "bg-card/40 border-border/40 text-muted-foreground hover:border-primary/20 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Featured section */}
        {activeCategory === "All" && searchQuery === "" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mb-16"
          >
            <h2 className="text-xs font-mono tracking-widest text-muted-foreground/50 uppercase mb-6">Featured</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {featured.map((post, i) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group relative p-6 lg:p-8 bg-card/50 border border-border/50 rounded-xl hover:border-primary/30 hover:bg-card/80 transition-all duration-500"
                >
                  <div className="absolute inset-0 bg-primary/[0.03] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="flex items-center gap-1.5 text-[10px] font-mono text-primary/80 px-2 py-0.5 bg-primary/10 rounded border border-primary/20">
                        <Tag className="w-2.5 h-2.5" />
                        {post.category}
                      </span>
                      <span className="text-[10px] font-mono text-muted-foreground/50">{post.date}</span>
                    </div>
                    <h3 className="text-lg lg:text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 mb-2 text-balance">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground/70 leading-relaxed line-clamp-2 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1.5">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-[10px] font-mono text-muted-foreground/50 px-2 py-0.5 bg-secondary/40 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {/* All articles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-xs font-mono tracking-widest text-muted-foreground/50 uppercase mb-6">
            {activeCategory === "All" ? "All Articles" : activeCategory} ({filtered.length})
          </h2>
          <div className="flex flex-col">
            {filtered.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col sm:flex-row sm:items-center gap-4 py-6 border-b border-border/30 hover:border-primary/20 transition-all duration-300"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="flex items-center gap-1.5 text-[10px] font-mono text-primary/70 px-2 py-0.5 bg-primary/5 rounded border border-primary/10">
                        <Tag className="w-2.5 h-2.5" />
                        {post.category}
                      </span>
                      <span className="text-[10px] font-mono text-muted-foreground/40">{post.date}</span>
                    </div>
                    <h3 className="text-base lg:text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300 mb-1">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground/60 leading-relaxed line-clamp-2 max-w-2xl">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <span className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground/40">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </Link>
              </motion.div>
            ))}
            {filtered.length === 0 && (
              <div className="py-16 text-center">
                <p className="text-muted-foreground/50">No articles found matching your search.</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </main>
  )
}
