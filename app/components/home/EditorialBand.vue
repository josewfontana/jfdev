<script setup lang="ts">
import { ArrowUpRightIcon } from '@lucide/vue'
</script>

<template>
  <section
    :aria-label="$t('home.editorial.label')"
    class="border-y border-border-default bg-surface-elevated"
  >
    <LayoutContainer class="grid grid-cols-[auto_1fr] items-center gap-4 py-7 sm:grid-cols-[auto_1fr_auto] sm:gap-9">
      <span class="font-heading text-xs font-semibold tracking-widest text-primary">
        {{ $t('home.editorial.index') }}
      </span>
      <p class="font-heading text-base font-medium tracking-tight md:text-xl">
        {{ $t('home.editorial.text') }}
      </p>
      <ArrowUpRightIcon
        :size="28"
        class="hidden text-primary sm:block"
        aria-hidden="true"
      />
    </LayoutContainer>
  </section>
</template>
