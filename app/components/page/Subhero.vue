<script setup lang="ts">
/**
 * Hero for inner pages (charcoal brand band). The visual slot defaults to the ivory monogram
 * on a terracotta grid card (authorized monogram version: "Destaque / terracotta").
 */
const { overlineLeft, overlineRight, titleStart, titleHighlight, lead } = defineProps<{
  overlineLeft: string
  overlineRight: string
  titleStart: string
  titleHighlight: string
  lead: string
}>()
</script>

<template>
  <section class="theme-dark bg-brand-charcoal text-foreground">
    <LayoutContainer class="pt-12 pb-16 md:pt-20 md:pb-20">
      <slot name="before" />
      <p class="flex justify-between gap-5 text-eyebrow font-bold text-primary uppercase">
        <span>{{ overlineLeft }}</span>
        <span class="hidden sm:inline">{{ overlineRight }}</span>
      </p>
      <h1 class="my-8 max-w-5xl text-display text-balance md:my-10">
        {{ titleStart }}
        <span class="text-primary">{{ titleHighlight }}</span>
      </h1>
      <div class="grid gap-3.5 md:grid-cols-12">
        <div class="flex min-h-56 flex-col justify-between gap-7 rounded-card bg-brand-teal p-7 text-white md:col-span-7 md:p-9">
          <p class="max-w-xl text-lead">
            {{ lead }}
          </p>
          <div class="flex flex-wrap gap-2.5">
            <slot name="actions" />
          </div>
        </div>
        <div class="relative grid min-h-56 place-items-center overflow-hidden rounded-card bg-brand-terracotta md:col-span-5">
          <div
            class="bg-grid absolute inset-0"
            aria-hidden="true"
          />
          <slot name="visual">
            <BrandMonogram
              color="ivory"
              class="relative w-1/2 max-w-64"
            />
          </slot>
        </div>
      </div>
    </LayoutContainer>
  </section>
</template>
