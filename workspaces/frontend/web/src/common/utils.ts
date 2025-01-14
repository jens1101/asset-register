import type { FileFragment } from "../gql-client/types/graphql.js";
import { Equivalence } from "effect";

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
 * The default formatter that should be used to format date-time values for
 * display
 */
export const defaultDateTimeFormatter = new Intl.DateTimeFormat(undefined, {
  timeStyle: "medium",
  dateStyle: "medium",
});
