import type { Maybe } from "../common/types.js";
import { EntityName } from "../enums/Entities.js";
import type { Asset } from "./Asset.js";
import type { File } from "./File.js";
import { Decimal } from "decimal.js";
import { EntitySchema } from "typeorm";

export interface Image {
  id: number;
  name: Maybe<string>;
  description: Maybe<string>;
  position: Decimal;
  createdAt: Date;
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
      transformer: {
        to: (value: Decimal): string => value.toString(),
        from: (value: string): Decimal => new Decimal(value),
      },
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
      type: "many-to-one",
      target: EntityName.Asset,
      joinColumn: true,
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
});
