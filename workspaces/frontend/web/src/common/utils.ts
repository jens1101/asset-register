/** Tests if the specified file is an image by checking the mime type. */
export function isImage(file: File): boolean {
  return file.type.startsWith("image/");
}

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
