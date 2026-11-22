import { z } from 'zod'

/** Visitor's choice about analytics cookies (Google Consent Mode `analytics_storage`). */
export const consentChoiceSchema = z.enum(['granted', 'denied'])

export type ConsentChoice = z.infer<typeof consentChoiceSchema>

export const CONSENT_STORAGE_KEY = 'jf-consent'

export const ga4IdSchema = z.string().regex(/^G-[A-Z0-9]+$/)
