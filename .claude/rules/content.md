---
paths:
  - "content/**"
  - "content.config.ts"
  - "app/components/content/**"
  - "app/pages/blog/**"
  - "app/pages/projects/**"
---

# Conteúdo (Nuxt Content 3)

- Conteúdo é Markdown/MDC no repositório. Sem CMS, sem painel admin.
- Estrutura por locale, **mesmo nome de arquivo nos dois idiomas**:
  ```
  content/pt-BR/blog/2026-11-meu-post.md
  content/en/blog/2026-11-meu-post.md
  content/pt-BR/projects/jfdev.md
  content/en/projects/jfdev.md
  ```
- Coleções definidas em `content.config.ts`, uma por tipo **e** locale
  (ex.: `blog_pt`, `blog_en`, `projects_pt`, `projects_en`), cada uma com `source.include`
  do seu diretório e `prefix` para gerar paths sem o locale. Acesse via composable
  `useLocaleCollection('blog')`, que escolhe a coleção do locale atual — páginas não montam
  o nome da coleção na mão.
- **Todo** campo de frontmatter é validado por schema (zod) na coleção. Campo novo → atualize
  o schema primeiro. Frontmatter base:
  - blog: `title`, `description`, `date` (ISO), `tags: string[]`, `draft?: boolean`,
    `cover?: string`, `coverAlt?: string`
  - projects: `title`, `description`, `date`, `stack: string[]`, `repo?: url`, `url?: url`,
    `featured?: boolean`, `cover?`, `coverAlt?`
- `draft: true` não aparece em produção (filtrar na query) e não é prerenderizado.
- Queries: `queryCollection(name).path(path).first()`, listagens com `.order('date', 'DESC')`
  e `.select(...)` só dos campos usados. Sempre dentro de `useAsyncData` com key estável.
- Renderização: `<ContentRenderer :value="page" />`. Estilos de prose em `main.css`
  (camada de prose com tokens) — não espalhe classes no Markdown.
- Componentes usados no Markdown (MDC) vão em `app/components/content/` (globais) e também
  seguem as regras de componentes/i18n.
- Imagens de posts: `public/images/<tipo>/<slug>/...` e sempre com alt descritivo no Markdown.
- Datas dos arquivos em formato `YYYY-MM` no slug para posts; slugs em kebab-case sem acento.
- **Todo conteúdo existe nos dois idiomas, sempre.** Criar, editar, renomear ou apagar um
  arquivo em `content/pt-BR/` exige a mesma operação em `content/en/` (e vice-versa) na mesma
  alteração. Mudou o texto de um lado → atualize a tradução do outro. `draft` deve ter o mesmo
  valor nas duas versões. `tests/unit/contentParity.test.ts` falha se faltar um par.
- Se o José mandar o texto em um idioma só, traduza o outro (adaptando, não literal) e diga
  na resposta que a tradução é sua, para ele revisar.
