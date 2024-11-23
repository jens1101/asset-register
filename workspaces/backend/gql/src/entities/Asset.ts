import { EntityName } from "../enums/Entities.js";
import type { Document } from "./Document.js";
import type { Image } from "./Image.js";
import type { Maybe } from "@app/common";
import { EntitySchema } from "typeorm";

export interface Asset {
  id: number;
  name: string;
  description: Maybe<string>;
  images: Image[];
  proofOfPurchase: Maybe<Document>;
  createdAt: Date;
  updatedAt: Date;
}

export const AssetEntity = new EntitySchema<Asset>({
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
      type: Date,
      createDate: true,
    },
    updatedAt: {
      type: Date,
      updateDate: true,
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
