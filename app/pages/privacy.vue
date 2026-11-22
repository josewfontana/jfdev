<script setup lang="ts">
/** Bump whenever the policy text changes (shown at the top of the page). */
const LAST_UPDATED = '2026-11-21'

type PolicySection = {
  readonly id: string
  readonly title: MessageKey
  readonly paragraphs: readonly MessageKey[]
  readonly items?: readonly MessageKey[]
  /** Paragraphs rendered after the list. */
  readonly after?: readonly MessageKey[]
}

const SECTIONS: readonly PolicySection[] = [
  { id: 'scope', title: 'privacy.scope.title', paragraphs: ['privacy.scope.p1', 'privacy.scope.p2'] },
  { id: 'roles', title: 'privacy.roles.title', paragraphs: ['privacy.roles.p1', 'privacy.roles.p2'] },
  {
    id: 'data',
    title: 'privacy.collected.title',
    paragraphs: ['privacy.collected.p1'],
    items: ['privacy.collected.contact', 'privacy.collected.account', 'privacy.collected.technical'],
    after: ['privacy.collected.p2'],
  },
  { id: 'purposes', title: 'privacy.purposes.title', paragraphs: ['privacy.purposes.p1', 'privacy.purposes.p2'] },
  { id: 'sharing', title: 'privacy.sharing.title', paragraphs: ['privacy.sharing.p1', 'privacy.sharing.p2'] },
  { id: 'security', title: 'privacy.security.title', paragraphs: ['privacy.security.p1', 'privacy.security.p2'] },
  { id: 'cookies', title: 'privacy.cookies.title', paragraphs: ['privacy.cookies.p1', 'privacy.cookies.p2'] },
  { id: 'retention', title: 'privacy.retention.title', paragraphs: ['privacy.retention.p1'] },
  {
    id: 'rights',
    title: 'privacy.rights.title',
    paragraphs: ['privacy.rights.p1'],
    items: [
      'privacy.rights.access',
      'privacy.rights.correction',
      'privacy.rights.deletion',
      'privacy.rights.portability',
      'privacy.rights.sharing',
      'privacy.rights.consent',
    ],
    after: ['privacy.rights.p2'],
  },
  { id: 'children', title: 'privacy.children.title', paragraphs: ['privacy.children.p1'] },
  { id: 'changes', title: 'privacy.changes.title', paragraphs: ['privacy.changes.p1'] },
]

const { t, locale } = useI18n()

useSeoMeta({
  title: () => t('seo.privacy.title'),
  description: () => t('seo.privacy.description'),
  ogTitle: () => t('seo.privacy.title'),
  ogDescription: () => t('seo.privacy.description'),
})

const updatedAt = computed(() => t('privacy.hero.updatedAt', {
  date: new Intl.DateTimeFormat(locale.value, { dateStyle: 'long', timeZone: 'UTC' })
    .format(new Date(LAST_UPDATED)),
}))

const contactHref = computed(() => mailtoUrl(t('privacy.hero.contact')))
const consent = useConsent()
</script>

<template>
  <div>
    <PageSubhero
      :overline-left="$t('privacy.hero.overlineLeft')"
      :overline-right="updatedAt"
      :title-start="$t('privacy.hero.titleStart')"
      :title-highlight="$t('privacy.hero.titleHighlight')"
      :lead="$t('privacy.hero.lead')"
    >
      <template #actions>
        <UiButton
          to="#contact"
          variant="ivory"
          icon="arrow-down"
        >
          {{ $t('privacy.hero.contact') }}
        </UiButton>
      </template>
    </PageSubhero>

    <section class="bg-background py-section">
      <LayoutContainer class="grid gap-12 md:grid-cols-12">
        <nav
          :aria-label="$t('privacy.tocLabel')"
          class="md:col-span-4"
        >
          <p class="mb-4 text-eyebrow font-bold text-primary uppercase">
            {{ $t('privacy.tocLabel') }}
          </p>
          <ol class="flex flex-col gap-2 md:sticky md:top-28">
            <li
              v-for="section in SECTIONS"
              :key="section.id"
            >
              <a
                :href="`#${section.id}`"
                class="text-text-muted underline-offset-4 transition-colors hover:text-primary hover:underline"
              >
                {{ $t(section.title) }}
              </a>
            </li>
            <li>
              <a
                href="#contact"
                class="text-text-muted underline-offset-4 transition-colors hover:text-primary hover:underline"
              >
                {{ $t('privacy.contact.title') }}
              </a>
            </li>
          </ol>
        </nav>

        <article class="prose max-w-content md:col-span-8">
          <template
            v-for="section in SECTIONS"
            :key="section.id"
          >
            <h2
              :id="section.id"
              class="scroll-mt-28"
            >
              {{ $t(section.title) }}
            </h2>
            <p
              v-for="paragraph in section.paragraphs"
              :key="paragraph"
            >
              {{ $t(paragraph) }}
            </p>
            <ul v-if="section.items">
              <li
                v-for="item in section.items"
                :key="item"
              >
                {{ $t(item) }}
              </li>
            </ul>
            <p
              v-for="paragraph in section.after"
              :key="paragraph"
            >
              {{ $t(paragraph) }}
            </p>
            <p v-if="section.id === 'cookies' && consent.enabled">
              <button
                type="button"
                class="min-h-12 rounded-control border border-text-muted px-5 text-sm font-semibold text-foreground transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                @click="consent.openSettings"
              >
                {{ $t('privacy.cookies.manage') }}
              </button>
            </p>
          </template>

          <h2
            id="contact"
            class="scroll-mt-28"
          >
            {{ $t('privacy.contact.title') }}
          </h2>
          <p>{{ $t('privacy.contact.p1') }}</p>
          <p>
            <a :href="contactHref">{{ CONTACT.email }}</a>
          </p>
        </article>
      </LayoutContainer>
    </section>
  </div>
</template>
