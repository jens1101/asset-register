import type { FileFragment } from "../gql-client/graphql.generated.ts";
import { onCleanup } from "solid-js";

/**
 * Convenience hook to manage object URLs. This will automatically revoke the
 * object URL on cleanup.
 * @returns An accessor to the object URL.
 */
export function useObjectUrl(source: FileFragment | Blob): string {
  const objectUrl = URL.createObjectURL(
    source instanceof Blob
      ? source
      : new Blob([source.buffer], { type: source.mimeType }),
  );

  onCleanup(() => {
    URL.revokeObjectURL(objectUrl);
  });

  return objectUrl;
}
