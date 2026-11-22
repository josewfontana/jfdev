<script setup lang="ts">
import { PlusIcon } from '@lucide/vue'

type Question = {
  readonly question: MessageKey
  readonly answer: MessageKey
}

const QUESTIONS: readonly Question[] = [
  { question: 'home.faq.scopeQuestion', answer: 'home.faq.scopeAnswer' },
  { question: 'home.faq.existingQuestion', answer: 'home.faq.existingAnswer' },
  { question: 'home.faq.budgetQuestion', answer: 'home.faq.budgetAnswer' },
  { question: 'home.faq.globalQuestion', answer: 'home.faq.globalAnswer' },
]
</script>

<template>
  <section
    id="faq"
    class="bg-background py-section"
  >
    <LayoutContainer class="grid gap-10 md:grid-cols-12 md:gap-16">
      <div class="md:col-span-5">
        <UiKicker>{{ $t('home.faq.kicker') }}</UiKicker>
        <h2 class="text-section text-balance">
          {{ $t('home.faq.title') }}
        </h2>
        <p class="mt-6 leading-relaxed text-text-muted">
          {{ $t('home.faq.lead') }}
        </p>
      </div>
      <div class="border-t border-border-default md:col-span-7">
        <!-- Native <details>: keyboard and screen-reader support for free. -->
        <details
          v-for="item in QUESTIONS"
          :key="item.question"
          class="group border-b border-border-default"
        >
          <summary class="flex cursor-pointer list-none items-start justify-between gap-4 py-6 font-heading text-lg font-semibold tracking-tight md:text-xl [&::-webkit-details-marker]:hidden">
            {{ $t(item.question) }}
            <PlusIcon
              :size="24"
              class="mt-0.5 shrink-0 text-primary transition-transform group-open:rotate-45"
              aria-hidden="true"
            />
          </summary>
          <p class="max-w-2xl pr-7 pb-6 text-sm leading-relaxed text-text-muted">
            {{ $t(item.answer) }}
          </p>
        </details>
      </div>
    </LayoutContainer>
  </section>
</template>
