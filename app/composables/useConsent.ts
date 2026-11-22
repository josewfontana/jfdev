import type { Ref } from 'vue'

type UseConsent = {
  /** False when no GA4 id is configured (e.g. local dev): no banner, nothing to manage. */
  enabled: boolean
  choice: Readonly<Ref<ConsentChoice | null>>
  isBannerOpen: Readonly<Ref<boolean>>
  /** Reads the stored choice and opens the banner if there is none. Call on mount. */
  init: () => void
  choose: (choice: ConsentChoice) => void
  openSettings: () => void
}

function readStoredChoice(): ConsentChoice | null {
  try {
    const parsed = consentChoiceSchema.safeParse(localStorage.getItem(CONSENT_STORAGE_KEY))
    return parsed.success ? parsed.data : null
  }
  catch {
    return null
  }
}

export function useConsent(): UseConsent {
  const { public: { ga4Id } } = useRuntimeConfig()
  const enabled = !import.meta.dev && ga4IdSchema.safeParse(ga4Id).success
  const choice = useState<ConsentChoice | null>('analytics-consent', () => null)
  const isBannerOpen = useState('consent-banner-open', () => false)

  function init(): void {
    if (!enabled) return
    choice.value ??= readStoredChoice()
    if (choice.value === null) isBannerOpen.value = true
  }

  function choose(value: ConsentChoice): void {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, value)
    }
    catch {
      // Storage can be unavailable (private mode); the choice still applies to this visit.
    }
    choice.value = value
    isBannerOpen.value = false
  }

  function openSettings(): void {
    isBannerOpen.value = true
  }

  return { enabled, choice: readonly(choice), isBannerOpen: readonly(isBannerOpen), init, choose, openSettings }
}
