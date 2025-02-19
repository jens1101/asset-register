import { EntityName } from "../enums/EntityName.js";
import { isTrimmed } from "../helpers/checks.js";
import type { Asset } from "./Asset.js";
import type { File } from "./File.js";
import {
  BigDecimalTransformer,
  TemporalInstantTransformer,
} from "./transformers.js";
import type { Maybe } from "@app/common";
import { BigDecimal } from "effect";
import type { Temporal } from "temporal-polyfill";
import { EntitySchema } from "typeorm";

export interface Image {
  id: number;
  name: Maybe<string>;
  description: Maybe<string>;
  position: BigDecimal.BigDecimal;
  createdAt: Temporal.Instant;
  updatedAt: Temporal.Instant;
  file: File;
  asset: Asset;
}

export const ImageEntity = new EntitySchema<Image>({
  name: EntityName.Image,
  checks: [isTrimmed("name")],
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
      transformer: BigDecimalTransformer,
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
