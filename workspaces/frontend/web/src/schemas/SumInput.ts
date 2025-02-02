import type { SumInput as SumInputType } from "../gql-client/types/graphql.js";
import { Schema } from "effect";

export const SumInput: Schema.Schema<SumInputType> = Schema.Struct({
  amount: Schema.BigDecimalFromSelf,
  currency: Schema.NonEmptyString,
}).annotations({
  identifier: "SumInput",
  title: "Sum input",
});
