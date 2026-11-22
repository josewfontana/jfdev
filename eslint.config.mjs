// @ts-check
import vueI18n from '@intlify/eslint-plugin-vue-i18n'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    name: 'jfdev/typescript-strict',
    files: ['**/*.ts', '**/*.vue'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-assertions': ['error', { assertionStyle: 'never' }],
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/ban-ts-comment': 'error',
      'no-restricted-syntax': [
        'error',
        {
          selector: 'TSUnknownKeyword',
          message: 'Do not write `unknown`: model a concrete type or validate with a zod schema.',
        },
      ],
      'no-console': 'error',
    },
  },
  {
    name: 'jfdev/explicit-boundaries',
    files: ['app/utils/**/*.ts', 'app/composables/**/*.ts', 'shared/**/*.ts', 'server/**/*.ts'],
    rules: {
      '@typescript-eslint/explicit-module-boundary-types': 'error',
    },
  },
  ...vueI18n.configs['flat/base'],
  {
    name: 'jfdev/i18n',
    settings: {
      'vue-i18n': {
        localeDir: './i18n/locales/*.json',
        messageSyntaxVersion: '^11.0.0',
      },
    },
    rules: {
      // t()/$t() keys must exist; dynamic keys are typed as `MessageKey` instead (app/types/i18n.d.ts).
      '@intlify/vue-i18n/no-missing-keys': 'error',
      '@intlify/vue-i18n/no-missing-keys-in-other-locales': 'error',
      '@intlify/vue-i18n/no-raw-text': ['error', { ignorePattern: '^[\\s\\d.,:;·•|/()\\-–—©&#]+$' }],
      '@intlify/vue-i18n/no-html-messages': 'error',
      '@intlify/vue-i18n/no-v-html': 'error',
      '@intlify/vue-i18n/valid-message-syntax': 'error',
      '@intlify/vue-i18n/no-duplicate-keys-in-locale': 'error',
      '@intlify/vue-i18n/key-format-style': ['error', 'camelCase'],
      '@intlify/vue-i18n/no-deprecated-tc': 'error',
    },
  },
)
