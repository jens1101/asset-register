import { ScalarName } from "./ScalarName.ts";
import { TaggedScalar } from "./TaggedScalar.ts";
import { BigDecimal, Schema } from "effect";

export const bigDecimalScalar = new TaggedScalar<
  typeof ScalarName.BigDecimal,
  BigDecimal.BigDecimal
>({
  name: ScalarName.BigDecimal,
  typeFromStringSchema: Schema.BigDecimal,
});
