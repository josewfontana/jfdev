<script setup lang="ts">
type Metric = {
  readonly value: MessageKey
  readonly label: MessageKey
}

const METRICS: readonly Metric[] = [
  { value: 'home.hero.experienceValue', label: 'home.hero.experienceLabel' },
  { value: 'home.hero.solutionsValue', label: 'home.hero.solutionsLabel' },
  { value: 'home.hero.globalValue', label: 'home.hero.globalLabel' },
]
</script>

<template>
  <section class="theme-dark bg-brand-charcoal text-foreground">
    <LayoutContainer class="pt-12 pb-16 md:pt-24 md:pb-24">
      <p class="flex justify-between gap-5 text-eyebrow font-bold text-primary uppercase">
        <span>{{ $t('home.hero.overlineLeft') }}</span>
        <span class="hidden sm:inline">{{ $t('home.hero.overlineRight') }}</span>
      </p>

      <h1 class="my-8 max-w-6xl text-display md:my-12">
        <span class="block">{{ $t('home.hero.titleStart') }}</span>
        <span class="block text-primary">{{ $t('home.hero.titleHighlight') }}</span>
      </h1>

      <div class="grid gap-3.5 md:grid-cols-12">
        <div class="flex min-h-72 flex-col justify-between gap-8 rounded-card bg-brand-teal p-7 text-white md:col-span-7 md:min-h-86 md:p-12">
          <p class="max-w-xl text-lead">
            {{ $t('home.hero.lead') }}
          </p>
          <UiButton
            to="/#contact"
            variant="ivory"
            class="self-start"
          >
            {{ $t('home.hero.cta') }}
          </UiButton>
        </div>

        <!-- Terracotta as accent card; the monogram is the authorized "Destaque / terracotta" version. -->
        <div class="relative grid min-h-72 place-items-center overflow-hidden rounded-card bg-brand-terracotta md:col-span-5 md:min-h-86">
          <div
            class="bg-grid absolute inset-0"
            aria-hidden="true"
          />
          <div
            class="absolute inset-4 rounded-control border border-white/30"
            aria-hidden="true"
          />
          <BrandMonogram
            color="ivory"
            :label="$t('site.name')"
            class="relative w-3/5 max-w-80"
          />
          <!-- Brand signature (logotype text, WCAG 1.4.3 exception) — not reading content. -->
          <span
            class="absolute right-8 bottom-8 text-[0.625rem] font-bold tracking-[0.17em] text-white uppercase"
            aria-hidden="true"
          >{{ $t('site.brandTagline') }}</span>
        </div>
      </div>

      <dl
        class="mt-3.5 grid grid-cols-3 gap-px overflow-hidden rounded-card bg-border-default"
        :aria-label="$t('home.hero.metricsLabel')"
      >
        <div
          v-for="metric in METRICS"
          :key="metric.label"
          class="flex min-h-28 flex-col-reverse justify-end gap-3 bg-surface px-3 py-5 sm:px-8 sm:py-8"
        >
          <dt class="text-[0.625rem] font-bold tracking-[0.14em] text-text-muted uppercase sm:text-eyebrow">
            {{ $t(metric.label) }}
          </dt>
          <dd class="font-heading text-2xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            {{ $t(metric.value) }}
          </dd>
        </div>
      </dl>

      <div class="mt-14 flex flex-col gap-3 border-t border-border-default pt-8 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <p class="text-eyebrow font-bold text-primary uppercase">
          {{ $t('home.hero.proofLabel') }}
        </p>
        <p class="max-w-md text-sm leading-relaxed text-text-muted">
          {{ $t('home.hero.proofValue') }}
        </p>
      </div>
    </LayoutContainer>
  </section>
</template>
