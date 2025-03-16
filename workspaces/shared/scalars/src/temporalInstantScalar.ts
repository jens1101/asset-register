import { ScalarName } from "./ScalarName.ts";
import { TaggedScalar } from "./TaggedScalar.ts";
import { Schema } from "effect";
import { Temporal } from "temporal-polyfill";

export const temporalInstantScalar = new TaggedScalar<
  typeof ScalarName.TemporalInstant,
  Temporal.Instant
>({
  name: ScalarName.TemporalInstant,
  typeFromStringSchema: Schema.transform(
    Schema.String,
    Schema.instanceOf(Temporal.Instant),
    {
      decode: (from) => Temporal.Instant.from(from),
      encode: (to) => to.toString(),
    },
  ),
});
