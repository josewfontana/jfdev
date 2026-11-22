<script setup lang="ts">
/**
 * JFDEV signature: official monogram + "JFDEV" in Space Grotesk + optional terracotta dot
 * (manual p.7 — the typographic wordmark is still being validated, so it stays live text).
 * Only used on charcoal bands → ivory monogram.
 */
const { size = 'md' } = defineProps<{
  size?: 'md' | 'lg'
}>()

const SIZES = {
  md: { mark: 'h-9 w-12', text: 'text-2xl' },
  lg: { mark: 'h-10 w-14', text: 'text-3xl' },
} as const satisfies Record<'md' | 'lg', { mark: string, text: string }>
</script>

<template>
  <NuxtLinkLocale
    to="/"
    :aria-label="$t('nav.homeLink')"
    class="inline-flex items-center gap-3 font-heading font-bold tracking-tight whitespace-nowrap text-brand-ivory"
  >
    <BrandMonogram
      color="ivory"
      :class="SIZES[size].mark"
    />
    <span :class="SIZES[size].text">
      {{ $t('site.name') }}<span
        class="text-brand-terracotta"
        aria-hidden="true"
      >.</span>
    </span>
  </NuxtLinkLocale>
</template>
