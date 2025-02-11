import { ScalarName } from "./ScalarName.js";
import { TaggedScalar } from "./TaggedScalar.js";
import { BigDecimal, Schema } from "effect";

export const bigDecimalScalar = new TaggedScalar<
  ScalarName.BigDecimal,
  BigDecimal.BigDecimal
>({
  name: ScalarName.BigDecimal,
  typeFromStringSchema: Schema.BigDecimal,
});
