---
paths:
  - "app/**/*.vue"
  - "app/assets/css/**"
---

# Estilo — Tailwind CSS v4 puro

- Tailwind v4 via plugin Vite `@tailwindcss/vite` no `nuxt.config.ts`. **Não** use
  `@nuxtjs/tailwindcss` (é v3) nem crie `tailwind.config.js` — v4 é configurado em CSS.
- Entrada única: `app/assets/css/main.css`:
  ```css
  @import "tailwindcss";
  @custom-variant dark (&:where(.dark, .dark *));
  @theme { /* tokens */ }
  ```
## Cores JFDEV

A paleta padrão do Tailwind foi **removida** (`--color-*: initial`): `bg-zinc-900` não existe.
Só há duas famílias de cor em `main.css`:

1. **Marca (`brand-*`)** — em `@theme`, **iguais nos dois temas**:
   `brand-charcoal` #242725, `brand-ivory` #F5F0E7, `brand-teal` #507F78,
   `brand-deep-teal` #004B49, `brand-terracotta` #C46F56.
2. **Semânticos** — valores em `:root` (claro) e `.dark` (escuro), expostos em `@theme inline`:
   `background`, `surface`, `surface-elevated`, `foreground`, `foreground-inverse`,
   `text-muted`, `primary`, `primary-foreground`, `primary-hover`, `accent`, `border-default`.
   Classes: `bg-background`, `bg-surface`, `text-foreground`, `text-text-muted`,
   `bg-primary text-primary-foreground hover:bg-primary-hover`, `border-border-default`...

**Regra:** `brand-*` só quando a cor **é** a identidade JFDEV (faixas de hero/rodapé, logo,
detalhes de marca). Todo elemento funcional de interface usa **token semântico** — assim um
ajuste de tema muda um lugar só.

| Uso                        | Token                                              |
| -------------------------- | -------------------------------------------------- |
| Hero e rodapé              | `bg-brand-charcoal` + texto `text-brand-ivory`     |
| Fundo de seções claras     | `bg-background` (ivory no claro)                   |
| Cards                      | `bg-surface` (`bg-surface-elevated` p/ hover/destaque) |
| Botões principais          | `bg-primary text-primary-foreground`               |
| Hover dos botões           | `hover:bg-primary-hover`                           |
| Elementos de destaque      | `accent` (ver restrição abaixo)                    |
| Texto principal            | `text-foreground`                                  |
| Texto secundário           | `text-text-muted`                                  |
| Bordas discretas           | `border-border-default`                            |

**Restrições de contraste (WCAG AA — já calculadas):**
- Faixas `brand-charcoal` usam `text-brand-ivory` (13,3:1) e `text-brand-ivory/75` para texto
  secundário (8,1:1). **Nunca** `text-foreground-inverse` nelas: no tema escuro ele vira
  charcoal e o texto some.
- `accent` no tema claro (#C46F56) tem 3,2:1 sobre o fundo: só **decorativo** (filetes,
  ícones, marcadores) ou texto grande (≥ 24px, ou ≥ 18,66px bold). Texto pequeno de destaque
  → `text-primary`. No escuro o accent é #E5A28D (7,1:1) e serve para texto.
- `brand-terracotta` sobre charcoal tem 4,1:1: só decorativo.
- `border-default` (1,2:1 no claro) é para bordas **decorativas**. Borda que identifica um
  controle (input, checkbox) precisa de 3:1 — use `border-text-muted` ou crie token.
- Cor nova → token semântico nos **dois** temas em `main.css`, com contraste calculado e
  anotado no comentário do bloco.

## Tema e demais tokens

- Dark mode por classe `.dark` no `<html>` (toggle + `prefers-color-scheme` como padrão).
  Tokens semânticos trocam de valor sob `.dark`, então componentes raramente precisam de `dark:`.
- **Demais tokens JFDEV** (em `@theme` no `main.css`) — use-os em vez de valores
  avulsos sempre que o caso for de layout/identidade:
  - container padrão: componente `<LayoutContainer>` (`max-w-content` + gutters). Páginas
    montam suas próprias faixas full-width e colocam o `LayoutContainer` dentro; o `<main>` do
    layout não tem padding.
  - largura do conteúdo: `max-w-content`
  - respiro lateral: `px-gutter sm:px-gutter-lg`; seções: `py-section sm:py-section-lg`
  - raios: `rounded-control` (botões, inputs, links-botão), `rounded-card` (cards)
  - motion: `transition-*` já usa duração 180ms e `--ease-out-soft` por padrão
  Espaçamentos internos pequenos (`gap-2`, `px-2`) seguem a escala normal do Tailwind.
- **Tipografia**: `font-heading` (Space Grotesk) para títulos, nome/marca e destaques;
  `font-body` (DM Sans) para todo o resto — é o padrão do `<html>`. `h1`–`h4` já recebem
  `font-heading` na camada base. `font-mono` só para código/números técnicos. Não adicione
  outras famílias.
  Fontes são self-hosted via `@fontsource-variable/*` (CSS no `css` do `nuxt.config.ts`).
- Mobile-first: estilos base para mobile, breakpoints (`sm: md: lg:`) para crescer.
  Testar em 375px. Sem scroll horizontal.
- Ordem de classes: deixe o ESLint/ordem natural; agrupe layout → box → tipografia → cor →
  estados. Classes longas repetidas em 3+ lugares → vire componente (não `@apply`).
- `@apply` só em `main.css` (camada base e prose/markdown); nunca em componentes.
- O Tailwind **ignora em silêncio** classe que não existe (ex.: token renomeado) e o lint não
  pega. Ao mexer em tokens, confira no CSS do build que as classes usadas existem.
- Classes dinâmicas: nunca concatene nomes (`` `text-${color}-500` `` não é detectado).
  Use mapas de objetos com classes completas.
- **Animações: CSS + Vue**, sem bibliotecas (GSAP, motion etc.):
  - microinterações simples (hover, foco): utilitários `transition-colors`/`transition-opacity`;
  - entrada/saída/troca de elementos: `<Transition name="...">` do Vue com as classes
    `.<name>-enter-active` etc. definidas em `main.css`, **dentro de**
    `@media (prefers-reduced-motion: no-preference)` — com movimento reduzido, troca instantânea;
  - transição de rota: `app.pageTransition` (`page`) já configurada;
  - existentes: `page` (rotas) e `icon-swap` (troca de ícone). Reutilize antes de criar outra.
  - anime só `opacity`/`transform` (sem layout shift), duração ≤ 300ms.
- Foco: `focus-visible:outline-*` visível em todo interativo.
- `<style scoped>` só para o que Tailwind não cobre bem (ex.: keyframes muito específicos).
