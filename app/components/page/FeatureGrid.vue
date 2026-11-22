<script setup lang="ts">
/** Charcoal brand band with numbered feature cards (product capabilities, specializations). */
export type Feature = {
  readonly label: string
  readonly title: string
  readonly text: string
}

const { kicker, titleStart, lead, features } = defineProps<{
  kicker: string
  titleStart?: string
  lead?: string
  features: readonly Feature[]
}>()
</script>

<template>
  <section class="theme-dark bg-brand-charcoal py-section text-foreground">
    <LayoutContainer>
      <UiSectionHeader
        v-if="titleStart"
        :kicker="kicker"
        :title-start="titleStart"
        :lead="lead"
      />
      <UiKicker v-else>
        {{ kicker }}
      </UiKicker>
      <ul class="grid gap-3.5 md:grid-cols-3">
        <li
          v-for="feature in features"
          :key="feature.label"
          class="rounded-card bg-surface p-7 md:p-9"
        >
          <p class="text-eyebrow font-bold text-primary uppercase">
            {{ feature.label }}
          </p>
          <h3 class="mt-14 mb-3 text-card md:mt-24">
            {{ feature.title }}
          </h3>
          <p class="text-sm leading-relaxed text-text-muted">
            {{ feature.text }}
          </p>
        </li>
      </ul>
    </LayoutContainer>
  </section>
</template>
