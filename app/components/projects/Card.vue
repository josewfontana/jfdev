<script setup lang="ts">
/**
 * Portfolio card. The artwork is a large wordmark-like symbol in white on an authorized brand
 * color — large text only (white on terracotta 3.65:1, on teal 4.52:1, on charcoal 15.4:1).
 */
const { to, tag, title, text, footnote, linkLabel, symbol, tone } = defineProps<{
  to: string
  tag: string
  title: string
  text: string
  footnote: string
  linkLabel: string
  symbol: string
  tone: ProjectTone
}>()

const TONES = {
  teal: 'bg-brand-teal',
  terracotta: 'bg-brand-terracotta',
  charcoal: 'bg-brand-charcoal',
} as const satisfies Record<ProjectTone, string>
</script>

<template>
  <article class="flex flex-col overflow-hidden rounded-card border border-border-default bg-surface transition hover:bg-surface-elevated motion-safe:hover:-translate-y-1">
    <div
      class="relative grid min-h-56 place-items-center overflow-hidden"
      :class="TONES[tone]"
      aria-hidden="true"
    >
      <div class="bg-grid absolute inset-0" />
      <span class="relative font-heading text-[clamp(2.75rem,5vw,4.5rem)] font-semibold tracking-[-0.07em] text-white">
        {{ symbol }}
      </span>
    </div>
    <div class="flex flex-1 flex-col p-7 md:p-8">
      <p class="text-eyebrow font-bold text-primary uppercase">
        {{ tag }}
      </p>
      <h3 class="mt-4 mb-3 text-card">
        {{ title }}
      </h3>
      <p class="mb-8 text-sm leading-relaxed text-text-muted">
        {{ text }}
      </p>
      <div class="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-border-default pt-6">
        <span class="text-xs font-semibold text-text-muted">{{ footnote }}</span>
        <UiArrowLink :to="to">
          {{ linkLabel }}
        </UiArrowLink>
      </div>
    </div>
  </article>
</template>
