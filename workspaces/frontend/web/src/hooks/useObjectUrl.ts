import type { FileFragment } from "../gql-client/types/graphql.js";
import { onCleanup } from "solid-js";

/**
 * Convenience hook to manage object URLs. This will automatically revoke the
 * object URL on cleanup.
 * @returns An accessor to the object URL.
 */
export function useObjectUrl(file: FileFragment): string {
  const objectUrl = URL.createObjectURL(
    new Blob([file.buffer], { type: file.mimeType }),
  );

  onCleanup(() => {
    URL.revokeObjectURL(objectUrl);
  });

  return objectUrl;
}
