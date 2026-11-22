import { useLogger } from '@nuxt/kit'
import tailwindcss from '@tailwindcss/vite'
import { z } from 'zod'
import { ga4IdSchema } from './shared/utils/consent'

/**
 * Build-time environment. Content routes are prerendered during `nuxt build`,
 * so the canonical site URL must be correct at build time, not only at runtime.
 */
const env = z
  .object({
    NUXT_PUBLIC_SITE_URL: z.url().default('http://localhost:3000'),
    // Empty disables Google Analytics. Baked into prerendered pages at build time.
    NUXT_PUBLIC_GA4_ID: z.union([ga4IdSchema, z.literal('')]).default(''),
  })
  .parse(process.env)

const siteUrl = env.NUXT_PUBLIC_SITE_URL.replace(/\/$/, '')

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/content',
    '@nuxtjs/i18n',
    '@nuxt/image',
    '@nuxt/test-utils/module',
  ],

  devtools: { enabled: true },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  css: [
    // Self-hosted variable fonts (bundled from npm, no third-party requests)
    '@fontsource-variable/space-grotesk/wght.css',
    '@fontsource-variable/dm-sans/wght.css',
    '~/assets/css/main.css',
  ],

  content: {
    experimental: {
      // Node >= 22.5 ships `node:sqlite`; avoids a native better-sqlite3 build on the VPS.
      sqliteConnector: 'native',
    },
  },

  runtimeConfig: {
    public: {
      siteUrl,
      ga4Id: env.NUXT_PUBLIC_GA4_ID,
    },
  },

  routeRules: {
    '/**': { prerender: true, headers: { 'Referrer-Policy': 'no-referrer' } },
  },

  compatibilityDate: '2026-11-01',

  nitro: {
    preset: 'node-server',
    prerender: {
      crawlLinks: true,
      routes: ['/', '/en'],
      failOnError: true,
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  typescript: {
    tsConfig: {
      compilerOptions: {
        strict: true,
        noUncheckedIndexedAccess: true,
        noImplicitOverride: true,
        noImplicitReturns: true,
        noFallthroughCasesInSwitch: true,
        useUnknownInCatchVariables: true,
      },
    },
  },

  hooks: {
    'nitro:build:before'(nitro) {
      if (!nitro.options.dev && new URL(siteUrl).hostname === 'localhost') {
        useLogger('jfdev').warn(
          `Production build with NUXT_PUBLIC_SITE_URL=${siteUrl}: canonical, hreflang and OG URLs will point to localhost. Set the real domain before deploying.`,
        )
      }
    },
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  i18n: {
    baseUrl: siteUrl,
    defaultLocale: 'pt-BR',
    strategy: 'prefix_except_default',
    locales: [
      { code: 'pt-BR', language: 'pt-BR', name: 'Português', file: 'pt-BR.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
    ],
    detectBrowserLanguage: false,
  },
})
