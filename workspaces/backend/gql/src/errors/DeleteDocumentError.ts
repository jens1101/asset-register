import { ErrorTags } from "../enums/ErrorTags.js";
import type { ErrorInput, ErrorParameters } from "./errorInterfaces.js";
import { Data } from "effect";

export class DeleteDocumentError extends Data.TaggedError(
  ErrorTags.DeleteDocument,
)<ErrorParameters & ErrorInput> {}
