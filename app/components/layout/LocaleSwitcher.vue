<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const otherLocales = computed(() =>
  locales.value
    .filter(item => item.code !== locale.value)
    .map(item => ({ ...item, short: item.code.slice(0, 2).toUpperCase() })),
)
</script>

<template>
  <ul
    :aria-label="$t('locale.switcherLabel')"
    class="flex items-center"
  >
    <li
      v-for="item in otherLocales"
      :key="item.code"
    >
      <NuxtLink
        :to="switchLocalePath(item.code)"
        :hreflang="item.language"
        :lang="item.language"
        :aria-label="$t('locale.switchTo', { language: item.name })"
        class="inline-flex h-10 items-center rounded-control border border-border-default px-3 text-xs font-bold tracking-wide text-foreground transition-colors hover:bg-surface"
      >
        {{ item.short }}
      </NuxtLink>
    </li>
  </ul>
</template>
