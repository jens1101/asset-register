/** Tests if the specified file is an image by checking the mime type. */
export function isImage(file: File): boolean {
  return file.type.startsWith("image/");
}
