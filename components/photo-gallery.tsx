"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

const photos = [
  {
    src: "/images/siyam-hero.jpg",
    alt: "Siyam Mahdi - Portrait",
    caption: "Behind the code",
    span: "col-span-2 row-span-2",
  },
  {
    src: "/images/gallery/photo-1.jpg",
    alt: "Workspace setup",
    caption: "Where the magic happens",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/images/gallery/photo-2.jpg",
    alt: "Tech event",
    caption: "Connecting with the community",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/images/gallery/photo-3.jpg",
    alt: "Urban portrait",
    caption: "City explorations",
    span: "col-span-1 row-span-2",
  },
  {
    src: "/images/gallery/photo-4.jpg",
    alt: "Coding session",
    caption: "Deep focus",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/images/gallery/photo-5.jpg",
    alt: "Rooftop view",
    caption: "Seeing the bigger picture",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/images/gallery/photo-6.jpg",
    alt: "Speaking at event",
    caption: "Sharing knowledge",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/images/gallery/photo-7.jpg",
    alt: "Speaking at event",
    caption: "Sharing knowledge",
    span: "col-span-1 row-span-1",
  },
]

export function PhotoGallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const navigatePhoto = (direction: "prev" | "next") => {
    if (selectedIndex === null) return
    if (direction === "prev") {
      setSelectedIndex(selectedIndex === 0 ? photos.length - 1 : selectedIndex - 1)
    } else {
      setSelectedIndex(selectedIndex === photos.length - 1 ? 0 : selectedIndex + 1)
    }
  }

  return (
    <section id="gallery" className="relative py-32 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-6"
        >
          <span className="text-xs font-mono tracking-widest text-primary uppercase">03</span>
          <div className="h-px flex-1 bg-border" />
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Gallery</h2>
          <div className="h-px flex-1 bg-border" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-muted-foreground text-sm max-w-xl mb-16"
        >
          Moments beyond the screen. Life, travels, and the spaces in between.
        </motion.p>

        {/* Photo grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[220px] gap-3">
          {photos.map((photo, index) => (
            <motion.button
              key={photo.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              onClick={() => setSelectedIndex(index)}
              className={`group relative overflow-hidden rounded-xl border border-border/30 hover:border-primary/30 transition-all duration-500 cursor-pointer ${photo.span}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 transition-all duration-500 flex items-end p-4">
                <span className="text-xs font-mono text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-2 group-hover:translate-y-0">
                  {photo.caption}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md flex items-center justify-center"
            onClick={() => setSelectedIndex(null)}
          >
            {/* Close */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute z-[999] top-6 right-6 p-2 text-muted-foreground hover:text-foreground transition-colors z-10 cursor-pointer"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation */}
            <button
              onClick={(e) => { e.stopPropagation(); navigatePhoto("prev") }}
              className="absolute left-4 md:left-48 p-2 text-muted-foreground hover:text-foreground transition-colors z-10 cursor-pointer"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); navigatePhoto("next") }}
              className="absolute right-4 md:right-48 p-2 text-muted-foreground hover:text-foreground transition-colors z-10 cursor-pointer"
              aria-label="Next photo"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Image */}
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative w-[85vw] h-[75vh] max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={photos[selectedIndex].src}
                alt={photos[selectedIndex].alt}
                fill
                className="object-contain rounded-lg"
                sizes="85vw"
              />
              <div className="absolute -bottom-12 left-0 right-0 text-center">
                <p className="text-sm font-mono text-muted-foreground">{photos[selectedIndex].caption}</p>
                <p className="text-xs text-muted-foreground/50 mt-1">{selectedIndex + 1} / {photos.length}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
