import type { Maybe } from "@app/common";
import { Decimal } from "decimal.js";
import { Temporal } from "temporal-polyfill";
import type { ValueTransformer } from "typeorm";

export const TemporalInstantTransformer: ValueTransformer = {
  to: (value: Maybe<Temporal.Instant>): string | undefined =>
    value ? value.toString() : undefined,
  from: (value: Maybe<Date>): Temporal.Instant | undefined =>
    value ? Temporal.Instant.fromEpochMilliseconds(value.getTime()) : undefined,
};

export const DecimalTransformer: ValueTransformer = {
  to: (value: Maybe<Decimal>): string | undefined =>
    value ? value.toString() : undefined,
  from: (value: Maybe<string>): Decimal | undefined =>
    value ? new Decimal(value) : undefined,
};
