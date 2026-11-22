import { describe, expect, it } from 'vitest'
import { CONTACT, mailtoUrl, whatsappUrl } from '../../shared/utils/contact'

describe('contact links', () => {
  it('builds a WhatsApp link with the official number and an encoded message', () => {
    expect(whatsappUrl('Olá! Projeto & ideias?')).toBe(
      `https://wa.me/${CONTACT.whatsappNumber}?text=Ol%C3%A1!%20Projeto%20%26%20ideias%3F`,
    )
  })

  it('builds a mailto link with an encoded subject', () => {
    expect(mailtoUrl('Projeto JFDEV')).toBe('mailto:contato@jfdev.com.br?subject=Projeto%20JFDEV')
  })
})
