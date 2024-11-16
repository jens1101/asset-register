import { EntityName, FileTableTypes } from "../enums/Entities.js";
import { type File, FileEntity } from "./File.js";
import { EntitySchema } from "typeorm";

export interface Document extends File {}

export const DocumentEntity = new EntitySchema<Document>({
  name: EntityName.Document,
  discriminatorValue: FileTableTypes.Document,
  columns: {
    ...FileEntity.options.columns,
  },
});
