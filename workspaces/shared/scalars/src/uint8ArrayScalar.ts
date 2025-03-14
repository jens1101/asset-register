import { ScalarName } from "./ScalarName.ts";
import { TaggedScalar } from "./TaggedScalar.ts";
import { Schema } from "effect";

export const uint8ArrayScalar = new TaggedScalar<
  typeof ScalarName.Uint8Array,
  Uint8Array
>({
  name: ScalarName.Uint8Array,
  typeFromStringSchema: Schema.Uint8ArrayFromBase64,
});
