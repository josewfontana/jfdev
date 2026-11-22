<script setup lang="ts">
type ExperienceEntry = {
  readonly label: MessageKey
  /** Company names are proper nouns (same in every language); `null` uses a translated title. */
  readonly company: string | null
  readonly title?: MessageKey
  readonly role: MessageKey
  readonly text: MessageKey
}

const EXPERIENCE: readonly ExperienceEntry[] = [
  { label: 'engineering.experience.currentLabel', company: 'Opeaz', role: 'engineering.experience.currentRole', text: 'engineering.experience.currentText' },
  { label: 'engineering.experience.previousLabel', company: 'LeafLink', role: 'engineering.experience.previousRole', text: 'engineering.experience.previousText' },
  { label: 'engineering.experience.otherLabel', company: null, title: 'engineering.experience.otherTitle', role: 'engineering.experience.otherRole', text: 'engineering.experience.otherText' },
]

const SKILLS = [
  { label: 'engineering.skills.frontendLabel', title: 'engineering.skills.frontendTitle', text: 'engineering.skills.frontendText' },
  { label: 'engineering.skills.softwareLabel', title: 'engineering.skills.softwareTitle', text: 'engineering.skills.softwareText' },
  { label: 'engineering.skills.mobileLabel', title: 'engineering.skills.mobileTitle', text: 'engineering.skills.mobileText' },
] as const satisfies readonly { label: MessageKey, title: MessageKey, text: MessageKey }[]

const { t } = useI18n()

useSeoMeta({
  title: () => t('seo.engineering.title'),
  description: () => t('seo.engineering.description'),
  ogTitle: () => t('seo.engineering.title'),
  ogDescription: () => t('seo.engineering.description'),
  ogType: 'profile',
})

const skills = computed(() => SKILLS.map(skill => ({
  label: t(skill.label),
  title: t(skill.title),
  text: t(skill.text),
})))

const cvRequestHref = computed(() => mailtoUrl(t('engineering.cv.requestSubject')))
const contactHref = `mailto:${CONTACT.email}`
</script>

<template>
  <div>
    <PageSubhero
      :overline-left="$t('engineering.hero.overlineLeft')"
      :overline-right="$t('engineering.hero.overlineRight')"
      :title-start="$t('engineering.hero.titleStart')"
      :title-highlight="$t('engineering.hero.titleHighlight')"
      :lead="$t('engineering.hero.lead')"
    >
      <template #actions>
        <UiButton
          to="#experience"
          variant="ivory"
          icon="arrow-down"
        >
          {{ $t('engineering.hero.trajectory') }}
        </UiButton>
        <UiButton
          to="/projects"
          variant="outline-light"
        >
          {{ $t('engineering.hero.projects') }}
        </UiButton>
      </template>
    </PageSubhero>

    <section
      id="profile"
      class="bg-background pt-section"
    >
      <LayoutContainer>
        <PageSplitSection
          :kicker="$t('engineering.about.kicker')"
          :title="$t('engineering.about.title')"
        >
          <p class="text-lg leading-relaxed text-text-muted">
            {{ $t('engineering.about.text') }}
          </p>
          <div class="mt-8 flex flex-wrap gap-6">
            <UiArrowLink
              :to="CONTACT.linkedinUrl"
              new-tab
            >
              {{ $t('engineering.about.linkedin') }}
            </UiArrowLink>
            <UiArrowLink :to="contactHref">
              {{ $t('engineering.about.contact') }}
            </UiArrowLink>
          </div>
        </PageSplitSection>
      </LayoutContainer>
    </section>

    <section
      id="experience"
      class="bg-background py-section"
    >
      <LayoutContainer>
        <UiSectionHeader
          :kicker="$t('engineering.experience.kicker')"
          :title-start="$t('engineering.experience.title')"
          :lead="$t('engineering.experience.lead')"
        />
        <ol class="border-t border-border-default">
          <li
            v-for="entry in EXPERIENCE"
            :key="entry.label"
            class="grid gap-3 border-b border-border-default py-8 md:grid-cols-12 md:gap-8 md:py-10"
          >
            <p class="text-eyebrow font-bold text-primary uppercase md:col-span-3 md:pt-2">
              {{ $t(entry.label) }}
            </p>
            <div class="md:col-span-9">
              <h3 class="text-card">
                {{ entry.company ?? (entry.title ? $t(entry.title) : '') }}
              </h3>
              <p class="mt-1 mb-3 font-semibold">
                {{ $t(entry.role) }}
              </p>
              <p class="max-w-2xl leading-relaxed text-text-muted">
                {{ $t(entry.text) }}
              </p>
            </div>
          </li>
        </ol>
      </LayoutContainer>
    </section>

    <PageFeatureGrid
      :kicker="$t('engineering.skills.kicker')"
      :title-start="$t('engineering.skills.title')"
      :lead="$t('engineering.skills.lead')"
      :features="skills"
    />

    <section
      id="cv"
      class="bg-background py-section"
    >
      <LayoutContainer>
        <UiKicker>{{ $t('engineering.cv.kicker') }}</UiKicker>
        <div class="grid gap-3.5 md:grid-cols-12">
          <article class="flex flex-col rounded-card border border-border-default bg-surface p-7 md:col-span-7 md:p-10">
            <h2 class="mb-4 text-card">
              {{ $t('engineering.cv.title') }}
            </h2>
            <p class="mb-8 max-w-xl leading-relaxed text-text-muted">
              {{ $t('engineering.cv.text') }}
            </p>
            <div class="mt-auto flex flex-wrap gap-6">
              <UiArrowLink
                :to="CONTACT.linkedinUrl"
                new-tab
              >
                {{ $t('engineering.cv.linkedin') }}
              </UiArrowLink>
              <UiArrowLink :to="cvRequestHref">
                {{ $t('engineering.cv.request') }}
              </UiArrowLink>
            </div>
          </article>
          <EngineeringLinkedinBadge class="md:col-span-5" />
        </div>
      </LayoutContainer>
    </section>

    <UiCtaBand
      :title="$t('engineering.cta.title')"
      :action="$t('engineering.cta.action')"
    />
  </div>
</template>
