"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowUpRight, Clock, Tag, ArrowRight } from "lucide-react"
import { blogPosts } from "@/lib/blog-data"

export function BlogSection() {
  const latestPosts = blogPosts.slice(0, 4)

  return (
    <section id="blog" className="relative py-32 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-6"
        >
          <span className="text-xs font-mono tracking-widest text-primary uppercase">04</span>
          <div className="h-px flex-1 bg-border" />
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Writing</h2>
          <div className="h-px flex-1 bg-border" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center justify-between mb-16"
        >
          <p className="text-muted-foreground text-sm max-w-xl">
            Technical writing distilled into practical knowledge. Architecture decisions, performance patterns, and development philosophy.
          </p>
          <Link
            href="/blog"
            className="hidden sm:flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-300"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Articles list */}
        <div className="flex flex-col">
          {latestPosts.map((article, index) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <Link
                href={`/blog/${article.slug}`}
                className="group flex flex-col sm:flex-row sm:items-center gap-4 py-6 border-b border-border/40 hover:border-primary/20 transition-all duration-300"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="flex items-center gap-1.5 text-[10px] font-mono text-primary/70 px-2 py-0.5 bg-primary/5 rounded border border-primary/10">
                      <Tag className="w-2.5 h-2.5" />
                      {article.category}
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground/50">{article.date}</span>
                  </div>
                  <h3 className="text-base lg:text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300 mb-1">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground/70 leading-relaxed line-clamp-2 max-w-2xl">
                    {article.excerpt}
                  </p>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground/50">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-8 sm:hidden"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-300"
          >
            View All Articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
