import { EntityName } from "../enums/EntityName.js";
import { BigDecimalTransformer } from "./transformers.js";
import type { BigDecimal } from "effect";
import { EntitySchema } from "typeorm";

export interface Sum {
  currency: string;
  amount: BigDecimal.BigDecimal;
}

/**
 * Entity representing a sum (currency + amount).
 *
 * _Note_ that this entity is intended for being embedded and does not occupy a
 * DB table.
 */
export const SumEntity = new EntitySchema<Sum>({
  name: EntityName.Sum,
  columns: {
    currency: {
      type: "char",
      length: 3,
    },
    amount: {
      type: "numeric",
      transformer: BigDecimalTransformer,
    },
  },
});
