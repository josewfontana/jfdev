---
paths:
  - "nuxt.config.ts"
  - "deploy/**"
  - "ecosystem.config.*"
  - ".github/workflows/**"
  - "Dockerfile"
---

# Deploy na VPS

- Preset Nitro: `node-server` (padrão). `pnpm build` gera `.output/`; produção roda
  `node .output/server/index.mjs` (usa `PORT`/`HOST` ou `NITRO_PORT`/`NITRO_HOST`).
- Rotas de conteúdo são prerenderizadas no build (`routeRules`/`nitro.prerender`); o Node
  serve os HTML/estáticos gerados e as poucas rotas dinâmicas.
- Nuxt Content em runtime usa SQLite pelo conector nativo do Node
  (`content.experimental.sqliteConnector: 'native'`, já configurado) — sem binário nativo.
- **`NUXT_PUBLIC_SITE_URL` precisa estar definido no ambiente do build**, não só no runtime:
  canonical, hreflang e OG são gravados no HTML prerenderizado. O build avisa (`[jfdev] WARN`)
  se a URL for localhost.
- **Faça o build na própria VPS (ou na mesma arquitetura)**: o `@nuxt/image` empacota os
  binários do `sharp` da plataforma onde o build rodou (ex.: linux-x64).
- Processo gerenciado por **systemd** (ou PM2) com restart automático; reverse proxy
  (nginx/Caddy) faz TLS do domínio, gzip/brotli e cache longo para `/_nuxt/*` (imutável).
- Arquivos de infra versionados em `deploy/` (unit do systemd, config do proxy, script de
  release) — **sem segredos**. Segredos ficam no `.env` da VPS, fora do repo.
- Release atômico: build em diretório novo (`releases/<timestamp>`), troca de symlink
  `current`, restart do serviço; manter as últimas releases para rollback.
- Nunca rode comandos na VPS (ssh, rsync, restart) sem o José pedir explicitamente.
- Variáveis obrigatórias documentadas em `.env.example`.
