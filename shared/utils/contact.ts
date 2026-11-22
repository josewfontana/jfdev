/** Official JFDEV contacts (brand package README). Single source for every link on the site. */
export const CONTACT = {
  email: 'contato@jfdev.com.br',
  whatsappNumber: '5541996730987',
  whatsappDisplay: '(41) 99673-0987',
  linkedinUrl: 'https://www.linkedin.com/in/josewfontana/',
  linkedinVanity: 'josewfontana',
} as const

export function whatsappUrl(message: string): string {
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`
}

export function mailtoUrl(subject: string): string {
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}`
}
