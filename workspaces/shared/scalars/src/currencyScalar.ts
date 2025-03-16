import { ScalarName } from "./ScalarName.ts";
import { StringScalar } from "./StringScalar.ts";
import { Schema } from "effect";

export const currencyScalar = new StringScalar({
  name: ScalarName.Currency,
  schema: Schema.NonEmptyString.pipe(
    Schema.filter(
      (value) =>
        Intl.supportedValuesOf("currency").includes(value) ||
        `Value is not a valid or supported currency: ${value}`,
    ),
  ),
});
