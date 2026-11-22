---
paths:
  - "server/**"
  - "shared/**"
---

# Server (Nitro) e shared

- O site é majoritariamente estático. Só crie rota de servidor quando o cliente não puder
  resolver e o prerender não bastar. Candidatos legítimos: `server/routes/rss.xml.ts`,
  `sitemap.xml`, formulário de contato.
- Handlers com `defineEventHandler`; valide entrada com `getValidatedQuery` /
  `readValidatedBody` + zod. Nunca confie em input.
- Erros: `throw createError({ statusCode, statusMessage })`.
- Configuração/segredos via `useRuntimeConfig(event)`; variáveis de ambiente `NUXT_*`.
  Nunca leia `process.env` direto nem hardcode chaves (a única leitura de `process.env` do
  projeto é o schema zod no topo do `nuxt.config.ts`).
- Endpoints públicos que escrevem/enviam algo (ex.: contato) precisam de rate limit e
  proteção anti-spam (honeypot no mínimo).
- `shared/` contém só código isomórfico (sem `window`, sem APIs Node) — tipos e utils puros.
- Rotas cacheáveis: defina `routeRules` (`prerender`, `swr`, headers de cache) em vez de
  cache manual.
