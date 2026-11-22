<script setup lang="ts">
import { MonitorIcon, MoonIcon, SunIcon, type LucideIcon } from '@lucide/vue'

const { t } = useI18n()
const { preference, cyclePreference } = useTheme()

const ICONS = {
  light: SunIcon,
  dark: MoonIcon,
  system: MonitorIcon,
} as const satisfies Record<ThemePreference, LucideIcon>

const LABEL_KEYS = {
  light: 'theme.light',
  dark: 'theme.dark',
  system: 'theme.system',
} as const satisfies Record<ThemePreference, MessageKey>

const label = computed(() => t('theme.toggleLabel', { theme: t(LABEL_KEYS[preference.value]) }))
</script>

<template>
  <button
    type="button"
    :aria-label="label"
    :title="label"
    class="inline-flex size-9 items-center justify-center rounded-control text-text-muted transition-colors hover:bg-surface-elevated hover:text-foreground"
    @click="cyclePreference"
  >
    <Transition
      name="icon-swap"
      mode="out-in"
    >
      <component
        :is="ICONS[preference]"
        :key="preference"
        :size="20"
        aria-hidden="true"
      />
    </Transition>
  </button>
</template>
