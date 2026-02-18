export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  readTime: string
  date: string
  featured: boolean
}

export const blogPosts: BlogPost[] = [
  {
    slug: "building-scalable-apis-nodejs-mongodb",
    title: "Building Scalable APIs with Node.js and MongoDB",
    excerpt: "A deep dive into designing RESTful APIs that handle millions of requests, covering connection pooling, indexing strategies, and caching layers.",
    content: `## Why Scalability Matters from Day One

When you're building an API, it's tempting to focus solely on getting things working. But the architectural decisions you make early on determine whether your system gracefully handles growth or collapses under pressure.

### Connection Pooling

MongoDB's connection pooling is your first line of defense. Instead of opening a new connection for every request, maintain a pool of reusable connections:

\`\`\`javascript
const client = new MongoClient(uri, {
  maxPoolSize: 50,
  minPoolSize: 10,
  maxIdleTimeMS: 30000,
  waitQueueTimeoutMS: 5000
});
\`\`\`

This alone can reduce your p95 latency by 40-60% under load.

### Indexing Strategies

The difference between a query scanning 10 million documents and one that hits an index is the difference between 3 seconds and 3 milliseconds. Always analyze your query patterns:

- **Compound indexes** for queries with multiple filters
- **Partial indexes** for queries on subsets of data
- **Text indexes** for search functionality
- **TTL indexes** for automatic data expiration

### Caching Layers

Implement a multi-tier caching strategy:

1. **Application-level cache** (in-memory, ~1ms): Hot data like user sessions
2. **Redis cache** (~5ms): Frequently accessed data with TTL
3. **CDN cache** (~20ms): Static and semi-static responses
4. **Database query cache**: MongoDB's internal WiredTiger cache

### Rate Limiting

Protect your API with intelligent rate limiting. Use a sliding window algorithm with Redis for distributed rate limiting across multiple server instances.

### Error Handling

Build a centralized error handler that:
- Logs structured errors with correlation IDs
- Returns consistent error responses
- Differentiates between client and server errors
- Triggers alerts for critical failures

The goal is to build an API that's not just functional, but resilient. One that handles the unexpected gracefully and scales without architectural rewrites.`,
    category: "Backend",
    tags: ["Node.js", "MongoDB", "API Design", "Performance"],
    readTime: "8 min read",
    date: "Feb 2026",
    featured: true,
  },
  {
    slug: "advanced-nextjs-patterns-production",
    title: "Advanced Next.js Patterns for Production",
    excerpt: "Server components, streaming, parallel routes, and intercepting routes. Practical patterns that make Next.js apps faster and more maintainable.",
    content: `## Beyond the Basics

Next.js has evolved far beyond a simple React framework. The App Router introduces patterns that fundamentally change how we think about web application architecture.

### Server Components: The Default

The mental model shift is significant: components are server-rendered by default. This means:

- **Zero client-side JavaScript** for static content
- **Direct database access** without API routes
- **Secure server-side logic** that never touches the browser

\`\`\`tsx
// This runs entirely on the server
async function ProductPage({ params }: { params: { id: string } }) {
  const product = await db.products.findById(params.id)
  return <ProductDisplay product={product} />
}
\`\`\`

### Streaming and Suspense

Don't make users wait for everything. Stream your UI:

\`\`\`tsx
export default function Dashboard() {
  return (
    <div>
      <Header />
      <Suspense fallback={<ChartSkeleton />}>
        <AnalyticsChart />
      </Suspense>
      <Suspense fallback={<TableSkeleton />}>
        <RecentOrders />
      </Suspense>
    </div>
  )
}
\`\`\`

Each Suspense boundary streams independently, giving users immediate feedback while slower data loads in the background.

### Parallel Routes

Run multiple page segments simultaneously:

\`\`\`
app/
  @analytics/
    page.tsx
  @team/
    page.tsx
  layout.tsx
\`\`\`

This pattern is powerful for dashboards where independent sections can load, error, and interact separately.

### Intercepting Routes

The most underutilized pattern. Show a modal preview while maintaining a shareable URL:

- Click a product in a grid -> modal preview (intercepted route)
- Share the URL -> full page view (actual route)

### Cache Components with "use cache"

The new \`use cache\` directive makes caching explicit and granular. Cache entire pages, individual components, or specific data-fetching functions.

The future of Next.js is about composability. Each pattern solves a specific problem, and the real power comes from combining them intentionally.`,
    category: "Frontend",
    tags: ["Next.js", "React", "Server Components", "Architecture"],
    readTime: "12 min read",
    date: "Jan 2026",
    featured: true,
  },
  {
    slug: "webflow-for-developers-beyond-basics",
    title: "Webflow for Developers: Beyond the Basics",
    excerpt: "How to push Webflow beyond templates with custom code injection, CMS-driven dynamic content, and automation-powered workflows.",
    content: `## Webflow Is Not Just a Visual Builder

Most developers dismiss Webflow as a tool for non-coders. That's a mistake. In the right hands, Webflow becomes a rapid deployment platform that eliminates the gap between design and production.

### Custom Code Injection

Webflow allows code injection at three levels:

1. **Site-wide head/footer code**: Global scripts, analytics, custom CSS
2. **Page-level code**: Page-specific functionality
3. **Embed elements**: Inline custom HTML/CSS/JS anywhere in the layout

### CMS-Driven Architecture

Build dynamic content systems without a backend:

- **Collections** for structured data (blog posts, team members, case studies)
- **Reference fields** for relationships between collections
- **Multi-reference fields** for many-to-many relationships
- **Dynamic pages** auto-generated from collection items

### Automation Workflows

Connect Webflow to your existing tools:

- Form submissions -> Zapier -> CRM
- CMS updates -> Webhook -> Slack notification
- New collection item -> Airtable sync
- E-commerce order -> Fulfillment API

### Performance Optimization

Webflow sites can be fast if you're intentional:

- Use Webflow's native lazy loading
- Optimize images before upload (Webflow compresses, but start optimized)
- Minimize custom code execution
- Use CSS animations over JavaScript where possible

### The Developer Advantage

Understanding code gives you superpowers in Webflow:

- Custom CSS for effects Webflow can't do natively
- JavaScript for complex interactions
- API integrations for dynamic data
- Custom forms with validation

Webflow for developers isn't about replacing code. It's about choosing the right tool for the project scope and delivering faster without sacrificing quality.`,
    category: "Webflow",
    tags: ["Webflow", "CMS", "Automation", "No-Code"],
    readTime: "6 min read",
    date: "Dec 2025",
    featured: false,
  },
  {
    slug: "performance-optimization-60-to-100-lighthouse",
    title: "Performance Optimization: From 60 to 100 Lighthouse",
    excerpt: "Practical techniques for optimizing Core Web Vitals including image optimization, code splitting, and eliminating render-blocking resources.",
    content: `## Performance Is a Feature

A fast website isn't a nice-to-have. It directly impacts conversion rates, SEO rankings, and user satisfaction. Here's how to systematically improve your Lighthouse score.

### Core Web Vitals

Focus on the three metrics that matter:

**LCP (Largest Contentful Paint) < 2.5s**
- Preload critical images
- Use responsive image formats (WebP, AVIF)
- Optimize server response time
- Remove render-blocking resources

**FID / INP (Interaction to Next Paint) < 200ms**
- Break up long tasks
- Use web workers for heavy computation
- Defer non-critical JavaScript
- Optimize event handlers

**CLS (Cumulative Layout Shift) < 0.1**
- Set explicit dimensions for images and videos
- Reserve space for dynamic content
- Avoid inserting content above existing content
- Use CSS containment

### Image Optimization

Images are typically the biggest performance bottleneck:

\`\`\`html
<Image
  src="/hero.jpg"
  alt="Hero image"
  width={1200}
  height={600}
  priority
  sizes="(max-width: 768px) 100vw, 80vw"
/>
\`\`\`

Use Next.js Image component for automatic optimization, lazy loading, and responsive sizing.

### Code Splitting

Don't ship code users don't need:

- Dynamic imports for route-based splitting
- React.lazy for component-level splitting
- Tree shaking for unused exports
- Bundle analysis to find hidden bloat

### Font Optimization

Fonts can block rendering:

- Use \`next/font\` for automatic optimization
- Subset fonts to include only needed characters
- Use \`font-display: swap\` for immediate text rendering
- Preload critical fonts

### Measuring and Monitoring

Set up continuous performance monitoring:

- Lighthouse CI in your deployment pipeline
- Real User Monitoring (RUM) for field data
- Performance budgets to prevent regression
- Regular audits and optimization sprints

Performance is not a one-time fix. It's an ongoing discipline that requires measurement, monitoring, and continuous improvement.`,
    category: "Performance",
    tags: ["Performance", "Core Web Vitals", "Lighthouse", "Optimization"],
    readTime: "10 min read",
    date: "Nov 2025",
    featured: false,
  },
  {
    slug: "clean-architecture-mern-stack",
    title: "Clean Architecture in MERN Stack Applications",
    excerpt: "Structuring large-scale MERN applications with separation of concerns, dependency injection, and domain-driven design principles.",
    content: `## Why Architecture Matters

A MERN stack application without clear architecture becomes unmaintainable around 50k lines of code. Clean architecture isn't about following rules blindly -- it's about creating systems that are testable, maintainable, and adaptable to change.

### The Dependency Rule

Dependencies should point inward. Your business logic should never depend on frameworks, databases, or UI:

\`\`\`
UI Layer -> Application Layer -> Domain Layer -> Infrastructure Layer
     (depends on)        (depends on)         (depends on nothing)
\`\`\`

### Domain Layer

The core of your application. Pure business logic with zero dependencies:

\`\`\`typescript
// entities/User.ts
export class User {
  constructor(
    public readonly id: string,
    public name: string,
    public email: string,
    private passwordHash: string
  ) {}

  updateProfile(name: string, email: string): void {
    if (!email.includes('@')) throw new DomainError('Invalid email')
    this.name = name
    this.email = email
  }
}
\`\`\`

### Application Layer

Use cases that orchestrate domain objects:

\`\`\`typescript
// use-cases/CreateUser.ts
export class CreateUser {
  constructor(
    private userRepo: UserRepository,
    private hasher: PasswordHasher,
    private emailService: EmailService
  ) {}

  async execute(input: CreateUserInput): Promise<User> {
    const existing = await this.userRepo.findByEmail(input.email)
    if (existing) throw new ApplicationError('Email already exists')

    const hash = await this.hasher.hash(input.password)
    const user = new User(generateId(), input.name, input.email, hash)

    await this.userRepo.save(user)
    await this.emailService.sendWelcome(user)

    return user
  }
}
\`\`\`

### Infrastructure Layer

Concrete implementations of interfaces defined in inner layers:

- MongoDB repositories implementing domain repository interfaces
- Express controllers calling application use cases
- JWT service implementing authentication interfaces

### Folder Structure

\`\`\`
src/
  domain/
    entities/
    value-objects/
    repositories/ (interfaces)
    errors/
  application/
    use-cases/
    services/ (interfaces)
  infrastructure/
    database/
    api/
    services/
  presentation/
    controllers/
    middleware/
    routes/
\`\`\`

### Testing Strategy

Clean architecture makes testing straightforward:

- **Unit tests** for domain entities and value objects
- **Integration tests** for use cases with mocked infrastructure
- **E2E tests** for critical user flows

The investment in architecture pays dividends when you need to swap a database, add a new API, or onboard new developers. Structure is what scales.`,
    category: "Architecture",
    tags: ["Architecture", "MERN", "Clean Code", "Design Patterns"],
    readTime: "15 min read",
    date: "Oct 2025",
    featured: true,
  },
  {
    slug: "typescript-patterns-real-world",
    title: "TypeScript Patterns That Actually Matter",
    excerpt: "Moving beyond basic types into discriminated unions, branded types, type-safe error handling, and advanced generic patterns for real-world applications.",
    content: `## TypeScript Beyond the Basics

Most TypeScript tutorials stop at interfaces and generics. But the real power of TypeScript lies in patterns that eliminate entire categories of bugs at compile time.

### Discriminated Unions

The most useful pattern for handling different states:

\`\`\`typescript
type ApiResult<T> =
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error }

function handleResult<T>(result: ApiResult<T>) {
  switch (result.status) {
    case 'loading':
      return <Spinner />
    case 'success':
      return <DataView data={result.data} />
    case 'error':
      return <ErrorView error={result.error} />
  }
}
\`\`\`

TypeScript narrows the type in each branch automatically.

### Branded Types

Prevent mixing up values that share the same primitive type:

\`\`\`typescript
type UserId = string & { readonly __brand: 'UserId' }
type OrderId = string & { readonly __brand: 'OrderId' }

function getUser(id: UserId): Promise<User> { /* ... */ }
function getOrder(id: OrderId): Promise<Order> { /* ... */ }

// Compiler error: can't pass OrderId where UserId expected
getUser(orderId) // Type error!
\`\`\`

### Type-Safe Error Handling

Replace try-catch with explicit error types:

\`\`\`typescript
type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E }

async function parseConfig(path: string): Promise<Result<Config, ParseError>> {
  try {
    const raw = await readFile(path)
    const config = JSON.parse(raw)
    return { ok: true, value: config }
  } catch (e) {
    return { ok: false, error: new ParseError(e.message) }
  }
}
\`\`\`

These patterns aren't academic exercises. They're practical tools that make your codebase more reliable, self-documenting, and easier to refactor. The type system is your most powerful testing tool -- use it.`,
    category: "Frontend",
    tags: ["TypeScript", "Patterns", "Type Safety", "Best Practices"],
    readTime: "9 min read",
    date: "Sep 2025",
    featured: false,
  },
]

export const categories = [...new Set(blogPosts.map((p) => p.category))]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}

export function getPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter((p) => p.category === category)
}

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter((p) => p.featured)
}
