<script setup lang="ts">
/** Two-column section: kicker + heading on the left, free content on the right. */
const { kicker, title } = defineProps<{
  kicker: string
  title: string
}>()
</script>

<template>
  <div class="grid gap-8 md:grid-cols-12 md:gap-12">
    <div class="md:col-span-5">
      <UiKicker>{{ kicker }}</UiKicker>
      <h2 class="text-section text-balance">
        {{ title }}
      </h2>
    </div>
    <div class="md:col-span-7 md:pt-12">
      <slot />
    </div>
  </div>
</template>
