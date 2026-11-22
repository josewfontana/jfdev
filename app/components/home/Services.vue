<script setup lang="ts">
import { ArrowUpRightIcon } from '@lucide/vue'

type Service = {
  readonly label: MessageKey
  readonly title: MessageKey
  readonly text: MessageKey
}

const SERVICES: readonly Service[] = [
  { label: 'home.services.webLabel', title: 'home.services.webTitle', text: 'home.services.webText' },
  { label: 'home.services.productsLabel', title: 'home.services.productsTitle', text: 'home.services.productsText' },
  { label: 'home.services.connectionsLabel', title: 'home.services.connectionsTitle', text: 'home.services.connectionsText' },
  { label: 'home.services.strategyLabel', title: 'home.services.strategyTitle', text: 'home.services.strategyText' },
]
</script>

<template>
  <section
    id="services"
    class="bg-background py-section"
  >
    <LayoutContainer>
      <UiSectionHeader
        :kicker="$t('home.services.kicker')"
        :title-start="$t('home.services.titleStart')"
        :title-end="$t('home.services.titleEnd')"
        :lead="$t('home.services.lead')"
      />
      <ul class="grid gap-3.5 md:grid-cols-2">
        <li
          v-for="service in SERVICES"
          :key="service.label"
          class="relative flex min-h-56 flex-col justify-between gap-8 overflow-hidden rounded-card border border-border-default bg-surface p-7 transition hover:bg-surface-elevated motion-safe:hover:-translate-y-1 md:min-h-76 md:p-9"
        >
          <span
            class="absolute inset-x-0 top-0 h-0.5 bg-brand-teal opacity-40"
            aria-hidden="true"
          />
          <p class="text-eyebrow font-bold text-primary uppercase">
            {{ $t(service.label) }}
          </p>
          <div>
            <h3 class="mb-4 max-w-sm text-card">
              {{ $t(service.title) }}
            </h3>
            <p class="max-w-md text-sm leading-relaxed text-text-muted">
              {{ $t(service.text) }}
            </p>
            <ArrowUpRightIcon
              :size="28"
              class="mt-5 text-primary"
              aria-hidden="true"
            />
          </div>
        </li>
      </ul>
    </LayoutContainer>
  </section>
</template>
