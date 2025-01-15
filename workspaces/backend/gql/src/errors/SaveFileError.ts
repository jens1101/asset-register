import { ErrorTags } from "../enums/ErrorTags.js";
import type { ErrorInput, ErrorParameters } from "./errorInterfaces.js";
import { Data } from "effect";

export class SaveFileError extends Data.TaggedError(ErrorTags.SaveFile)<
  ErrorParameters & ErrorInput
> {}
