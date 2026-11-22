<script setup lang="ts">
/**
 * Official LinkedIn profile badge. The third-party script only loads on the client, after the
 * badge enters the viewport; until then (and if it is blocked) the plain profile link is shown.
 */
const { locale, t } = useI18n()

const BADGE_SCRIPT = 'https://platform.linkedin.com/badges/js/profile.js'

const LINKEDIN_LOCALES = {
  'pt-BR': 'pt_BR',
  'en': 'en_US',
} as const

const root = useTemplateRef<HTMLElement>('root')
const requested = ref(false)

onMounted(() => {
  const element = root.value
  if (!element) return
  const observer = new IntersectionObserver((entries) => {
    if (!entries.some(entry => entry.isIntersecting)) return
    observer.disconnect()
    requested.value = true
  }, { rootMargin: '200px' })
  observer.observe(element)
  onBeforeUnmount(() => observer.disconnect())
})

useHead(() => ({
  script: requested.value ? [{ key: 'linkedin-badge', src: BADGE_SCRIPT, async: true, defer: true }] : [],
}))
</script>

<template>
  <div
    ref="root"
    class="min-h-64 rounded-card border border-border-default bg-surface p-6"
  >
    <p class="mb-4 text-eyebrow font-bold text-primary uppercase">
      {{ t('engineering.cv.badgeTitle') }}
    </p>
    <div
      class="badge-base LI-profile-badge"
      :data-locale="LINKEDIN_LOCALES[locale]"
      data-size="large"
      data-theme="light"
      data-type="VERTICAL"
      :data-vanity="CONTACT.linkedinVanity"
      data-version="v1"
    >
      <UiArrowLink
        :to="CONTACT.linkedinUrl"
        new-tab
      >
        {{ t('engineering.cv.badgeFallback') }}
      </UiArrowLink>
    </div>
  </div>
</template>
