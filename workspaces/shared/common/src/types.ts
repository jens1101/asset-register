/**
 * Utility type to make a type nullish.
 */
export type Maybe<T> = T | null | undefined;

/**
 * Utility type that can be used to type `Object.entries()` and other similar
 * `.entries` methods.
 *
 * @example
 * ```
 * interface Example {
 *   someKey: number;
 * }
 *
 * const example: Example = {someKey: 1};
 * for (cont entry of Object.entries(example) as Entries<Example>) {
 *  console.log(entry.someKey++); // Properly typed
 * }
 * ```
 */
export type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];
