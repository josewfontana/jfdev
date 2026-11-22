# AGENTS.md — jfdev

Site pessoal do José Fontana. Este arquivo é a **fonte da verdade** para qualquer agente de IA
(Claude Code, Codex, Cursor, Copilot etc.). Regras detalhadas por área ficam em `.claude/rules/`
— leia a regra da área antes de editar arquivos dela, mesmo que sua ferramenta não as carregue
automaticamente.

## Regra fundamental: o site é SEMPRE bilíngue (pt-BR + en)

Todo o site existe **sempre** em português (`pt-BR`, padrão, em `/`) **e** inglês (`en`, em
`/en`). Não existe página, texto de interface, post, projeto, meta de SEO, `alt` ou mensagem
de erro em um idioma só — nem temporariamente, nem "para traduzir depois".

- Se o José escrever algo em um idioma só, traduza para o outro na mesma alteração e
  sinalize na resposta que a tradução é sua, para ele revisar.
- Não adicione nem remova idiomas.
- Isso é verificado: ESLint (`no-missing-keys-in-other-locales`), `tests/unit/i18nParity`
  (textos de UI) e `tests/unit/contentParity` (posts/projetos). Não desative.

## Stack (não troque sem pedir)

| Camada        | Escolha                                                            |
| ------------- | ------------------------------------------------------------------ |
| Framework     | **Nuxt 4** (estrutura `app/`), Vue 3 `<script setup lang="ts">`     |
| Linguagem     | TypeScript **6.x** estrito — sem `any`, sem `unknown`, sem casting  |
| Estilo        | **Tailwind CSS v4 puro** via `@tailwindcss/vite` — sem lib de UI   |
| Design tokens | CSS variables JFDEV em `app/assets/css/main.css`: cores `brand-*` (identidade) + semânticas (UI, claro/escuro), fontes, espaçamentos, raios, motion |
| Animações     | CSS + `<Transition>` do Vue — sem biblioteca de animação           |
| Ícones        | **`@lucide/vue`** (imports nomeados `XxxIcon`)                     |
| Fontes        | **Space Grotesk** (títulos) + **DM Sans** (texto), self-hosted via `@fontsource-variable` |
| Conteúdo      | **Nuxt Content 3** (Markdown no repo, sem painel admin)            |
| i18n          | **@nuxtjs/i18n** — `pt-BR` (padrão, sem prefixo) e `en` (`/en/...`) |
| Imagens       | `@nuxt/image` (`<NuxtImg>` / `<NuxtPicture>`)                       |
| Lint/format   | `@nuxt/eslint` com stylistic (sem Prettier)                        |
| Testes        | Vitest + `@nuxt/test-utils`                                         |
| Pacotes       | **pnpm** (nunca npm/yarn; não gere `package-lock.json`)            |
| Runtime       | Node.js ≥ 22 (dev atual: 26)                                       |
| Deploy        | VPS própria: preset Nitro `node-server` atrás de reverse proxy     |

**Não atualize o TypeScript para 7.x**: o TS 7 é o compilador nativo (Go) e não traz a API JS
que o `vue-tsc` usa — o `pnpm typecheck` quebra. Mantenha `typescript@^6` até o vue-tsc suportar.

Não adicione dependências novas sem justificar no PR/resposta. Prefira o que Nuxt/Vue/Tailwind
já oferecem. Não há painel admin, banco externo nem autenticação — não crie.

## Comandos

```bash
pnpm install          # instalar
pnpm dev              # servidor de dev (http://localhost:3000)
pnpm lint             # ESLint
pnpm lint:fix         # ESLint com auto-fix
pnpm typecheck        # nuxt typecheck (vue-tsc)
pnpm test             # Vitest (run único)
pnpm check            # lint + typecheck + test — rode antes de dizer que terminou
pnpm build            # build de produção → .output/
pnpm preview          # roda o build localmente
```

## Estrutura

```
app/
  app.vue               # raiz: <NuxtLayout><NuxtPage/></NuxtLayout> (só isso)
  error.vue             # 404/500 traduzidos, usa o layout default
  assets/css/main.css   # @import "tailwindcss" + @theme (design tokens)
  types/i18n.d.ts       # tipagem das mensagens + tipo global MessageKey
  components/           # auto-import; pasta vira prefixo (ui/Button.vue → <UiButton>)
    ui/                 # primitivos visuais sem lógica de negócio
    layout/             # header, footer, nav
    content/            # componentes MDC usados dentro do Markdown (Prose*, callouts)
  composables/          # useXxx() — auto-import
  layouts/              # default.vue etc.
  pages/                # rotas por arquivo
  utils/                # funções puras — auto-import
content/
  pt-BR/                # conteúdo em português (blog/, projects/)
  en/                   # mesmo slug, versão em inglês
content.config.ts       # coleções + schemas
i18n/locales/           # pt-BR.json, en.json (textos de UI)
server/                 # Nitro: api/, routes/ (ex.: sitemap, rss) — mínimo possível
shared/                 # tipos/utils isomórficos (shared/utils e shared/types são auto-importados)
public/                 # estáticos servidos na raiz (favicon, robots.txt)
tests/                  # testes unitários e de componente
```

