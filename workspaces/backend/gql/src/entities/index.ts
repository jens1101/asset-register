import { type Asset, AssetEntity } from "./Asset.js";
import { type Document, DocumentEntity } from "./Document.js";
import { type File, FileEntity } from "./File.js";
import { type Image, ImageEntity } from "./Image.js";
import { type Sum, SumEntity } from "./Sum.js";

export type { Asset, Document, File, Image, Sum };

export { AssetEntity, DocumentEntity, FileEntity, ImageEntity, SumEntity };

// Note: `SumEntity` in only used for embedding and should not be a DB table.
export const entities = [AssetEntity, DocumentEntity, FileEntity, ImageEntity];
