<script setup lang="ts">
const { as = 'div', width = 'site' } = defineProps<{
  as?: 'div' | 'section' | 'header' | 'footer' | 'nav'
  /** `site`: page grid (1430px). `content`: long-form text (48rem). */
  width?: 'site' | 'content'
}>()

const WIDTHS = {
  site: 'max-w-site',
  content: 'max-w-content',
} as const satisfies Record<'site' | 'content', string>
</script>

<template>
  <component
    :is="as"
    class="mx-auto w-full px-gutter"
    :class="WIDTHS[width]"
  >
    <slot />
  </component>
</template>
