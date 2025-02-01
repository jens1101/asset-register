import { EntityName } from "../enums/EntityName.js";
import type { Document } from "./Document.js";
import type { Image } from "./Image.js";
import { type Sum, SumEntity } from "./Sum.js";
import { TemporalInstantTransformer } from "./transformers.js";
import type { Maybe } from "@app/common";
import { Temporal } from "temporal-polyfill";
import { EntitySchema } from "typeorm";

export interface Asset {
  id: number;
  name: string;
  description: Maybe<string>;
  images: Image[];
  value: Sum;
  proofOfPurchase: Maybe<Document>;
  createdAt: Temporal.Instant;
  updatedAt: Temporal.Instant;
}

export const AssetEntity = new EntitySchema<Asset>({
  name: EntityName.Asset,
  checks: [
    { expression: 'upper("valueCurrency") = "valueCurrency"' },
    { expression: '"valueAmount" >= 0' },
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
      createDate: true,
      transformer: TemporalInstantTransformer,
    },
    updatedAt: {
      type: "timestamp",
      updateDate: true,
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
