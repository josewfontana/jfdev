<script setup lang="ts">
const { locale } = useI18n()
const route = useRoute()
const collection = useLocaleCollection('projects')

const { data: project } = await useAsyncData(
  () => `project-${locale.value}-${route.path}`,
  () => queryCollection(collection.value).path(route.path).first(),
  { watch: [locale] },
)

if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

useSeoMeta({
  title: () => project.value?.title,
  description: () => project.value?.description,
  ogTitle: () => project.value?.title,
  ogDescription: () => project.value?.description,
  ogType: 'article',
})
</script>

<template>
  <div v-if="project">
    <PageSubhero
      :overline-left="project.overline"
      :overline-right="project.caseNumber"
      :title-start="project.title"
      :title-highlight="project.titleHighlight"
      :lead="project.description"
    >
      <template #before>
        <nav
          :aria-label="$t('projects.case.breadcrumbLabel')"
          class="mb-8"
        >
          <ol class="flex flex-wrap items-center gap-2 text-sm text-text-muted">
            <li>
              <NuxtLinkLocale
                to="/projects"
                class="font-semibold text-primary hover:text-primary-hover"
              >
                {{ $t('nav.projects') }}
              </NuxtLinkLocale>
            </li>
            <li aria-hidden="true">
              /
            </li>
            <li aria-current="page">
              {{ project.title }}
            </li>
          </ol>
        </nav>
      </template>
      <template #actions>
        <UiButton
          to="#context"
          variant="ivory"
          icon="arrow-down"
        >
          {{ $t('projects.case.explore') }}
        </UiButton>
        <UiButton
          to="/projects"
          variant="outline-light"
        >
          {{ $t('projects.case.back') }}
        </UiButton>
      </template>
      <template #visual>
        <span
          class="relative font-heading text-[clamp(2.875rem,7vw,6rem)] font-semibold tracking-[-0.07em] text-white"
          aria-hidden="true"
        >{{ project.symbol }}</span>
      </template>
    </PageSubhero>

    <section
      id="context"
      class="bg-background py-section"
    >
      <LayoutContainer>
        <UiSectionHeader
          :kicker="$t('projects.case.contextKicker')"
          :title-start="project.contextTitle"
          :lead="project.contextLead"
        />
        <div class="grid gap-3.5 md:grid-cols-2">
          <article class="rounded-card border border-border-default bg-surface p-7 md:p-10">
            <h3 class="mb-4 text-card">
              {{ $t('projects.case.challenge') }}
            </h3>
            <p class="leading-relaxed text-text-muted">
              {{ project.challenge }}
            </p>
          </article>
          <article class="rounded-card border border-border-default bg-surface p-7 md:p-10">
            <h3 class="mb-4 text-card">
              {{ $t('projects.case.approach') }}
            </h3>
            <p class="leading-relaxed text-text-muted">
              {{ project.approach }}
            </p>
          </article>
        </div>
      </LayoutContainer>
    </section>

    <PageFeatureGrid
      v-if="project.capabilities.length"
      :kicker="$t('projects.case.capabilitiesKicker')"
      :features="project.capabilities"
    />

    <section class="bg-background py-section">
      <LayoutContainer>
        <PageSplitSection
          :kicker="$t('projects.case.stackKicker')"
          :title="project.stackTitle"
        >
          <ContentRenderer
            :value="project"
            class="prose"
          />
          <ul
            :aria-label="$t('projects.case.stackLabel')"
            class="mt-8 flex flex-wrap gap-2.5"
          >
            <UiChip
              v-for="tech in project.stack"
              :key="tech"
            >
              {{ tech }}
            </UiChip>
          </ul>
          <p
            v-if="project.note"
            class="mt-7 text-xs text-text-muted"
          >
            {{ project.note }}
          </p>
        </PageSplitSection>
      </LayoutContainer>
    </section>

    <UiCtaBand
      :title="$t('projects.case.ctaTitle')"
      :action="$t('projects.case.ctaAction')"
    />
  </div>
</template>
