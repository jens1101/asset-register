import { ErrorTags } from "../enums/ErrorTags.js";
import type { ErrorInput, ErrorParameters } from "./errorInterfaces.js";
import { Data } from "effect";

export class SaveDocumentError extends Data.TaggedError(ErrorTags.SaveDocument)<
  ErrorParameters & ErrorInput
> {}
