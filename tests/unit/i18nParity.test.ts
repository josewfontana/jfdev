import { describe, expect, it } from 'vitest'
import en from '../../i18n/locales/en.json'
import ptBR from '../../i18n/locales/pt-BR.json'

type Messages = { readonly [key: string]: string | Messages }

function flattenKeys(messages: Messages, prefix = ''): string[] {
  return Object.entries(messages).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key
    return typeof value === 'string' ? [path] : flattenKeys(value, path)
  })
}

describe('i18n locale files', () => {
  it('have exactly the same keys in the same order', () => {
    expect(flattenKeys(en)).toEqual(flattenKeys(ptBR))
  })

  it('have no empty messages', () => {
    const empty = (messages: Messages): string[] =>
      Object.entries(messages).flatMap(([key, value]) =>
        typeof value === 'string' ? (value.trim() ? [] : [key]) : empty(value),
      )
    expect(empty(ptBR)).toEqual([])
    expect(empty(en)).toEqual([])
  })
})
