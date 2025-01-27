import { ErrorTags } from "../enums/ErrorTags.js";
import type { ErrorInput, ErrorParameters } from "./errorInterfaces.js";
import { Data } from "effect";

export class ReadDocumentError extends Data.TaggedError(ErrorTags.ReadDocument)<
  ErrorParameters & ErrorInput
> {}
