import { EntityName } from "../enums/EntityName.js";
import type { Asset } from "./Asset.js";
import type { File } from "./File.js";
import type {
  ChosenRelations,
  RelationOptions,
  Relations,
} from "./relation.js";
import { TemporalInstantTransformer } from "./transformers.js";
import type { Temporal } from "temporal-polyfill";
import { EntitySchema } from "typeorm";

type DocumentRelations = Relations<{
  asset: Asset<{ images: false; proofOfPurchase: false }>;
  file: File;
}>;

type DocumentRelationOptions = RelationOptions<DocumentRelations>;

export type Document<O extends DocumentRelationOptions> = {
  id: number;
  createdAt: Temporal.Instant;
} & ChosenRelations<DocumentRelations, O>;

export const DocumentEntity = new EntitySchema<
  Document<{ asset: true; file: true }>
>({
  name: EntityName.Document,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
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
      type: "one-to-one",
      target: EntityName.Asset,
      joinColumn: true,
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
});
