import { Schema } from "effect";

export const Currency = Schema.NonEmptyString.pipe(
  Schema.filter(
    (currency) => Intl.supportedValuesOf("currency").includes(currency),
    {
      identifier: "Currency",
      title: "Currency",
    },
  ),
);
