import { ErrorTags } from "../enums/ErrorTags.js";
import type { ErrorInput, ErrorParameters } from "./errorInterfaces.js";
import { Data } from "effect";

/**
 * Used when attempting to delete a document from an asset which doesn't own the
 * document.
 */
export class DeleteDocumentError extends Data.TaggedError(
  ErrorTags.DeleteDocument,
)<ErrorParameters & ErrorInput> {}
