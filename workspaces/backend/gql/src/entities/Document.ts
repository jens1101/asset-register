import { EntityName } from "../enums/Entities.js";
import type { Asset } from "./Asset.js";
import type { File } from "./File.js";
import { EntitySchema } from "typeorm";

export interface Document {
  id: number;
  createdAt: Date;
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
      type: Date,
      createDate: true,
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
