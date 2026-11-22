import { z } from 'zod'
import { assertNever } from './assertNever'

export const THEME_PREFERENCES = ['light', 'dark', 'system'] as const

export const themePreferenceSchema = z.enum(THEME_PREFERENCES)

export type ThemePreference = z.infer<typeof themePreferenceSchema>

export const THEME_STORAGE_KEY = 'jf-theme'

const NEXT_PREFERENCE = {
  light: 'dark',
  dark: 'system',
  system: 'light',
} as const satisfies Record<ThemePreference, ThemePreference>

export function nextThemePreference(current: ThemePreference): ThemePreference {
  return NEXT_PREFERENCE[current]
}

export function resolveIsDark(preference: ThemePreference, systemPrefersDark: boolean): boolean {
  switch (preference) {
    case 'light':
      return false
    case 'dark':
      return true
    case 'system':
      return systemPrefersDark
    default:
      return assertNever(preference)
  }
}

/**
 * Inline script run in <head> before first paint, so prerendered pages do not
 * flash the wrong theme. Kept dependency-free on purpose.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var p=localStorage.getItem('${THEME_STORAGE_KEY}');var d=p==='dark'||(p!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d)}catch(e){}})()`
