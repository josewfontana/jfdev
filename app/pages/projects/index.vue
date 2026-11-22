<script setup lang="ts">
type Filter = 'all' | ProjectCategory

const FILTERS = [
  { value: 'all', labelKey: 'projects.list.filterAll' },
  { value: 'product', labelKey: 'projects.list.filterProduct' },
  { value: 'open-source', labelKey: 'projects.list.filterOpenSource' },
  { value: 'experience', labelKey: 'projects.list.filterExperience' },
] as const satisfies readonly { value: Filter, labelKey: MessageKey }[]

const { t, locale } = useI18n()
const collection = useLocaleCollection('projects')

useSeoMeta({
  title: () => t('seo.projects.title'),
  description: () => t('seo.projects.description'),
  ogTitle: () => t('seo.projects.title'),
  ogDescription: () => t('seo.projects.description'),
  ogType: 'website',
})

const { data: projects } = await useAsyncData(
  () => `projects-${locale.value}`,
  () => queryCollection(collection.value)
    .order('date', 'DESC')
    .select('path', 'title', 'description', 'category', 'tag', 'symbol', 'tone', 'stack')
    .all(),
  { watch: [locale] },
)

type CardItem = {
  readonly key: string
  readonly category: ProjectCategory
  readonly to: string
  readonly tag: string
  readonly title: string
  readonly text: string
  readonly footnote: string
  readonly linkLabel: string
  readonly symbol: string
  readonly tone: ProjectTone
}

const cards = computed<readonly CardItem[]>(() => [
  ...(projects.value ?? []).map(project => ({
    key: project.path,
    category: project.category,
    // Content paths already carry the locale prefix; strip it so NuxtLinkLocale re-adds it.
    to: project.path.replace(/^\/en(?=\/)/, ''),
    tag: project.tag,
    title: project.title,
    text: project.description,
    footnote: project.stack.slice(0, 3).join(' · '),
    linkLabel: t('projects.list.caseLink'),
    symbol: project.symbol,
    tone: project.tone,
  })),
  {
    key: 'experience',
    category: 'experience',
    to: '/engineering#experience',
    tag: t('projects.list.experienceTag'),
    title: t('projects.list.experienceTitle'),
    text: t('projects.list.experienceText'),
    footnote: t('projects.list.experienceStack'),
    linkLabel: t('projects.list.experienceLink'),
    symbol: 'WEB.',
    tone: 'charcoal',
  },
])

const filter = ref<Filter>('all')
const visibleCards = computed(() =>
  filter.value === 'all' ? cards.value : cards.value.filter(card => card.category === filter.value),
)
</script>

<template>
  <div>
    <PageSubhero
      :overline-left="$t('projects.hero.overlineLeft')"
      :overline-right="$t('projects.hero.overlineRight')"
      :title-start="$t('projects.hero.titleStart')"
      :title-highlight="$t('projects.hero.titleHighlight')"
      :lead="$t('projects.hero.lead')"
    >
      <template #actions>
        <UiButton
          to="#explore"
          variant="ivory"
          icon="arrow-down"
        >
          {{ $t('projects.hero.explore') }}
        </UiButton>
        <UiButton
          to="/engineering"
          variant="outline-light"
        >
          {{ $t('projects.hero.profile') }}
        </UiButton>
      </template>
    </PageSubhero>

    <section
      id="explore"
      class="bg-background py-section"
    >
      <LayoutContainer>
        <UiSectionHeader
          :kicker="$t('projects.list.kicker')"
          :title-start="$t('projects.list.title')"
          :lead="$t('projects.list.lead')"
        />
        <div
          role="group"
          :aria-label="$t('projects.list.filtersLabel')"
          class="mb-8 flex flex-wrap gap-2.5"
        >
          <button
            v-for="item in FILTERS"
            :key="item.value"
            type="button"
            :aria-pressed="filter === item.value"
            class="min-h-11 rounded-control border px-4 text-sm font-semibold transition-colors"
            :class="filter === item.value
              ? 'border-primary bg-primary text-primary-foreground'
              : 'border-border-default text-foreground hover:border-primary hover:text-primary'"
            @click="filter = item.value"
          >
            {{ $t(item.labelKey) }}
          </button>
        </div>
        <ul
          v-if="visibleCards.length"
          class="grid gap-3.5 md:grid-cols-2"
          aria-live="polite"
        >
          <li
            v-for="card in visibleCards"
            :key="card.key"
            class="grid"
          >
            <ProjectsCard
              :to="card.to"
              :tag="card.tag"
              :title="card.title"
              :text="card.text"
              :footnote="card.footnote"
              :link-label="card.linkLabel"
              :symbol="card.symbol"
              :tone="card.tone"
            />
          </li>
        </ul>
        <p
          v-else
          class="rounded-card border border-dashed border-border-default p-10 text-center text-text-muted"
          aria-live="polite"
        >
          {{ $t('projects.list.empty') }}
        </p>
        <p class="mt-7 text-xs text-text-muted">
          {{ $t('projects.list.note') }}
        </p>
      </LayoutContainer>
    </section>

    <UiCtaBand
      :title="$t('projects.cta.title')"
      :action="$t('projects.cta.action')"
    />
  </div>
</template>
