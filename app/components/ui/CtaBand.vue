<script setup lang="ts">
/**
 * Terracotta closing band. Manual: terracotta is an accent, not a reading color — so only the
 * large title (white, 3.65:1 ≥ 3:1 for large text) sits on it; the action is an ivory button.
 */
const { title, action, to = '/#contact' } = defineProps<{
  title: string
  action: string
  to?: string
}>()
</script>

<template>
  <section class="bg-brand-terracotta py-16 text-white [--focus-ring:var(--color-white)]">
    <LayoutContainer class="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
      <h2 class="max-w-3xl text-section text-balance">
        {{ title }}
      </h2>
      <UiButton
        :to="to"
        variant="ivory"
        class="shrink-0 self-start md:self-auto"
      >
        {{ action }}
      </UiButton>
    </LayoutContainer>
  </section>
</template>
