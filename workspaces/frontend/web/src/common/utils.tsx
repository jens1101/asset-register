import type { FileFragment, SumFragment } from "../gql-client/types/graphql.js";
import { numberFormatterCache } from "./intl.js";
import { BigDecimal, Equivalence } from "effect";
import { For } from "solid-js";

/** Tests if the specified file is an image by checking the mime type. */
export function isImage(file: File): boolean {
  return file.type.startsWith("image/");
}

/**
 * Equivalence to test if two files are equal.
 */
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

/** Helper function to format a sum as JSX */
export function formatSum(sum: SumFragment) {
  const parts = numberFormatterCache
    .get({
      style: "currency",
      currency: sum.currency,
    })
    .formatToParts(BigDecimal.format(sum.amount) as Intl.StringNumericLiteral)
    .map((part) =>
      part.type === "currency" ? <b>{part.value}</b> : part.value,
    );

  return <For each={parts}>{(part) => part}</For>;
}
