import type { AnalyticsPage, GoogleTagCommand } from '~/types/gtag'

const deniedConsent = {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
} as const

export default defineNuxtPlugin({
  name: 'analytics',
  setup() {
    const { public: { ga4Id } } = useRuntimeConfig()
    const { choice, enabled } = useConsent()
    if (!enabled || !ga4Id.startsWith('G-')) return

    const router = useRouter()
    const disableKey = `ga-disable-${ga4Id}` as const
    const page = computed(() => {
      const route = router.currentRoute.value
      const template = route.matched.at(-1)?.path
      if (!template) return null
      return { path: route.path, template: template.replace(/:slug(?:\(\))?/, 'detail') }
    })
    let script: HTMLScriptElement | undefined
    let loaded = false
    let configured = false
    let lastPath: string | undefined

    function gtag(..._command: GoogleTagCommand): void {
      window.dataLayer ??= []
      // Google expects each command as an Arguments object.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments)
    }

    function trackPage(): void {
      const current = page.value
      if (!loaded || choice.value !== 'granted' || !current || lastPath === current.path) return

      // Route records supply static paths. Dynamic values, document titles and referrers stay local.
      const fields: AnalyticsPage = {
        page_location: new URL(current.template, location.origin).href,
        page_title: current.template,
        page_referrer: '',
        ignore_referrer: true,
      }
      gtag('set', fields)
      if (!configured) {
        gtag('config', ga4Id, {
          ...fields,
          send_page_view: false,
          allow_google_signals: false,
          allow_ad_personalization_signals: false,
        })
        configured = true
      }
      gtag('event', 'page_view', { ...fields, send_to: ga4Id })
      lastPath = current.path
    }

    watch(choice, (value) => {
      window[disableKey] = value !== 'granted'
      if (value !== 'granted') {
        if (script) gtag('consent', 'update', deniedConsent)
        lastPath = undefined
        for (const cookie of ['_ga', `_ga_${ga4Id.slice(2)}`]) {
          const expired = `${cookie}=; Max-Age=0; Path=/`
          document.cookie = expired
          const domains = location.hostname.split('.')
          for (let index = 0; index < domains.length - 1; index++) {
            document.cookie = `${expired}; Domain=${domains.slice(index).join('.')}`
          }
        }
        return
      }

      if (!script) {
        gtag('consent', 'default', deniedConsent)
        gtag('consent', 'update', { ...deniedConsent, analytics_storage: 'granted' })
        gtag('js', new Date())
        script = document.createElement('script')
        script.async = true
        script.referrerPolicy = 'no-referrer'
        script.src = `https://www.googletagmanager.com/gtag/js?id=${ga4Id}`
        script.addEventListener('load', () => {
          loaded = true
          trackPage()
        }, { once: true })
        script.addEventListener('error', () => {
          script?.remove()
          script = undefined
        }, { once: true })
        document.head.appendChild(script)
      }
      else {
        gtag('consent', 'update', { ...deniedConsent, analytics_storage: 'granted' })
        trackPage()
      }
    }, { flush: 'sync' })

    watch(page, trackPage)
  },
})
