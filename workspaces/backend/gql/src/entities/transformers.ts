import { BigDecimal, Option, pipe } from "effect";
import { Temporal } from "temporal-polyfill";
import type { ValueTransformer } from "typeorm";

export const TemporalInstantTransformer: ValueTransformer = {
  to: (value: Temporal.Instant | undefined): string | undefined =>
    value ? value.toString() : undefined,
  from: (value: Date | undefined): Temporal.Instant | undefined =>
    value ? Temporal.Instant.fromEpochMilliseconds(value.getTime()) : undefined,
};

export const BigDecimalTransformer: ValueTransformer = {
  to: (value: BigDecimal.BigDecimal | undefined): string | undefined =>
    pipe(
      Option.fromNullable(value),
      Option.map(BigDecimal.normalize),
      Option.map(BigDecimal.format),
      Option.getOrUndefined,
    ),
  from: (value: string | undefined): BigDecimal.BigDecimal | undefined =>
    pipe(
      Option.fromNullable(value),
      Option.flatMap(BigDecimal.fromString),
      Option.getOrUndefined,
    ),
};
