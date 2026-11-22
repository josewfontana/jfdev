<script setup lang="ts">
import { ArrowUpIcon } from '@lucide/vue'

// Brand band: always charcoal/ivory, in both themes.
const consent = useConsent()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="theme-dark bg-brand-charcoal text-foreground">
    <LayoutContainer class="flex flex-col gap-6 py-12 sm:flex-row sm:items-center sm:justify-between">
      <BrandLogo />
      <p class="text-xs text-text-muted sm:order-none">
        {{ $t('site.footerTagline') }} {{ $t('common.copyright', { year }) }}
        <NuxtLinkLocale
          to="/privacy"
          class="ml-2 underline underline-offset-4 transition-colors hover:text-primary"
        >
          {{ $t('nav.privacy') }}
        </NuxtLinkLocale>
        <button
          v-if="consent.enabled"
          type="button"
          class="ml-2 min-h-6 underline underline-offset-4 transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          @click="consent.openSettings"
        >
          {{ $t('privacy.cookies.manage') }}
        </button>
      </p>
      <a
        href="#top"
        class="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-foreground uppercase transition-colors hover:text-primary"
      >
        <ArrowUpIcon
          :size="14"
          aria-hidden="true"
        />
        {{ $t('common.backToTop') }}
      </a>
    </LayoutContainer>
  </footer>
</template>
