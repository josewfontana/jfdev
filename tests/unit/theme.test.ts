import { describe, expect, it } from 'vitest'
import { nextThemePreference, resolveIsDark, themePreferenceSchema } from '../../shared/utils/theme'

describe('theme', () => {
  it('cycles light → dark → system → light', () => {
    expect(nextThemePreference('light')).toBe('dark')
    expect(nextThemePreference('dark')).toBe('system')
    expect(nextThemePreference('system')).toBe('light')
  })

  it('follows the OS only for the system preference', () => {
    expect(resolveIsDark('light', true)).toBe(false)
    expect(resolveIsDark('dark', false)).toBe(true)
    expect(resolveIsDark('system', true)).toBe(true)
    expect(resolveIsDark('system', false)).toBe(false)
  })

  it('rejects invalid stored values', () => {
    expect(themePreferenceSchema.safeParse('sepia').success).toBe(false)
    expect(themePreferenceSchema.safeParse(null).success).toBe(false)
    expect(themePreferenceSchema.safeParse('dark').success).toBe(true)
  })
})
