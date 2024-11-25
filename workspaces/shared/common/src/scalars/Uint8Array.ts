import { TaggedScalarFromAst, makeScalarSchema } from "./utils.js";
import { Schema } from "effect";

export const Uint8ArrayScalarSchema = makeScalarSchema(
  "Uint8Array",
  Schema.String,
);
export type Uint8ArrayScalar = typeof Uint8ArrayScalarSchema.Type;
export const tag: typeof Uint8ArrayScalarSchema.Type._tag = "Uint8Array";
export const ScalarFromUint8Array = Schema.transform(
  Uint8ArrayScalarSchema,
  Schema.Uint8ArrayFromBase64,
  {
    strict: true,
    decode: (scalar) => scalar.value,
    encode: (value) => ({
      _tag: tag,
      value,
    }),
  },
);
export const Uint8ArrayFromAst = Schema.compose(
  TaggedScalarFromAst(Uint8ArrayScalarSchema, tag),
  ScalarFromUint8Array,
);
