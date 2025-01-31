import { TaggedScalarFromAst, makeScalarSchema } from "./utils.js";
import { Schema } from "effect";

export const BigDecimalScalarSchema = makeScalarSchema(
  "BigDecimal",
  Schema.String,
);
export type BigDecimalScalar = typeof BigDecimalScalarSchema.Type;
export const tag: typeof BigDecimalScalarSchema.Type._tag = "BigDecimal";
export const ScalarFromBigDecimal = Schema.transform(
  BigDecimalScalarSchema,
  Schema.BigDecimal,
  {
    strict: true,
    decode: (scalar) => scalar.value,
    encode: (value) => ({
      _tag: tag,
      value,
    }),
  },
);
export const BigDecimalFromAst = Schema.compose(
  TaggedScalarFromAst(BigDecimalScalarSchema, tag),
  ScalarFromBigDecimal,
);
