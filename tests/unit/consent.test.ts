import { describe, expect, it } from 'vitest'
import { consentChoiceSchema, ga4IdSchema } from '../../shared/utils/consent'

describe('consent', () => {
  it('accepts only granted/denied as stored choice', () => {
    expect(consentChoiceSchema.safeParse('granted').success).toBe(true)
    expect(consentChoiceSchema.safeParse('denied').success).toBe(true)
    expect(consentChoiceSchema.safeParse('yes').success).toBe(false)
    expect(consentChoiceSchema.safeParse(null).success).toBe(false)
  })

  it('validates GA4 measurement ids', () => {
    expect(ga4IdSchema.safeParse('G-3PVL41MGPX').success).toBe(true)
    expect(ga4IdSchema.safeParse('GTM-PNVWRQ6Q').success).toBe(false)
    expect(ga4IdSchema.safeParse('G-invalid"id').success).toBe(false)
  })
})
