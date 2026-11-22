<script setup lang="ts">
// Terracotta band (manual: accent, not a reading color). Only LARGE white text sits on it
// (3.65:1 >= 3:1); small text lives on the charcoal kicker badge and the ivory brief card.
const { t } = useI18n()
const { topic, whatsappHref } = useContactTopic()

const genericWhatsapp = computed(() => whatsappUrl(t('home.contact.messageGeneric')))
const emailHref = computed(() => mailtoUrl(t('home.contact.emailSubject')))
</script>

<template>
  <section
    id="contact"
    class="bg-brand-terracotta py-section text-white [--focus-ring:var(--color-white)]"
  >
    <LayoutContainer class="grid gap-10 md:grid-cols-12 md:items-end md:gap-20">
      <div class="md:col-span-6">
        <p class="mb-7 inline-block rounded-control bg-brand-charcoal px-3 py-1.5 text-eyebrow font-bold text-brand-ivory uppercase">
          {{ $t('home.contact.kicker') }}
        </p>
        <h2 class="text-section text-balance">
          {{ $t('home.contact.title') }}
        </h2>
        <p class="mt-6 max-w-lg text-2xl leading-snug">
          {{ $t('home.contact.text') }}
        </p>
      </div>

      <div class="md:col-span-6">
        <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <UiButton
            :to="genericWhatsapp"
            variant="charcoal"
            new-tab
          >
            {{ $t('home.contact.whatsapp') }}
          </UiButton>
          <UiButton
            :to="emailHref"
            variant="ivory"
          >
            {{ $t('home.contact.email') }}
          </UiButton>
        </div>

        <div class="theme-light mt-5 max-w-xl rounded-card bg-background p-5 text-foreground [--focus-ring:var(--color-brand-terracotta)] sm:p-6">
          <label
            for="contact-topic"
            class="mb-2.5 block text-sm font-bold"
          >
            {{ $t('home.contact.briefLabel') }}
          </label>
          <select
            id="contact-topic"
            v-model="topic"
            class="min-h-12 w-full rounded-control border border-text-muted bg-surface px-3 text-sm font-medium text-foreground"
          >
            <option value="">
              {{ $t('home.contact.briefPlaceholder') }}
            </option>
            <option
              v-for="item in CONTACT_TOPICS"
              :key="item"
              :value="item"
            >
              {{ $t(CONTACT_TOPIC_LABELS[item]) }}
            </option>
          </select>
          <UiButton
            :to="whatsappHref"
            variant="charcoal"
            new-tab
            class="mt-3.5"
          >
            {{ $t('home.contact.briefCta') }}
          </UiButton>
          <p class="mt-3 text-xs leading-normal text-text-muted">
            {{ $t('home.contact.briefNote') }}
          </p>
        </div>
      </div>
    </LayoutContainer>
  </section>
</template>
