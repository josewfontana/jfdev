---
paths:
  - "**/*.ts"
  - "**/*.vue"
---

# TypeScript — tipagem forte, sem `unknown`, sem casting

O objetivo é que **o compilador prove** que o código está certo. Tipos são desenhados antes
da implementação e derivados de uma fonte única; nunca "consertados" na ponta com cast.

## Proibido

| Proibido                         | Faça em vez disso                                          |
| -------------------------------- | ---------------------------------------------------------- |
| `any` (explícito ou implícito)   | tipo real do domínio                                       |
| `unknown` declarado no código    | tipo concreto; dado externo → schema zod (`z.infer`)       |
| `x as T` / `<T>x`                | `satisfies`, anotação, narrowing, schema, generic correto  |
| `as unknown as T`                | redesenhar o tipo — isso é sempre um bug escondido         |
| non-null `x!`                    | checagem explícita (`if (!x) throw createError(...)`)      |
| `@ts-ignore` / `@ts-expect-error`| corrigir o tipo; se for bug de lib, avise o José antes     |
| `Function`, `object`, `{}`       | assinatura/forma exata                                     |
| `enum`                           | union de literais / objeto `as const`                      |

**Exceções permitidas** (únicas):
- `as const` — não é cast, é inferência literal.
- `catch (error)`: o TS tipa como `unknown`; trate só com narrowing
  (`error instanceof Error`), sem cast. Não propague `unknown` adiante.

## Como modelar

- **Tipos primeiro**: tipos de domínio em `shared/types/` (ex.: `Locale`, `PostSummary`,
  `Project`) antes de escrever componente/composable.
- **Fonte única, tipos derivados** — não redeclare formas que já existem:
  - dado validado → `type Post = z.infer<typeof postSchema>`;
  - constantes → `const LOCALES = ['pt-BR', 'en'] as const; type Locale = typeof LOCALES[number]`;
  - Nuxt Content → tipos gerados das coleções; i18n/rotas → tipos gerados pelos módulos;
  - `Pick`/`Omit`/`Partial`/mapped types a partir do tipo base.
- **Fronteiras**: tudo que entra de fora (JSON, `$fetch` externo, query string, body,
  `localStorage`, env) passa por **schema zod** e sai tipado. `JSON.parse` sozinho é proibido
  (retorna `any`). No server, `getValidatedQuery` / `readValidatedBody` com schema.
- **`satisfies` em vez de anotar/castar** para checar sem perder o tipo literal:
  ```ts
  const variants = {
    primary: 'bg-primary text-primary-foreground',
    ghost: 'bg-transparent text-foreground',
  } as const satisfies Record<ButtonVariant, string>
  ```
- **Unions discriminadas** para estados e variantes, com checagem exaustiva:
  ```ts
  type LoadState<T> =
    | { status: 'idle' }
    | { status: 'success', data: T }
    | { status: 'error', message: string }

  function assertNever(value: never): never {
    throw new Error(`Unhandled case: ${JSON.stringify(value)}`)
  }
  ```
  `switch` sobre o discriminante termina em `default: return assertNever(state)`.
- **Narrowing** por `in`, `typeof`, `instanceof`, discriminante ou type guard
  `(x: A | B): x is A` — guards só entre tipos conhecidos, nunca para "transformar"
  `unknown` em algo.
- **Generics** com constraint (`<T extends PostSummary>`), nunca para fugir do tipo.
- **Imutabilidade**: `readonly` em props de tipos de domínio e `ReadonlyArray`/`readonly T[]`
  para listas que não devem mudar.
- **Branded types** quando dois `string` não podem se misturar (ex.: `Slug`), criados só por
  função construtora validada.
- Indexação: com `noUncheckedIndexedAccess`, `arr[0]` é `T | undefined` — trate o
  `undefined`, não use `!`.
- Funções exportadas, composables e utils têm **tipo de retorno explícito**.
- Vue: props/emits/slots/model por generics (`defineProps<Props>()`, `defineModel<T>()`),
  `useTemplateRef<HTMLElement>('el')`, `ref<T>()` com tipo quando não inferível.
- Prefira `type`; `interface` só para augmentation de módulo.

- `assertNever` está em `shared/utils/assertNever.ts` (auto-importado em `app/` e `server/`;
  dentro de `shared/` importe explicitamente por caminho relativo).
- Tipos gerados para usar em vez de redeclarar: `Locale` (`vue-i18n`), `MessageKey` (global,
  `app/types/i18n.d.ts`), `NuxtError` (`#app`), tipos das coleções do Nuxt Content.

## Enforcement (configurado — não desative)

- `tsconfig` (via `typescript.tsConfig` no `nuxt.config.ts`): `strict`,
  `noUncheckedIndexedAccess`, `noImplicitOverride`, `noImplicitReturns`,
  `noFallthroughCasesInSwitch`, `useUnknownInCatchVariables`.
- ESLint (`eslint.config.mjs`):
  - `@typescript-eslint/no-explicit-any`, `no-non-null-assertion`, `ban-ts-comment`
  - `@typescript-eslint/consistent-type-assertions` com `assertionStyle: 'never'`
    (continua permitindo `as const`)
  - `no-restricted-syntax` com seletor `TSUnknownKeyword` → proíbe escrever `unknown`
  - `@typescript-eslint/explicit-module-boundary-types` em `app/utils`, `app/composables`,
    `shared/`, `server/`
  - `no-console`
- Exaustividade de `switch` é garantida pelo compilador via `default: return assertNever(x)`
  (o lint não roda com type info, para continuar rápido).
- Lint e typecheck falhando por causa dessas regras **não** se resolve com disable comment.
  Única exceção existente: `no-empty-object-type` na augmentation de `DefineLocaleMessage`
  (module augmentation exige `interface`). Se um tipo de biblioteca impedir de verdade, pare e
  explique ao José.
