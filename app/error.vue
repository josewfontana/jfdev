<script setup lang="ts">
import type { NuxtError } from '#app'

const { error } = defineProps<{ error: NuxtError }>()

const { t } = useI18n()
const localePath = useLocalePath()

type ErrorKind = 'notFound' | 'generic'

const MESSAGES = {
  notFound: { title: 'error.notFound.title', description: 'error.notFound.description' },
  generic: { title: 'error.generic.title', description: 'error.generic.description' },
} as const satisfies Record<ErrorKind, { title: MessageKey, description: MessageKey }>

const messages = computed(() => MESSAGES[error.statusCode === 404 ? 'notFound' : 'generic'])
const title = computed(() => t(messages.value.title))

useSeoMeta({
  title,
  robots: 'noindex',
})

function goHome(): void {
  void clearError({ redirect: localePath('/') })
}
</script>

<template>
  <NuxtLayout>
    <LayoutContainer
      as="section"
      class="space-y-6 py-section sm:py-section-lg"
    >
      <p class="font-mono text-sm text-primary">
        {{ error.statusCode }}
      </p>
      <h1 class="text-3xl font-bold tracking-tight sm:text-4xl">
        {{ title }}
      </h1>
      <p class="text-text-muted">
        {{ $t(messages.description) }}
      </p>
      <button
        type="button"
        class="rounded-control bg-primary px-4 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
        @click="goHome"
      >
        {{ $t('error.backHome') }}
      </button>
    </LayoutContainer>
  </NuxtLayout>
</template>
