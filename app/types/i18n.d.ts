import type ptBR from '../../i18n/locales/pt-BR.json'

/**
 * pt-BR (default locale) is the source of truth for message keys.
 * en must mirror it (enforced by ESLint `no-missing-keys-in-other-locales` and tests/unit/i18nParity).
 */
type Messages = typeof ptBR

type LeafPaths<T, Prefix extends string = ''> = {
  [K in keyof T & string]: T[K] extends string ? `${Prefix}${K}` : LeafPaths<T[K], `${Prefix}${K}.`>
}[keyof T & string]

declare global {
  /**
   * Every valid translation key. Use it to type keys stored in data
   * (`labelKey: MessageKey`) so `t(item.labelKey)` is checked at compile time.
   * Literal keys in `t('...')` are checked by ESLint `no-missing-keys`.
   */
  type MessageKey = LeafPaths<Messages>
}

declare module 'vue-i18n' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type -- module augmentation requires an interface
  export interface DefineLocaleMessage extends Messages {}
}

export {}
