<script setup lang="ts">
import { ArrowUpRightIcon } from '@lucide/vue'

type Engagement = {
  readonly label: MessageKey
  readonly title: MessageKey
  readonly text: MessageKey
  readonly link: MessageKey
  readonly topic: ContactTopic
  readonly highlight: boolean
}

const ENGAGEMENTS: readonly Engagement[] = [
  { label: 'home.engagement.projectLabel', title: 'home.engagement.projectTitle', text: 'home.engagement.projectText', link: 'home.engagement.projectLink', topic: 'project', highlight: false },
  { label: 'home.engagement.partnerLabel', title: 'home.engagement.partnerTitle', text: 'home.engagement.partnerText', link: 'home.engagement.partnerLink', topic: 'evolution', highlight: true },
  { label: 'home.engagement.consultingLabel', title: 'home.engagement.consultingTitle', text: 'home.engagement.consultingText', link: 'home.engagement.consultingLink', topic: 'consulting', highlight: false },
]

/** Highlight card: teal with white text (4.52:1); others follow the dark scope tokens. */
const TONES = {
  default: { card: 'border-border-default bg-surface', label: 'text-primary', text: 'text-text-muted', link: 'text-foreground' },
  highlight: { card: 'border-brand-teal bg-brand-teal text-white', label: 'text-white', text: 'text-white', link: 'text-white' },
} as const satisfies Record<'default' | 'highlight', { card: string, label: string, text: string, link: string }>

const { topic } = useContactTopic()
</script>

<template>
  <section
    id="engagement"
    class="theme-dark bg-brand-charcoal py-section text-foreground"
  >
    <LayoutContainer>
      <UiSectionHeader
        :kicker="$t('home.engagement.kicker')"
        :title-start="$t('home.engagement.titleStart')"
        :title-end="$t('home.engagement.titleEnd')"
        :lead="$t('home.engagement.lead')"
      />
      <ul class="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        <li
          v-for="item in ENGAGEMENTS"
          :key="item.label"
          class="flex min-h-72 flex-col items-start rounded-card border p-8"
          :class="TONES[item.highlight ? 'highlight' : 'default'].card"
        >
          <p
            class="text-eyebrow font-bold uppercase"
            :class="TONES[item.highlight ? 'highlight' : 'default'].label"
          >
            {{ $t(item.label) }}
          </p>
          <h3 class="mt-7 mb-3 text-card">
            {{ $t(item.title) }}
          </h3>
          <p
            class="flex-1 text-sm leading-relaxed"
            :class="TONES[item.highlight ? 'highlight' : 'default'].text"
          >
            {{ $t(item.text) }}
          </p>
          <NuxtLinkLocale
            to="/#contact"
            class="mt-6 inline-flex items-center gap-2 border-b border-current pb-1.5 text-sm font-semibold transition-opacity hover:opacity-80"
            :class="TONES[item.highlight ? 'highlight' : 'default'].link"
            @click="topic = item.topic"
          >
            {{ $t(item.link) }}
            <ArrowUpRightIcon
              :size="16"
              aria-hidden="true"
            />
          </NuxtLinkLocale>
        </li>
      </ul>
    </LayoutContainer>
  </section>
</template>
