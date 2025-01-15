import { ErrorTags } from "../enums/ErrorTags.js";
import type { ErrorInput, ErrorParameters } from "./errorInterfaces.js";
import { Data } from "effect";

export class ReadAssetError extends Data.TaggedError(ErrorTags.ReadAsset)<
  ErrorParameters & ErrorInput
> {}
