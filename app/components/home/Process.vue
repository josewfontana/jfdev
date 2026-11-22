<script setup lang="ts">
type Step = {
  readonly label: MessageKey
  readonly title: MessageKey
  readonly text: MessageKey
}

const STEPS: readonly Step[] = [
  { label: 'home.process.discoverLabel', title: 'home.process.discoverTitle', text: 'home.process.discoverText' },
  { label: 'home.process.buildLabel', title: 'home.process.buildTitle', text: 'home.process.buildText' },
  { label: 'home.process.evolveLabel', title: 'home.process.evolveTitle', text: 'home.process.evolveText' },
]

/** Technology names: identical in every language, so they are data, not translations. */
const STACK = ['Vue / Nuxt', 'TypeScript', 'Web Apps', 'PHP / Laravel', 'API Integrations', 'Mobile'] as const
</script>

<template>
  <section
    id="process"
    class="bg-background py-section"
  >
    <LayoutContainer>
      <UiSectionHeader
        :kicker="$t('home.process.kicker')"
        :title-start="$t('home.process.titleStart')"
        :title-end="$t('home.process.titleEnd')"
        :lead="$t('home.process.lead')"
      />
      <ol class="grid gap-px overflow-hidden rounded-card border border-border-default bg-border-default md:grid-cols-3">
        <li
          v-for="step in STEPS"
          :key="step.label"
          class="min-h-60 bg-background p-8 md:min-h-72 md:p-10"
        >
          <p class="font-heading text-sm font-bold text-primary">
            {{ $t(step.label) }}
          </p>
          <h3 class="mt-12 mb-3 text-3xl tracking-tight md:mt-16">
            {{ $t(step.title) }}
          </h3>
          <p class="text-sm leading-relaxed text-text-muted">
            {{ $t(step.text) }}
          </p>
        </li>
      </ol>
      <ul
        :aria-label="$t('home.process.stackLabel')"
        class="mt-10 flex flex-wrap gap-2.5"
      >
        <UiChip
          v-for="tech in STACK"
          :key="tech"
        >
          {{ tech }}
        </UiChip>
      </ul>
    </LayoutContainer>
  </section>
</template>
