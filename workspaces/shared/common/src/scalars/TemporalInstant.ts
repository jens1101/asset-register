import { TaggedScalarFromAst, makeScalarSchema } from "./utils.js";
import { Schema } from "effect";
import { Temporal } from "temporal-polyfill";

export const TemporalInstantScalarSchema = makeScalarSchema(
  "TemporalInstant",
  Schema.String,
);
export type TemporalInstantScalar = typeof TemporalInstantScalarSchema.Type;
export const tag: typeof TemporalInstantScalarSchema.Type._tag =
  "TemporalInstant";
export const ScalarFromTemporalInstant = Schema.transform(
  TemporalInstantScalarSchema,
  Schema.instanceOf(Temporal.Instant),
  {
    strict: true,
    decode: (scalar) => Temporal.Instant.from(scalar.value),
    encode: (value) => ({
      _tag: tag,
      value: value.toString(),
    }),
  },
);
export const TemporalInstantFromAst = Schema.compose(
  TaggedScalarFromAst(TemporalInstantScalarSchema, tag),
  ScalarFromTemporalInstant,
);
