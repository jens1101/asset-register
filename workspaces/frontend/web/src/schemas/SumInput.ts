import type { SumInput as SumInputType } from "../gql-client/types/graphql.js";
import { Currency } from "./Currency.js";
import { BigDecimal, Effect, ParseResult, Schema, pipe } from "effect";

export const SumInput: Schema.Schema<SumInputType> = Schema.Struct({
  amount: Schema.BigDecimalFromSelf,
  currency: Currency,
}).annotations({
  identifier: "SumInput",
  title: "Sum input",
});

export const SumInputFromFormValues = Schema.transformOrFail(
  Schema.Struct({
    amount: Schema.String,
    currency: Schema.String,
  }),
  SumInput,
  {
    strict: true,
    decode: (from, _options, ast) =>
      pipe(
        Schema.decode(Schema.BigDecimal)(from.amount),
        Effect.map((amount) => ({
          currency: from.currency,
          amount,
        })),
        Effect.mapError(
          (error) =>
            new ParseResult.Type(
              ast,
              from,
              `Failed to decode sum with error: ${error.message}`,
            ),
        ),
      ),
    encode: (to, _options) =>
      Effect.succeed({
        currency: to.currency,
        amount: BigDecimal.format(BigDecimal.normalize(to.amount)),
      }),
  },
);
