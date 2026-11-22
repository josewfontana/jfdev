import { mountSuspended } from '@nuxt/test-utils/runtime'
import { beforeEach, describe, expect, it } from 'vitest'
import ThemeToggle from '~/components/layout/ThemeToggle.vue'

describe('LayoutThemeToggle', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')
  })

  it('cycles the preference, persists it and applies the dark class', async () => {
    const wrapper = await mountSuspended(ThemeToggle)
    const button = wrapper.get('button')

    expect(button.attributes('aria-label')).toContain('automático')

    await button.trigger('click')
    expect(localStorage.getItem('jf-theme')).toBe('light')
    expect(document.documentElement.classList.contains('dark')).toBe(false)

    await button.trigger('click')
    expect(localStorage.getItem('jf-theme')).toBe('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(button.attributes('aria-label')).toContain('escuro')
  })
})
