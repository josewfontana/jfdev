<script setup lang="ts">
type Tile = {
  readonly label: MessageKey
  readonly title: MessageKey
  readonly text: MessageKey
  readonly link: MessageKey
}

const TILES: readonly Tile[] = [
  { label: 'home.solutions.startLabel', title: 'home.solutions.startTitle', text: 'home.solutions.startText', link: 'home.solutions.startLink' },
  { label: 'home.solutions.evolveLabel', title: 'home.solutions.evolveTitle', text: 'home.solutions.evolveText', link: 'home.solutions.evolveLink' },
  { label: 'home.solutions.decideLabel', title: 'home.solutions.decideTitle', text: 'home.solutions.decideText', link: 'home.solutions.decideLink' },
]
</script>

<template>
  <section
    id="solutions"
    class="border-y border-border-default bg-surface-elevated py-section"
  >
    <LayoutContainer>
      <UiSectionHeader
        :kicker="$t('home.solutions.kicker')"
        :title-start="$t('home.solutions.titleStart')"
        :title-end="$t('home.solutions.titleEnd')"
        :lead="$t('home.solutions.lead')"
      />
      <ul class="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        <li
          v-for="tile in TILES"
          :key="tile.label"
          class="flex min-h-64 flex-col gap-4 rounded-card border border-border-default bg-surface p-7"
        >
          <p class="text-eyebrow font-bold text-primary uppercase">
            {{ $t(tile.label) }}
          </p>
          <h3 class="text-2xl leading-tight tracking-tight md:text-3xl">
            {{ $t(tile.title) }}
          </h3>
          <p class="flex-1 text-sm leading-relaxed text-text-muted">
            {{ $t(tile.text) }}
          </p>
          <UiArrowLink
            to="/#engagement"
            class="self-start"
          >
            {{ $t(tile.link) }}
          </UiArrowLink>
        </li>
      </ul>
    </LayoutContainer>
  </section>
</template>
