<script setup lang="ts">
const { t } = useI18n()

// Home uses the full brand title, without the "· JFDEV" template.
useHead({ titleTemplate: null })
useSeoMeta({
  title: () => t('site.title'),
  description: () => t('seo.home.description'),
  ogTitle: () => t('site.title'),
  ogDescription: () => t('seo.home.description'),
  ogType: 'website',
})
</script>

<template>
  <div>
    <HomeHero />
    <HomeEditorialBand />
    <HomeServices />
    <HomeSolutions />
    <HomeAbout />
    <HomeProcess />
    <HomeEngagement />
    <HomeProjectsTeaser />
    <HomeFaq />
    <HomeContact />
  </div>
</template>
