/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
import { Asset } from "./asset/resolvers/Asset.js";
import { AssetError } from "./asset/resolvers/AssetError.js";
import { createAsset as Mutation_createAsset } from "./asset/resolvers/Mutation/createAsset.js";
import { deleteAsset as Mutation_deleteAsset } from "./asset/resolvers/Mutation/deleteAsset.js";
import { updateAsset as Mutation_updateAsset } from "./asset/resolvers/Mutation/updateAsset.js";
import { asset as Query_asset } from "./asset/resolvers/Query/asset.js";
import { assets as Query_assets } from "./asset/resolvers/Query/assets.js";
import { Document } from "./document/resolvers/Document.js";
import { File } from "./file/resolvers/File.js";
import { Image } from "./image/resolvers/Image.js";
import type { Resolvers } from "./types.generated.js";
import { ByteResolver, DateTimeResolver, VoidResolver } from "graphql-scalars";

export const resolvers: Resolvers = {
  Query: { asset: Query_asset, assets: Query_assets },
  Mutation: {
    createAsset: Mutation_createAsset,
    deleteAsset: Mutation_deleteAsset,
    updateAsset: Mutation_updateAsset,
  },

  Asset: Asset,
  AssetError: AssetError,
  Document: Document,
  File: File,
  Image: Image,
  Byte: ByteResolver,
  DateTime: DateTimeResolver,
  Void: VoidResolver,
};
