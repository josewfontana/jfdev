import { existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import type { Locale } from 'vue-i18n'
import { describe, expect, it } from 'vitest'

const CONTENT_DIR = join(import.meta.dirname, '../../content')

function markdownFiles(locale: Locale): string[] {
  const dir = join(CONTENT_DIR, locale)
  if (!existsSync(dir)) return []
  return readdirSync(dir, { recursive: true, encoding: 'utf8' })
    .filter(file => file.endsWith('.md'))
    .sort()
}

describe('content locales', () => {
  it('every post/project exists in both pt-BR and en with the same path', () => {
    const ptBR = markdownFiles('pt-BR')
    const en = markdownFiles('en')

    expect({
      missingInEn: ptBR.filter(file => !en.includes(file)),
      missingInPtBR: en.filter(file => !ptBR.includes(file)),
    }).toEqual({ missingInEn: [], missingInPtBR: [] })
  })
})
