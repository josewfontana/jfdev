import type { ComputedRef } from 'vue'
import type { Locale } from 'vue-i18n'

export type ContentKind = 'blog' | 'projects'

const COLLECTION_SUFFIX = {
  'pt-BR': 'pt',
  'en': 'en',
} as const satisfies Record<Locale, string>

type CollectionSuffix = (typeof COLLECTION_SUFFIX)[Locale]

export type LocaleCollectionName<K extends ContentKind = ContentKind> = `${K}_${CollectionSuffix}`

export function collectionFor<K extends ContentKind>(kind: K, locale: Locale): LocaleCollectionName<K> {
  return `${kind}_${COLLECTION_SUFFIX[locale]}` as const
}

/** Nuxt Content collection for the given kind in the current locale. */
export function useLocaleCollection<K extends ContentKind>(kind: K): ComputedRef<LocaleCollectionName<K>> {
  const { locale } = useI18n()
  return computed(() => collectionFor(kind, locale.value))
}
