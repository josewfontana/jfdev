<template>
  <section
    id="projects"
    class="bg-background py-section"
  >
    <LayoutContainer>
      <UiSectionHeader
        :kicker="$t('home.projects.kicker')"
        :title-start="$t('home.projects.titleStart')"
        :title-end="$t('home.projects.titleEnd')"
        :lead="$t('home.projects.lead')"
      />
      <div class="grid overflow-hidden rounded-card border border-border-default bg-surface-elevated md:grid-cols-2">
        <!-- Authorized monogram version: "Reversa / teal" (ivory on Muted Teal). -->
        <div class="relative grid min-h-72 place-items-center bg-brand-teal md:min-h-112">
          <div
            class="bg-grid absolute inset-0"
            aria-hidden="true"
          />
          <BrandMonogram
            color="ivory"
            class="relative w-1/2 max-w-76"
          />
        </div>
        <div class="flex flex-col justify-center p-8 md:p-16">
          <p class="text-eyebrow font-bold text-primary uppercase">
            {{ $t('home.projects.tag') }}
          </p>
          <h3 class="my-5 text-section">
            <span class="block">{{ $t('home.projects.cardTitleStart') }}</span>
            <span class="block">{{ $t('home.projects.cardTitleEnd') }}</span>
          </h3>
          <p class="leading-relaxed text-text-muted">
            {{ $t('home.projects.cardText') }}
          </p>
          <UiArrowLink
            to="/projects"
            class="mt-7 self-start"
          >
            {{ $t('home.projects.link') }}
          </UiArrowLink>
        </div>
      </div>
    </LayoutContainer>
  </section>
</template>
