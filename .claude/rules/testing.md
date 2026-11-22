---
paths:
  - "tests/**"
  - "**/*.test.ts"
  - "**/*.spec.ts"
  - "vitest.config.ts"
---

# Testes

- Vitest + `@nuxt/test-utils`. Projetos no `vitest.config.ts`:
  - `unit` (ambiente node): `tests/unit/**` — utils, composables puros, schemas.
  - `nuxt` (ambiente nuxt): `tests/nuxt/**` — componentes com `mountSuspended`.
- O que testar (prioridade): utils/composables com lógica, componentes com comportamento
  (props → saída, emits, estados), paridade de chaves i18n entre `pt-BR.json` e `en.json`.
- Não teste o framework nem snapshot de HTML inteiro. Teste comportamento observável.
- Nome: `<Arquivo>.test.ts`, `describe` com o nome da unidade, `it` descrevendo o
  comportamento em inglês (`it('renders reading time in the current locale')`).
- Bug corrigido → teste que falharia antes da correção.
- Testes não acessam rede. Mock com `mockNuxtImport` / `registerEndpoint` quando preciso.
- `pnpm test` deve rodar em < 30s; nada de sleeps.
