import type { Ref } from 'vue'

type UseTheme = {
  preference: Readonly<Ref<ThemePreference>>
  cyclePreference: () => void
}

const DARK_QUERY = '(prefers-color-scheme: dark)'

function readStoredPreference(): ThemePreference {
  try {
    const parsed = themePreferenceSchema.safeParse(localStorage.getItem(THEME_STORAGE_KEY))
    return parsed.success ? parsed.data : 'system'
  }
  catch {
    return 'system'
  }
}

function applyPreference(preference: ThemePreference): void {
  const isDark = resolveIsDark(preference, window.matchMedia(DARK_QUERY).matches)
  document.documentElement.classList.toggle('dark', isDark)
}

/**
 * Light / dark / system theme. SSR always renders `system`; the real preference is
 * read on mount (the inline head script already applied the class before paint).
 */
export function useTheme(): UseTheme {
  const preference = useState<ThemePreference>('theme-preference', () => 'system')

  onMounted(() => {
    preference.value = readStoredPreference()

    const media = window.matchMedia(DARK_QUERY)
    const onSystemChange = (): void => {
      if (preference.value === 'system') applyPreference('system')
    }
    media.addEventListener('change', onSystemChange)
    onBeforeUnmount(() => media.removeEventListener('change', onSystemChange))
  })

  function cyclePreference(): void {
    const next = nextThemePreference(preference.value)
    preference.value = next
    applyPreference(next)
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next)
    }
    catch {
      // Storage can be unavailable (private mode); the choice still applies to this visit.
    }
  }

  return { preference: readonly(preference), cyclePreference }
}
