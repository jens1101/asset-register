import { EntityName } from "../enums/Entities.js";
import { EntitySchema } from "typeorm";

export interface File {
  id: number;
  file: Buffer;
  filename: string;
  mimeType: string;
  createdAt: Date;
}

export const FileEntity = new EntitySchema<File>({
  name: EntityName.File,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    file: {
      type: "bytea",
    },
    filename: {
      type: "text",
    },
    mimeType: {
      type: "text",
    },
    createdAt: {
      type: Date,
      createDate: true,
    },
  },
});
