import type { ConsentChoice } from '../../shared/utils/consent'

export type AnalyticsPage = {
  page_location: string
  page_title: string
  page_referrer: string
  ignore_referrer: true
}

type GoogleTagConsent = {
  analytics_storage: ConsentChoice
  ad_storage: 'denied'
  ad_user_data: 'denied'
  ad_personalization: 'denied'
}

export type GoogleTagCommand
  = | [command: 'consent', action: 'default' | 'update', settings: GoogleTagConsent]
    | [command: 'js', time: Date]
    | [command: 'set', settings: AnalyticsPage]
    | [command: 'config', id: string, settings: AnalyticsPage & {
      send_page_view: false
      allow_google_signals: false
      allow_ad_personalization_signals: false
    }]
    | [command: 'event', event: 'page_view', settings: AnalyticsPage & { send_to: string }]

declare global {
  interface Window {
    dataLayer?: IArguments[]
    [key: `ga-disable-${string}`]: boolean | undefined
  }
}
