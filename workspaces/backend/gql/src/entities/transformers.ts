import type { Maybe } from "@app/common";
import { BigDecimal, Option, pipe } from "effect";
import { Temporal } from "temporal-polyfill";
import type { ValueTransformer } from "typeorm";

export const TemporalInstantTransformer: ValueTransformer = {
  to: (value: Maybe<Temporal.Instant>): string | undefined =>
    value ? value.toString() : undefined,
  from: (value: Maybe<Date>): Temporal.Instant | undefined =>
    value ? Temporal.Instant.fromEpochMilliseconds(value.getTime()) : undefined,
};

export const BigDecimalTransformer: ValueTransformer = {
  to: (value: Maybe<BigDecimal.BigDecimal>): string | undefined =>
    pipe(
      Option.fromNullable(value),
      Option.map(BigDecimal.normalize),
      Option.map(BigDecimal.format),
      Option.getOrUndefined,
    ),
  from: (value: Maybe<string>): BigDecimal.BigDecimal | undefined =>
    pipe(
      Option.fromNullable(value),
      Option.flatMap(BigDecimal.fromString),
      Option.getOrUndefined,
    ),
};
