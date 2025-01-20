import { EntityName } from "../enums/EntityName.js";
import type { Document } from "./Document.js";
import type { Image } from "./Image.js";
import type {
  ChosenRelations,
  RelationOptions,
  Relations,
} from "./relation.js";
import { TemporalInstantTransformer } from "./transformers.js";
import type { Maybe } from "@app/common";
import { Temporal } from "temporal-polyfill";
import { EntitySchema } from "typeorm";

type AssetRelations = Relations<{
  images: Image<{ file: true}>[];
  proofOfPurchase: Maybe<Document<{ file: true }>>;
}>;

export type AssetRelationOptions = RelationOptions<AssetRelations>;

export type Asset<O extends AssetRelationOptions> = {
  id: number;
  name: string;
  description: Maybe<string>;
  createdAt: Temporal.Instant;
  updatedAt: Temporal.Instant;
} & ChosenRelations<AssetRelations, O>;

export const AssetEntity = new EntitySchema<
  Asset<{ images: true; proofOfPurchase: true }>
>({
  name: EntityName.Asset,
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
