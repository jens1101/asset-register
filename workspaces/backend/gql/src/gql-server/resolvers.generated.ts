/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
import { Asset } from "./asset/resolvers/Asset.js";
import { AssetError } from "./asset/resolvers/AssetError.js";
import { addAssetImages as Mutation_addAssetImages } from "./asset/resolvers/Mutation/addAssetImages.js";
import { createAsset as Mutation_createAsset } from "./asset/resolvers/Mutation/createAsset.js";
import { deleteAsset as Mutation_deleteAsset } from "./asset/resolvers/Mutation/deleteAsset.js";
import { deleteAssetImages as Mutation_deleteAssetImages } from "./asset/resolvers/Mutation/deleteAssetImages.js";
import { deleteProofOfPurchase as Mutation_deleteProofOfPurchase } from "./asset/resolvers/Mutation/deleteProofOfPurchase.js";
import { replaceProofOfPurchase as Mutation_replaceProofOfPurchase } from "./asset/resolvers/Mutation/replaceProofOfPurchase.js";
import { updateAsset as Mutation_updateAsset } from "./asset/resolvers/Mutation/updateAsset.js";
import { asset as Query_asset } from "./asset/resolvers/Query/asset.js";
import { assets as Query_assets } from "./asset/resolvers/Query/assets.js";
import { TemporalInstant } from "./base/resolvers/TemporalInstant.js";
import { Uint8Array } from "./base/resolvers/Uint8Array.js";
import { Void } from "./base/resolvers/Void.js";
import { Document } from "./document/resolvers/Document.js";
import { File } from "./file/resolvers/File.js";
import { Image } from "./image/resolvers/Image.js";
import { ImageError } from "./image/resolvers/ImageError.js";
import { updateImage as Mutation_updateImage } from "./image/resolvers/Mutation/updateImage.js";
import type { Resolvers } from "./types.generated.js";

export const resolvers: Resolvers = {
  Query: { asset: Query_asset, assets: Query_assets },
  Mutation: {
    addAssetImages: Mutation_addAssetImages,
    createAsset: Mutation_createAsset,
    deleteAsset: Mutation_deleteAsset,
    deleteAssetImages: Mutation_deleteAssetImages,
    deleteProofOfPurchase: Mutation_deleteProofOfPurchase,
    replaceProofOfPurchase: Mutation_replaceProofOfPurchase,
    updateAsset: Mutation_updateAsset,
    updateImage: Mutation_updateImage,
  },

  Asset: Asset,
  AssetError: AssetError,
  Document: Document,
  File: File,
  Image: Image,
  ImageError: ImageError,
  TemporalInstant: TemporalInstant,
  Uint8Array: Uint8Array,
  Void: Void,
};
