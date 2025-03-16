import { type Asset, AssetEntity } from "./Asset.ts";
import { type Document, DocumentEntity } from "./Document.ts";
import { type File, FileEntity } from "./File.ts";
import { type Image, ImageEntity } from "./Image.ts";
import { type Sum, SumEntity } from "./Sum.ts";

export type { Asset, Document, File, Image, Sum };

export { AssetEntity, DocumentEntity, FileEntity, ImageEntity, SumEntity };

// Note: `SumEntity` in only used for embedding and should not be a DB table.
export const entities = [AssetEntity, DocumentEntity, FileEntity, ImageEntity];
