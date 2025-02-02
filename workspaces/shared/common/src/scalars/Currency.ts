import { StringScalarFromAst } from "./utils.js";
import { Schema, pipe } from "effect";

export const CurrencyScalarSchema = pipe(
  Schema.NonEmptyString,
  Schema.filter(
    (value) =>
      Intl.supportedValuesOf("currency").includes(value) ||
      `Value is not a valid or supported currency: ${value}`,
  ),
);

export type CurrencyScalar = typeof CurrencyScalarSchema.Type;
export const tag = "Currency";

export const CurrencyFromAst = Schema.compose(
  StringScalarFromAst,
  CurrencyScalarSchema,
);
