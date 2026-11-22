<script setup lang="ts">
// Global head lives in the layout (not app.vue) so error.vue, which replaces app.vue, gets it too.
const { t } = useI18n()
const i18nHead = useLocaleHead({ seo: true })
const { public: { siteUrl } } = useRuntimeConfig()

useHead({
  titleTemplate: title => (title ? `${title} · ${t('site.name')}` : t('site.title')),
  htmlAttrs: { lang: () => i18nHead.value.htmlAttrs.lang },
  link: () => [
    { rel: 'icon', href: '/favicon.ico', sizes: '32x32' },
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
    { rel: 'manifest', href: '/site.webmanifest' },
    ...i18nHead.value.link,
  ],
  meta: () => [
    { name: 'referrer', content: 'no-referrer' },
    { name: 'theme-color', content: '#242725' },
    ...i18nHead.value.meta,
  ],
  script: [
    { key: 'theme-init', innerHTML: THEME_INIT_SCRIPT, tagPosition: 'head' },
  ],
})

useSeoMeta({
  ogSiteName: () => t('site.name'),
  ogImage: `${siteUrl}/og/jfdev-og.png`,
  ogImageWidth: 1600,
  ogImageHeight: 900,
  ogImageAlt: () => t('site.title'),
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div
    id="top"
    class="flex min-h-dvh flex-col"
  >
    <a
      href="#main"
      class="sr-only rounded-control bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60]"
    >
      {{ $t('common.skipToContent') }}
    </a>

    <LayoutHeader />

    <!-- Pages own their sections (full-width bands + LayoutContainer inside). -->
    <main
      id="main"
      class="flex-1"
    >
      <slot />
    </main>

    <LayoutFooter />

    <LayoutConsentBanner />
  </div>
</template>
