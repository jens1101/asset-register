import { ErrorTags } from "../enums/ErrorTags.js";
import type { ErrorInput, ErrorParameters } from "./errorInterfaces.js";
import { Data } from "effect";

export class SaveImageError extends Data.TaggedError(ErrorTags.SaveImage)<
  ErrorParameters & ErrorInput
> {}
