import { EntityName } from "../enums/Entities.js";
import type { Document } from "./Document.js";
import type { Image } from "./Image.js";
import { EntitySchema } from "typeorm";

export interface Asset {
  id: number;
  name: string | null;
  description: string | null;
  filename: string;
  images: Image[];
  proofOfPurchase: Document | null;
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
      type: String,
      nullable: true,
    },
    description: {
      type: "text",
      nullable: true,
    },
  },
  relations: {
    images: {
      type: "one-to-many",
      target: EntityName.Image,
    },
    proofOfPurchase: {
      type: "one-to-one",
      target: EntityName.Document,
    },
  },
});
