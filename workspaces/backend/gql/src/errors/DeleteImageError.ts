import { ErrorTags } from "../enums/ErrorTags.js";
import type { ErrorInput, ErrorParameters } from "./errorInterfaces.js";
import { Data } from "effect";

export class DeleteImageError extends Data.TaggedError(ErrorTags.DeleteImage)<
  ErrorParameters & ErrorInput
> {}
