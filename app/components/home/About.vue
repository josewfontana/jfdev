<template>
  <section
    id="about"
    class="theme-dark bg-brand-charcoal py-section text-foreground"
  >
    <LayoutContainer>
      <UiKicker>{{ $t('home.about.kicker') }}</UiKicker>
      <div class="grid gap-3.5 md:grid-cols-12">
        <div class="flex min-h-80 flex-col justify-between gap-10 rounded-card bg-surface p-8 md:col-span-7 md:min-h-120 md:p-14">
          <div>
            <h2 class="text-section text-balance">
              <span class="block">{{ $t('home.about.titleStart') }}</span>
              <span class="block">{{ $t('home.about.titleEnd') }}</span>
            </h2>
            <p class="mt-6 max-w-xl leading-relaxed text-text-muted">
              {{ $t('home.about.text') }}
            </p>
          </div>
          <div class="flex flex-col items-start gap-6">
            <p class="text-xs tracking-[0.18em] text-text-muted uppercase">
              {{ $t('home.about.note') }}
            </p>
            <UiArrowLink to="/engineering">
              {{ $t('home.about.link') }}
            </UiArrowLink>
          </div>
        </div>

        <!-- Terracotta accent card: only large text on it (manual: not a reading color). -->
        <div class="flex min-h-80 flex-col justify-between gap-8 rounded-card bg-brand-terracotta p-8 text-white md:col-span-5 md:min-h-120 md:p-14">
          <p class="font-heading text-[clamp(6rem,13vw,12rem)] leading-[0.9] font-semibold tracking-[-0.1em]">
            {{ $t('home.about.metricValue') }}
          </p>
          <p class="max-w-72 text-xl leading-snug font-bold">
            {{ $t('home.about.metricText') }}
          </p>
        </div>
      </div>
    </LayoutContainer>
  </section>
</template>
