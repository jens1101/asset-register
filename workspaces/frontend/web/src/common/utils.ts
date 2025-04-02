import type {
  FileFragment,
  SumFragment,
} from "../gql-client/graphql.generated.ts";
import { BigDecimal, Effect, Equivalence, Logger, pipe } from "effect";
import { createResource } from "solid-js";

/** Tests if the specified file is an image by checking the mime type. */
export function isImage(file: File): boolean {
  return file.type.startsWith("image/");
}

/** Equivalence to test if two files are equal. */
export const FileEquivalence = Equivalence.make<
  Pick<FileFragment, "filename" | "mimeType" | "buffer">
>(
  (self, that) =>
    self.filename === that.filename &&
    self.mimeType === that.mimeType &&
    // We use this IndexedDB function, because it's the only built-in browser
    // function that can compare two byte arrays.
    indexedDB.cmp(self.buffer, that.buffer) === 0,
);

/** Equivalence to test if two sums are equal. */
export const SumEquivalence = Equivalence.make<
  Pick<SumFragment, "currency" | "amount">
>(
  (self, that) =>
    self.currency === that.currency &&
    BigDecimal.equals(self.amount, that.amount),
);

/**
 * Sets the value of an input element. This also allows setting the files
 * property for input elements that support it.
 * @param element The element to update. Nothing will happen if this element
 * does not support setting the necessary properties.
 * @param value The value to use.
 */
export function setInputValue(
  element: unknown,
  value: string | File | File[],
): void {
  if (
    typeof value === "string" &&
    element instanceof HTMLElement &&
    "value" in element
  ) {
    element.value = value;
  }

  if (typeof value !== "string" && element instanceof HTMLInputElement) {
    const container = new DataTransfer();

    [value].flat().forEach((file) => container.items.add(file));
    element.files = container.files;
  }
}

/**
 * Convenience function for retrying an effect. If the effect fails then it will
 * be retried while the `until` callback remains true.
 *
 * This is usually used together with a modal that prompts the user if they want
 * to retry an operation.
 * @param errorMessage The error message to log when the effect still fails
 * after retries have been exhausted.
 * @param until Callback function which dictates whether or not the effect
 * should be retried upon failure. This can return either a `boolean` or an
 * Effect. A common pattern at this point is to prompt the user if he wants to
 * retry.
 */
export const manualRetry =
  (errorMessage: string, until: () => boolean | Effect.Effect<boolean>) =>
  <A, E>(effect: Effect.Effect<A, E>) =>
    pipe(
      effect,
      Effect.retry({ until }),
      Effect.catchAllCause((cause) => Effect.logError(errorMessage, cause)),
      Effect.provide(Logger.structured),
    );

/**
 * Wrapper that takes an effect, handles errors, runs it asyncronously, and
 * wraps the result in a SolidJS resource.
 * @param errorMessage Any errors that occur will be mapped to a generic `Error`
 * instance with this message.
 */
export const loadWrapper =
  (errorMessage: string) =>
  <A, E>(effect: Effect.Effect<A, E>) =>
    pipe(
      effect,
      Effect.tapError(Effect.logError),
      Effect.mapError(() => new Error(errorMessage)),
      Effect.provide(Logger.structured),
      (effect) => createResource(() => Effect.runPromise(effect)),
    );
