import { TaggedScalarFromAst, makeScalarSchema } from "./utils.js";
import { Schema, pipe } from "effect";

export const CurrencyScalarSchema = makeScalarSchema(
  "Currency",
  pipe(
    Schema.NonEmptyString,
    Schema.filter(
      (value) =>
        Intl.supportedValuesOf("currency").includes(value) ||
        `Value is not a valid or supported currency: ${value}`,
    ),
  ),
);
export type CurrencyScalar = typeof CurrencyScalarSchema.Type;
export const tag: typeof CurrencyScalarSchema.Type._tag = "Currency";
export const ScalarFromCurrency = Schema.transform(
  CurrencyScalarSchema,
  Schema.String,
  {
    strict: true,
    decode: (scalar) => scalar.value,
    encode: (value) => ({
      _tag: tag,
      value,
    }),
  },
);
export const CurrencyFromAst = Schema.compose(
  TaggedScalarFromAst(CurrencyScalarSchema, tag),
  ScalarFromCurrency,
);
