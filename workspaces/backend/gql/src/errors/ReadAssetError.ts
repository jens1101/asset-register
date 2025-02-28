import { ErrorTags } from "../enums/ErrorTags.js";
import type { ErrorInput, ErrorParameters } from "./errorInterfaces.js";
import { Data } from "effect";

/** Used when the specified asset could not be found in the database */
export class ReadAssetError extends Data.TaggedError(ErrorTags.ReadAsset)<
  ErrorParameters & ErrorInput
> {}
