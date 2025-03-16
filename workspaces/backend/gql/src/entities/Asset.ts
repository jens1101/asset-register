import { EntityName } from "../enums/EntityName.ts";
import {
  isGreaterThanOrEqualTo,
  isNonEmpty,
  isTrimmed,
  isUpperCase,
} from "../helpers/checks.ts";
import type { Document } from "./Document.ts";
import type { Image } from "./Image.ts";
import { type Sum, SumEntity } from "./Sum.ts";
import { TemporalInstantTransformer } from "./transformers.ts";
import { Temporal } from "temporal-polyfill";
import { EntitySchema } from "typeorm";

export interface Asset {
  id: number;
  name: string;
  description: string | undefined;
  images: Image[];
  value: Sum;
  proofOfPurchase: Document | undefined;
  createdAt: Temporal.Instant;
  updatedAt: Temporal.Instant;
}

export const AssetEntity = new EntitySchema<Asset>({
  name: EntityName.Asset,
  checks: [
    isUpperCase("valueCurrency"),
    isGreaterThanOrEqualTo("valueAmount", "0"),
    isTrimmed("name"),
    isNonEmpty("name"),
  ],
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    name: {
      type: "text",
    },
    description: {
      type: "text",
      nullable: true,
    },
    createdAt: {
      type: "timestamp",
      transformer: TemporalInstantTransformer,
    },
    updatedAt: {
      type: "timestamp",
      transformer: TemporalInstantTransformer,
    },
  },
  embeddeds: {
    value: {
      schema: SumEntity,
      prefix: "value",
    },
  },
  relations: {
    images: {
      type: "one-to-many",
      target: EntityName.Image,
      inverseSide: "asset",
    },
    proofOfPurchase: {
      type: "one-to-one",
      target: EntityName.Document,
      inverseSide: "asset",
    },
  },
});
