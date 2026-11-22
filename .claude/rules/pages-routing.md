---
paths:
  - "app/pages/**/*.vue"
  - "app/layouts/**/*.vue"
  - "app/middleware/**/*.ts"
  - "nuxt.config.ts"
---

# Páginas e roteamento

- Rotas por arquivo em `app/pages/`. Slugs em inglês (`/blog`, `/projects`, `/about`);
  o i18n adiciona `/en` automaticamente (estratégia `prefix_except_default`, padrão `pt-BR`).
- Páginas são finas: buscam dados e compõem componentes. Lógica vai para composables.
- Toda página:
  1. define SEO com `useSeoMeta({ title, description, ogTitle, ogDescription, ogImage? })`
     usando `t()` — nunca string fixa;
  2. funciona em `pt-BR` e `en`;
  3. usa o layout `default` salvo motivo explícito (`definePageMeta({ layout: '...' })`).
- Dados: `useAsyncData('chave-estavel', () => ...)` ou `useFetch`. A key inclui o locale e o
  slug quando dependem deles: `` `blog-${locale.value}-${slug}` ``. Inclua `watch: [locale]`
  quando o resultado depende do idioma.
- Em Nuxt 4, `data` começa `undefined` (não `null`). Trate 404:
  ```ts
  if (!page.value) throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
  ```
- Rotas dinâmicas: `[slug].vue`; catch-all `[...slug].vue` só se necessário.
- `routeRules` em `nuxt.config.ts` controla renderização. Padrão do site: **prerender** de tudo
  que é conteúdo (`'/**': { prerender: true }` ou por seção) — o servidor Node só atende o que
  não puder ser estático.
- `app/error.vue` trata 404/500 com texto traduzido e link para a home.
- **Head global** (titleTemplate, favicon, script do tema, `useLocaleHead`) fica em
  `app/layouts/default.vue`, não no `app.vue`: o `error.vue` substitui o `app.vue` e perderia
  tudo isso. Toda página nova e o `error.vue` usam esse layout.
- Não crie middleware de auth — não há área logada.
- `nuxt.config.ts`: a ordem das chaves é imposta pelo ESLint (`nuxt/nuxt-config-keys-order`) —
  rode `pnpm lint:fix`. Comente apenas o não óbvio. Variáveis de build vêm do schema zod no topo
  do arquivo.
- Prerender: `nitro.prerender.crawlLinks` descobre as rotas a partir de `/` e `/en`, com
  `failOnError: true` — link interno quebrado faz o `pnpm build` falhar. Página nova precisa
  estar linkada de algum lugar (ou ser adicionada em `nitro.prerender.routes`).
