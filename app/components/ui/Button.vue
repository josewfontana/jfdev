<script setup lang="ts">
import { ArrowDownIcon, ArrowRightIcon, ArrowUpRightIcon, type LucideIcon } from '@lucide/vue'

/**
 * Link styled as a button. Contrast of each variant (WCAG AA, checked):
 * primary 10:1 (light) / 8.4:1 (dark) · teal white/#507F78 4.52:1 · ivory 13.3:1 ·
 * charcoal 15.4:1 · outline-light white on teal 4.52:1 / on charcoal 15.4:1.
 */
export type ButtonVariant = 'primary' | 'teal' | 'ivory' | 'charcoal' | 'outline-light'
export type ButtonIcon = 'arrow-up-right' | 'arrow-down' | 'arrow-right'

const { to, variant, icon = 'arrow-up-right', newTab = false } = defineProps<{
  /** Internal path (localized automatically), in-page `#anchor` or external URL (https:, mailto:). */
  to: string
  variant: ButtonVariant
  icon?: ButtonIcon
  newTab?: boolean
}>()

const VARIANTS = {
  'primary': 'bg-primary text-primary-foreground hover:bg-primary-hover',
  'teal': 'bg-brand-teal text-white hover:bg-brand-deep-teal',
  'ivory': 'bg-brand-ivory text-brand-charcoal hover:bg-white',
  'charcoal': 'bg-brand-charcoal text-white hover:bg-brand-deep-teal',
  'outline-light': 'border border-white/70 text-white hover:bg-white/10',
} as const satisfies Record<ButtonVariant, string>

const ICONS = {
  'arrow-up-right': ArrowUpRightIcon,
  'arrow-down': ArrowDownIcon,
  'arrow-right': ArrowRightIcon,
} as const satisfies Record<ButtonIcon, LucideIcon>

const isExternal = computed(() => /^(?:https?:|mailto:|tel:)/.test(to))
/** In-page anchor (`#section`): resolved against the current route, no locale prefix needed. */
const isAnchor = computed(() => to.startsWith('#'))
const classes = computed(() => [
  'inline-flex min-h-12 items-center justify-between gap-6 rounded-control px-5 py-3 text-sm font-semibold transition motion-safe:hover:-translate-y-0.5',
  VARIANTS[variant],
])
</script>

<template>
  <NuxtLink
    v-if="isExternal || isAnchor"
    :to="to"
    :external="isExternal"
    :target="newTab ? '_blank' : undefined"
    :rel="newTab ? 'noopener' : undefined"
    :class="classes"
  >
    <span>
      <slot />
      <span
        v-if="newTab"
        class="sr-only"
      >{{ $t('common.opensInNewTab') }}</span>
    </span>
    <component
      :is="ICONS[icon]"
      :size="18"
      aria-hidden="true"
    />
  </NuxtLink>
  <NuxtLinkLocale
    v-else
    :to="to"
    :class="classes"
  >
    <span><slot /></span>
    <component
      :is="ICONS[icon]"
      :size="18"
      aria-hidden="true"
    />
  </NuxtLinkLocale>
</template>
