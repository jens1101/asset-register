import { ErrorTags } from "../enums/ErrorTags.js";
import type { ErrorInput, ErrorParameters } from "./errorInterfaces.js";
import { Data } from "effect";

export class DeleteFileError extends Data.TaggedError(ErrorTags.DeleteFile)<
  ErrorParameters & ErrorInput
> {}