## Convenções gerais

- **Código em inglês** (nomes, comentários, commits). **Texto de UI nunca hardcoded**: vai em
  `i18n/locales/*.json`. Conteúdo editorial vai em `content/<locale>/`.
- Componentes: `PascalCase.vue`, sempre `<script setup lang="ts">`, props/emits tipados com
  generics (`defineProps<{...}>()`, `defineEmits<{...}>()`), `defineModel` para v-model.
- Ordem dos blocos no SFC: `<script setup>` → `<template>` → `<style>` (raro; prefira Tailwind).
- **TypeScript bem tipado** (detalhes em `.claude/rules/typescript.md`): tipos de domínio
  primeiro, em `shared/types/`; tipos derivados de uma fonte única (`z.infer`, `as const`,
  tipos gerados); dados externos validados com zod; unions discriminadas com checagem
  exaustiva. Proibidos: `any`, `unknown`, `as T` (só `as const`), `!` e `@ts-ignore`/`@ts-expect-error`.
- Composables: `useCamelCase.ts`, retornam objeto com refs; sem efeitos colaterais no import.
- Confie nos auto-imports do Nuxt (não importe `ref`, `computed`, `useRoute`, componentes etc.).
  Importe explicitamente apenas o que vem de pacotes externos ou `#shared`.
- Dados: `useAsyncData`/`useFetch` com **key estável**; nunca `fetch` cru em componentes.
- Links internos: `<NuxtLinkLocale>` (ou `useLocalePath()`), nunca `<a href>` nem caminho fixo.
- Toda página define SEO com `useSeoMeta` (title, description, og:*) com textos traduzidos.
- Acessibilidade é requisito: HTML semântico, `alt` em imagens, foco visível, contraste AA,
  respeitar `prefers-reduced-motion` e `prefers-color-scheme`.
- Performance: prefira prerender (`routeRules`), imagens via `@nuxt/image`, sem JS desnecessário
  no cliente (`<ClientOnly>` só quando inevitável), fontes self-hosted.
- Segredos só via `runtimeConfig` + variáveis `NUXT_*` no ambiente. Nunca commitar `.env`.
  `process.env` só é lido em `nuxt.config.ts`, e sempre validado por schema zod.
- O que é verificado automaticamente (não desative):
  - **TypeScript** (`pnpm typecheck`): strict + `noUncheckedIndexedAccess`; chaves i18n
    guardadas em variáveis tipadas como `MessageKey`.
  - **ESLint** (`pnpm lint`): `any`, `unknown`, casts, `!`, `@ts-*`, `console`; chaves i18n
    inexistentes em `t()`/`$t()`, chaves faltando em um idioma, **texto hardcoded em template**
    (`no-raw-text`), `v-html`; ordem das chaves do `nuxt.config.ts`.
  - **Vitest** (`pnpm test`): paridade e não-vazio dos JSON de i18n, lógica de tema.

## Regras por área (`.claude/rules/`)

| Arquivo                  | Quando ler                                          |
| ------------------------ | --------------------------------------------------- |
| `vue-components.md`      | qualquer `.vue` em `app/components`, `app/layouts`  |
| `pages-routing.md`       | `app/pages/**`, `app/app.vue`, `nuxt.config.ts`     |
| `styling-tailwind.md`    | classes Tailwind, `app/assets/css/**`               |
| `i18n.md`                | `i18n/**`, qualquer texto visível ao usuário        |
| `content.md`             | `content/**`, `content.config.ts`, `app/components/content/**` |
| `typescript.md`          | qualquer `.ts`/`.vue`                               |
| `server.md`              | `server/**`, `shared/**`                            |
| `testing.md`             | `tests/**`, `*.test.ts`, `*.spec.ts`                |
| `seo-a11y-perf.md`       | páginas, layouts, imagens, meta                     |
| `deploy-vps.md`          | `nuxt.config.ts` (nitro), scripts de deploy, CI     |

## Definition of Done

Uma tarefa só está pronta quando:

1. `pnpm check` passa (lint + typecheck + test) — se algo falhar, reporte a saída, não esconda.
2. Textos novos existem em **pt-BR e en**.
3. Páginas novas têm `useSeoMeta` e funcionam em `/` e `/en/`.
4. Nenhum `console.log`, `any`, `unknown`, cast (`as T`), `!`, código comentado ou TODO sem
   contexto ficou para trás.
5. Mudanças visuais foram vistas no navegador (`pnpm dev`) em mobile (≤ 375px) e desktop,
   tema claro e escuro.

## Git

- Conventional Commits em inglês: `feat(blog): add reading time`, `fix(i18n): ...`, `chore: ...`.
- Não commite nem faça push sem o dono pedir. Se estiver em `main`, crie branch antes.
- Commits pequenos e focados; não misture refactor com feature.
