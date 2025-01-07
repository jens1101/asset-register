import { EntityName } from "../enums/entity.js";
import { TemporalInstantTransformer } from "./transformers.js";
import type { Temporal } from "temporal-polyfill";
import { EntitySchema } from "typeorm";

export interface File {
  id: number;
  buffer: Uint8Array;
  filename: string;
  mimeType: string;
  createdAt: Temporal.Instant;
}

export const FileEntity = new EntitySchema<File>({
  name: EntityName.File,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    buffer: {
      type: "bytea",
    },
    filename: {
      type: "text",
    },
    mimeType: {
      type: "text",
    },
    createdAt: {
      type: "timestamp",
      createDate: true,
      transformer: TemporalInstantTransformer,
    },
  },
});
