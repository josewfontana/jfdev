<script setup lang="ts">
import { ArrowUpRightIcon } from '@lucide/vue'

/** Underlined text link with the JFDEV arrow. Inherits `text-primary` from the theme scope. */
const { to, newTab = false } = defineProps<{
  /** Internal path (localized automatically), in-page `#anchor` or external URL. */
  to: string
  newTab?: boolean
}>()

const isExternal = computed(() => /^(?:https?:|mailto:|tel:)/.test(to))
/** In-page anchor (`#section`): resolved against the current route, no locale prefix needed. */
const isAnchor = computed(() => to.startsWith('#'))
const CLASSES = 'inline-flex items-center gap-2 border-b border-current pb-1 text-sm font-semibold text-primary transition-colors hover:text-primary-hover'
</script>

<template>
  <NuxtLink
    v-if="isExternal || isAnchor"
    :to="to"
    :external="isExternal"
    :target="newTab ? '_blank' : undefined"
    :rel="newTab ? 'noopener' : undefined"
    :class="CLASSES"
  >
    <slot />
    <span
      v-if="newTab"
      class="sr-only"
    >{{ $t('common.opensInNewTab') }}</span>
    <ArrowUpRightIcon
      :size="16"
      aria-hidden="true"
    />
  </NuxtLink>
  <NuxtLinkLocale
    v-else
    :to="to"
    :class="CLASSES"
  >
    <slot />
    <ArrowUpRightIcon
      :size="16"
      aria-hidden="true"
    />
  </NuxtLinkLocale>
</template>
