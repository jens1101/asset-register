import { onCleanup } from "solid-js";

export function useObjectUrl(source: Uint8Array, mimeType: string) {
  const objectUrl = URL.createObjectURL(
    new Blob([source.buffer], { type: mimeType }),
  );

  onCleanup(() => {
    URL.revokeObjectURL(objectUrl);
  });

  return objectUrl;
}
