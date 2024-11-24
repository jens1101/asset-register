import { EntityName } from "../enums/Entities.js";
import type { Asset } from "./Asset.js";
import type { File } from "./File.js";
import {
  DecimalTransformer,
  TemporalInstantTransformer,
} from "./transformers.js";
import type { Maybe } from "@app/common";
import { Decimal } from "decimal.js";
import type { Temporal } from "temporal-polyfill";
import { EntitySchema } from "typeorm";

// TODO: add updated at
export interface Image {
  id: number;
  name: Maybe<string>;
  description: Maybe<string>;
  position: Decimal;
  createdAt: Temporal.Instant;
  file: File;
  asset: Asset;
}

export const ImageEntity = new EntitySchema<Image>({
  name: EntityName.Image,
  orderBy: {
    asset: "ASC",
    position: "ASC",
  },
  indices: [
    {
      columns: ["asset", "position"],
      unique: true,
    },
  ],
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    name: {
      type: "text",
      nullable: true,
    },
    description: {
      type: "text",
      nullable: true,
    },
    position: {
      type: "numeric",
      transformer: DecimalTransformer,
    },
    createdAt: {
      type: "timestamp",
      createDate: true,
      transformer: TemporalInstantTransformer,
    },
  },
  relations: {
    file: {
      type: "one-to-one",
      target: EntityName.File,
      eager: true,
      joinColumn: true,
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    },
    asset: {
      type: "many-to-one",
      target: EntityName.Asset,
      joinColumn: true,
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
});
