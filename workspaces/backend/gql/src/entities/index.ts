import { type Asset, AssetEntity } from "./Asset.js";
import { type Document, DocumentEntity } from "./Document.js";
import { type File, FileEntity } from "./File.js";
import { type Image, ImageEntity } from "./Image.js";

export type { Asset, Document, File, Image };

export { AssetEntity, DocumentEntity, FileEntity, ImageEntity };

export const entities = [AssetEntity, DocumentEntity, FileEntity, ImageEntity];
