import { ErrorTags } from "../enums/ErrorTags.js";
import type { ErrorInput, ErrorParameters } from "./errorInterfaces.js";
import { Data } from "effect";

export class ImageNotFoundError extends Data.TaggedError(
  ErrorTags.ImageNotFound,
)<ErrorParameters & ErrorInput> {}
