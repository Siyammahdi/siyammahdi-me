export type ResourceCategory = "Design" | "Development" | "Tools" | "Learning" | "Templates" | "Inspiration"

export interface Resource {
  title: string
  description: string
  url: string
  category: ResourceCategory
  tags: string[]
  featured: boolean
  type: "tool" | "article" | "template" | "course" | "library" | "collection"
}

export const resources: Resource[] = [
  { title: "Tailwind CSS", description: "Utility-first CSS framework for rapid UI development. The foundation of modern web styling with excellent DX.", url: "https://tailwindcss.com", category: "Development", tags: ["CSS", "Framework", "Utility-First"], featured: true, type: "library" },
  { title: "Figma", description: "Collaborative design tool for creating interfaces, prototypes, and design systems. Essential for any web project.", url: "https://figma.com", category: "Design", tags: ["Design", "Prototyping", "Collaboration"], featured: true, type: "tool" },
  { title: "Framer Motion", description: "Production-ready motion library for React. Declarative animations, gestures, and layout animations.", url: "https://www.framer.com/motion/", category: "Development", tags: ["Animation", "React", "Motion"], featured: true, type: "library" },
  { title: "Shadcn UI", description: "Beautifully designed components built with Radix UI and Tailwind CSS. Copy and paste into your apps.", url: "https://ui.shadcn.com", category: "Templates", tags: ["Components", "UI Kit", "Tailwind"], featured: true, type: "collection" },
  { title: "Refactoring UI", description: "Learn UI design through practical tips and techniques. From the creators of Tailwind CSS.", url: "https://www.refactoringui.com", category: "Learning", tags: ["UI Design", "Book", "Practical"], featured: false, type: "course" },
  { title: "Vercel", description: "The platform for frontend developers. Deploy Next.js apps with zero configuration and global edge network.", url: "https://vercel.com", category: "Tools", tags: ["Deployment", "Hosting", "Edge"], featured: false, type: "tool" },
  { title: "Awwwards", description: "Website awards that recognize the talent and effort of the best web designers and developers.", url: "https://www.awwwards.com", category: "Inspiration", tags: ["Gallery", "Awards", "Premium"], featured: false, type: "collection" },
  { title: "Next.js Documentation", description: "Comprehensive documentation for Next.js including App Router, Server Components, and caching strategies.", url: "https://nextjs.org/docs", category: "Learning", tags: ["Next.js", "Docs", "React"], featured: false, type: "article" },
  { title: "Lucide Icons", description: "Beautiful and consistent open-source icons. Perfectly crafted for modern web interfaces.", url: "https://lucide.dev", category: "Design", tags: ["Icons", "SVG", "Open Source"], featured: false, type: "library" },
  { title: "Coolors", description: "Fast color scheme generator. Create, save, and share perfect palettes in seconds.", url: "https://coolors.co", category: "Design", tags: ["Colors", "Palette", "Generator"], featured: false, type: "tool" },
  { title: "Prisma ORM", description: "Next-generation Node.js and TypeScript ORM. Type-safe database access with auto-generated queries.", url: "https://www.prisma.io", category: "Development", tags: ["ORM", "Database", "TypeScript"], featured: false, type: "library" },
  { title: "Josh W Comeau Blog", description: "In-depth CSS and React articles with interactive demos. One of the best technical blogs on the web.", url: "https://www.joshwcomeau.com", category: "Inspiration", tags: ["Blog", "CSS", "React"], featured: false, type: "article" },
  { title: "MongoDB Atlas", description: "Cloud-hosted MongoDB with auto-scaling, backups, and global distribution. Built for modern apps.", url: "https://www.mongodb.com/atlas", category: "Tools", tags: ["Database", "Cloud", "NoSQL"], featured: false, type: "tool" },
  { title: "Type Challenges", description: "Collection of TypeScript type challenges. Level up your type-level programming skills.", url: "https://github.com/type-challenges/type-challenges", category: "Learning", tags: ["TypeScript", "Challenges", "Advanced"], featured: false, type: "course" },
  { title: "Webflow University", description: "Free video courses and tutorials for mastering Webflow. From basics to advanced custom interactions.", url: "https://university.webflow.com", category: "Learning", tags: ["Webflow", "Video", "Free"], featured: false, type: "course" },
  { title: "Dribbble", description: "Design inspiration platform. Discover top designers and find creative ideas for your next project.", url: "https://dribbble.com", category: "Inspiration", tags: ["Design", "Gallery", "Creative"], featured: false, type: "collection" },
]

export const allCategories: ResourceCategory[] = ["Design", "Development", "Tools", "Learning", "Templates", "Inspiration"]
