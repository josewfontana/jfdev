import type { Ref } from 'vue'

/** True once the page is scrolled past `threshold` px (rAF-throttled, passive listener). */
export function useScrolled(threshold = 16): Readonly<Ref<boolean>> {
  const scrolled = ref(false)

  onMounted(() => {
    let pending = false
    const update = (): void => {
      scrolled.value = window.scrollY > threshold
      pending = false
    }
    const onScroll = (): void => {
      if (pending) return
      pending = true
      requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
  })

  return readonly(scrolled)
}
