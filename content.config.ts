import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'
import { PROJECT_CATEGORIES, PROJECT_TONES } from './shared/utils/project'

const blogSchema = z.object({
  date: z.iso.date(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
  cover: z.string().optional(),
  coverAlt: z.string().optional(),
})

const projectSchema = z.object({
  date: z.iso.date(),
  stack: z.array(z.string()).default([]),
  repo: z.url().optional(),
  url: z.url().optional(),
  featured: z.boolean().default(false),
  cover: z.string().optional(),
  coverAlt: z.string().optional(),
  // Card (projects list)
  category: z.enum(PROJECT_CATEGORIES),
  tag: z.string(),
  symbol: z.string(),
  tone: z.enum(PROJECT_TONES).default('teal'),
  // Case study page; the Markdown body is the "stack & engineering" text.
  titleHighlight: z.string(),
  overline: z.string(),
  caseNumber: z.string(),
  contextTitle: z.string(),
  contextLead: z.string(),
  challenge: z.string(),
  approach: z.string(),
  capabilities: z.array(z.object({
    label: z.string(),
    title: z.string(),
    text: z.string(),
  })).default([]),
  stackTitle: z.string(),
  note: z.string().optional(),
})

/**
 * One collection per content type and locale. `prefix` makes each item's `path`
 * equal to its public route (`/blog/slug` for pt-BR, `/en/blog/slug` for en),
 * so pages can query with `.path(route.path)`.
 */
export default defineContentConfig({
  collections: {
    blog_pt: defineCollection({
      type: 'page',
      source: { include: 'pt-BR/blog/**/*.md', prefix: '/blog' },
      schema: blogSchema,
    }),
    blog_en: defineCollection({
      type: 'page',
      source: { include: 'en/blog/**/*.md', prefix: '/en/blog' },
      schema: blogSchema,
    }),
    projects_pt: defineCollection({
      type: 'page',
      source: { include: 'pt-BR/projects/**/*.md', prefix: '/projects' },
      schema: projectSchema,
    }),
    projects_en: defineCollection({
      type: 'page',
      source: { include: 'en/projects/**/*.md', prefix: '/en/projects' },
      schema: projectSchema,
    }),
  },
})
