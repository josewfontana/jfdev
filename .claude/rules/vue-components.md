---
paths:
  - "app/components/**/*.vue"
  - "app/layouts/**/*.vue"
  - "app/app.vue"
  - "app/error.vue"
---

# Componentes Vue

- Sempre `<script setup lang="ts">`. Nada de Options API, `defineComponent` ou `export default`.
- Ordem: `<script setup>` → `<template>` → `<style>` (evite `<style>`; use Tailwind).
- Props tipadas por generic, com defaults via destructuring reativo (Vue 3.5+):
  ```ts
  const { variant = 'primary', size = 'md' } = defineProps<{
    variant?: 'primary' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
  }>()
  ```
- Emits tipados: `const emit = defineEmits<{ close: [] ; select: [id: string] }>()`.
- `v-model` → `defineModel<T>()`. Slots tipados com `defineSlots` quando o componente expõe slots.
- Nome de arquivo `PascalCase.vue`. A pasta vira prefixo do auto-import:
  `components/ui/Button.vue` → `<UiButton>`. Não repita o prefixo no nome (`ui/UiButton.vue` ✗).
- Pastas: `ui/` (primitivos: Button, Card, Tag), `layout/` (Header, Footer, Nav,
  LocaleSwitcher, ThemeToggle), `content/` (componentes MDC), e pastas por domínio
  (`blog/`, `projects/`) para o resto.
- Componentes pequenos e de responsabilidade única. Se o template passar de ~120 linhas, quebre.
- Lógica reutilizável vai para `app/composables/`; funções puras para `app/utils/`.
- Não importe o que o Nuxt auto-importa (`ref`, `computed`, `watch`, `useRoute`, componentes...).
- Nenhum texto visível hardcoded: use `$t('key')` no template ou `t()` de `useI18n()`.
- Links: `<NuxtLinkLocale to="/blog">`. Externos: `<a href target="_blank" rel="noopener">`
  com indicação acessível de que abre em nova aba.
- Imagens: `<NuxtImg>` com `width`/`height` e `alt` (vazio `alt=""` só se decorativa).
- **Ícones: só `@lucide/vue`**, com import nomeado de sufixo `Icon` (tree-shaking):
  ```ts
  import { GlobeIcon } from '@lucide/vue'
  ```
  ```vue
  <GlobeIcon :size="16" aria-hidden="true" />
  ```
  - ícone decorativo ao lado de texto → `aria-hidden="true"`;
  - botão só com ícone → `aria-label` traduzido no **botão**, ícone com `aria-hidden`;
  - ícone variável → mapa tipado `as const satisfies Record<X, LucideIcon>` + `<component :is>`;
  - tamanhos usuais: 16 (inline em texto pequeno), 20 (botões), 24 (destaque).
  Não crie SVG de ícone à mão nem instale outra lib de ícones.
- Interativos: elemento nativo correto (`<button>` para ação, `<a>`/`<NuxtLink>` para navegação),
  nunca `<div @click>`. Estados de foco visíveis.
- Acesso ao DOM/`window` só em `onMounted` ou `<ClientOnly>` — o código roda no servidor (SSR).
- `v-for` sempre com `:key` estável (id/slug, nunca índice se a lista muda).
- `v-if` e `v-for` nunca no mesmo elemento.
