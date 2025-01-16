import { ErrorTags } from "../enums/ErrorTags.js";
import type { ErrorInput, ErrorParameters } from "./errorInterfaces.js";
import { Data } from "effect";

export class DeleteAssetError extends Data.TaggedError(ErrorTags.DeleteAsset)<
  ErrorParameters & ErrorInput
> {}
