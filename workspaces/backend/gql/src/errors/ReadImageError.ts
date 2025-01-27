import { ErrorTags } from "../enums/ErrorTags.js";
import type { ErrorInput, ErrorParameters } from "./errorInterfaces.js";
import { Data } from "effect";

export class ReadImageError extends Data.TaggedError(ErrorTags.ReadImage)<
  ErrorParameters & ErrorInput
> {}
