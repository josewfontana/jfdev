<script setup lang="ts">
/** Section heading block: kicker, two-line h2 (second line optional) and a short lead. */
const { kicker, titleStart, titleEnd, lead } = defineProps<{
  kicker: string
  titleStart: string
  titleEnd?: string
  lead?: string
}>()
</script>

<template>
  <header class="mb-12 md:mb-14">
    <UiKicker>{{ kicker }}</UiKicker>
    <div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
      <h2 class="max-w-4xl text-section md:flex-1">
        <span class="block">{{ titleStart }}</span>
        <span
          v-if="titleEnd"
          class="block"
        >{{ titleEnd }}</span>
      </h2>
      <p
        v-if="lead"
        class="max-w-xs text-[0.9375rem] leading-relaxed text-text-muted md:shrink-0"
      >
        {{ lead }}
      </p>
    </div>
  </header>
</template>
