<script setup lang="ts">
const { choice, isBannerOpen, init, choose } = useConsent()

const isConfiguring = ref(false)
const allowAnalytics = ref(false)

function configure(): void {
  allowAnalytics.value = choice.value === 'granted'
  isConfiguring.value = true
}

watch(isBannerOpen, (open) => {
  if (!open) isConfiguring.value = false
})

onMounted(init)
</script>

<template>
  <Transition name="menu">
    <section
      v-if="isBannerOpen"
      :aria-label="$t('consent.label')"
      class="fixed inset-x-0 bottom-0 z-50 p-4 sm:bottom-4 sm:left-auto sm:max-w-md sm:pr-4"
    >
      <div class="rounded-card border border-border-default bg-surface-elevated p-6 text-foreground shadow-lg">
        <p class="text-sm leading-relaxed text-text-muted">
          {{ $t('consent.text') }}
          <NuxtLinkLocale
            to="/privacy"
            class="font-semibold text-primary underline underline-offset-4 hover:text-primary-hover"
          >
            {{ $t('consent.policy') }}
          </NuxtLinkLocale>
        </p>
        <label
          v-if="isConfiguring"
          class="mt-4 flex min-h-12 items-center gap-3 text-sm"
        >
          <input
            v-model="allowAnalytics"
            type="checkbox"
            class="size-5 accent-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
          {{ $t('consent.analytics') }}
        </label>
        <div class="mt-5 grid grid-cols-2 gap-3">
          <button
            type="button"
            class="min-h-12 rounded-control border border-text-muted px-4 text-sm font-semibold transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            @click="choose('denied')"
          >
            {{ $t('consent.decline') }}
          </button>
          <button
            v-if="!isConfiguring"
            type="button"
            class="min-h-12 rounded-control bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            @click="choose('granted')"
          >
            {{ $t('consent.accept') }}
          </button>
          <button
            v-else
            type="button"
            class="min-h-12 rounded-control bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            @click="choose(allowAnalytics ? 'granted' : 'denied')"
          >
            {{ $t('consent.save') }}
          </button>
          <button
            v-if="!isConfiguring"
            type="button"
            class="col-span-2 min-h-12 rounded-control border border-text-muted px-4 text-sm font-semibold transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            @click="configure"
          >
            {{ $t('consent.configure') }}
          </button>
        </div>
      </div>
    </section>
  </Transition>
</template>
