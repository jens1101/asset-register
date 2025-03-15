import { EntityName } from "../enums/EntityName.ts";
import type { Asset } from "./Asset.ts";
import type { File } from "./File.ts";
import { TemporalInstantTransformer } from "./transformers.ts";
import type { Temporal } from "temporal-polyfill";
import { EntitySchema } from "typeorm";

export interface Document {
  id: number;
  createdAt: Temporal.Instant;
  file: File;
  asset: Asset;
}

export const DocumentEntity = new EntitySchema<Document>({
  name: EntityName.Document,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    createdAt: {
      type: "timestamp",
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
      type: "one-to-one",
      target: EntityName.Asset,
      joinColumn: true,
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
});
