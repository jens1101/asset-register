import { ErrorTags } from "../enums/ErrorTags.ts";
import type { ErrorInput, ErrorParameters } from "./errorInterfaces.ts";
import { Data } from "effect";

/**
 * Used when an image was not found in the specified list of images. This is not
 * related to reading from the DB.
 */
export class ImageNotFoundError extends Data.TaggedError(
  ErrorTags.ImageNotFound,
)<ErrorParameters & ErrorInput> {}
