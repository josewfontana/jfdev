# jfdev

Personal website of José Fontana — Nuxt 4, Tailwind CSS v4, Nuxt Content and i18n (pt-BR / en).

## Setup

```bash
cp .env.example .env   # adjust NUXT_PUBLIC_SITE_URL
pnpm install
pnpm dev               # http://localhost:3000
```

## Scripts

| Command          | What it does                                  |
| ---------------- | --------------------------------------------- |
| `pnpm dev`       | Dev server                                    |
| `pnpm check`     | Lint + typecheck + tests                      |
| `pnpm build`     | Production build (prerenders pages) → `.output/` |
| `pnpm preview`   | Serve the production build locally            |

Production runs with `node .output/server/index.mjs` behind a reverse proxy.
Conventions for humans and AI agents live in [`AGENTS.md`](./AGENTS.md).

## Production

Use Node.js 22.5 or newer and build for the same OS and architecture as the VPS
so the bundled image optimizer can run there. Set `NUXT_PUBLIC_SITE_URL` at
build time. Set `NUXT_PUBLIC_GA4_ID` at build time to enable analytics on the
release. Leave it empty for preview environments. The Nitro process can bind
to `NITRO_HOST` and `NITRO_PORT` behind the reverse proxy.

The site prerenders its public pages to `.output/public/`. The current pages
can be served from that directory by a static host configured to serve directory
indexes and a custom 404 page. The configured VPS deploy uses Nitro and
also serves Nuxt Content and on-demand image optimization endpoints. Contact
actions open email or WhatsApp.

Before enabling analytics, turn off Enhanced Measurement for the GA4 web stream
and automatic event detection for the Google tag, including history page views,
outbound clicks and form interactions. Verify user-provided data collection and
advertising destinations are disabled. The app sends its own page views.

Use Tag Assistant with DebugView or Realtime to check one page view after
acceptance and one per page navigation. Query strings, anchors and project
slugs should stay out of the reported URL, and referrers should be absent.
Check the browser network log for zero tag or collection requests before
acceptance, after rejection and after revocation.
