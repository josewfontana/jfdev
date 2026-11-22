---
paths:
  - "app/pages/**/*.vue"
  - "app/layouts/**/*.vue"
  - "app/app.vue"
  - "app/components/**/*.vue"
  - "public/**"
---

# SEO, acessibilidade e performance

## SEO
- `useSeoMeta` em toda página (title ≤ 60, description 120–160 caracteres), traduzido.
- `titleTemplate` global no `app.vue`/config: `%s · José Fontana`.
- `useLocaleHead()` no layout: `<html lang>`, `hreflang` alternates e canonical.
- Open Graph: `ogTitle`, `ogDescription`, `ogImage` (1200×630) e `twitterCard`.
- Posts: dados estruturados `BlogPosting` (JSON-LD via `useHead`), datas ISO.
- `sitemap.xml` e `robots.txt` cobrindo os dois locales. Drafts fora.
- `site.url` canônico vem de runtimeConfig (`NUXT_PUBLIC_SITE_URL`).

## Acessibilidade (WCAG 2.2 AA)
- Um `<h1>` por página, hierarquia de headings sem pular níveis.
- Landmarks: `<header>`, `<nav aria-label>`, `<main id="main">`, `<footer>`; link
  "pular para o conteúdo" no layout.
- Contraste AA nos dois temas. Foco visível. Alvos de toque ≥ 24×24px.
- Ícones sem texto têm `aria-label`; decorativos têm `aria-hidden="true"`.
- Movimento respeita `prefers-reduced-motion`.
- Troca de idioma e tema acessíveis por teclado e com rótulo traduzido.

## Performance
- Meta: Lighthouse ≥ 95 em todas as categorias, LCP < 2.5s, CLS < 0.1.
- Prerender sempre que possível. Zero JS de cliente que não seja necessário.
- Imagens: `<NuxtImg>`/`<NuxtPicture>` com `width`/`height`, `format="webp"`/avif,
  `loading="lazy"` exceto a imagem LCP (`preload`, `fetchpriority="high"`).
- Fontes: exatamente Space Grotesk + DM Sans, variáveis, self-hosted via Fontsource
  (`font-display: swap` e `unicode-range` por subset já vêm no CSS do pacote). Nada de
  Google Fonts por `<link>`.
- Sem bibliotecas pesadas para coisas que CSS/Vue resolvem (animação, carrossel). Ícones só
  `@lucide/vue` com import nomeado (cada ícone é tree-shaken).
- Componentes pesados abaixo da dobra: prefixo `Lazy` (`<LazyProjectsGallery>`).
