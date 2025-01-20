import { ErrorTags } from "../enums/ErrorTags.js";
import type { ErrorInput, ErrorParameters } from "./errorInterfaces.js";
import { Data } from "effect";

export class SaveAssetError extends Data.TaggedError(ErrorTags.SaveAsset)<
  ErrorParameters & ErrorInput
> {}
