import { ScalarName } from "./ScalarName.js";
import { TaggedScalar } from "./TaggedScalar.js";
import { Schema } from "effect";

export const uint8ArrayScalar = new TaggedScalar<
  ScalarName.Uint8Array,
  Uint8Array
>({
  name: ScalarName.Uint8Array,
  typeFromStringSchema: Schema.Uint8ArrayFromBase64,
});
