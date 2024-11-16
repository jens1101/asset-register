import { EntityName, FileTableTypes } from "../enums/Entities.js";
import { type File, FileEntity } from "./File.js";
import { EntitySchema } from "typeorm";

export interface Image extends File {
  name?: string;
  description?: string;
}

export const ImageEntity = new EntitySchema<Image>({
  name: EntityName.Image,
  discriminatorValue: FileTableTypes.Image,
  columns: {
    ...FileEntity.options.columns,
    name: {
      type: "text",
      nullable: true,
    },
    description: {
      type: "text",
      nullable: true,
    },
  },
});
