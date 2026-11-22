/**
 * Compile-time exhaustiveness check for discriminated unions.
 * Reaching it at runtime means a union member was not handled.
 */
export function assertNever(value: never): never {
  throw new Error(`Unhandled case: ${JSON.stringify(value)}`)
}
