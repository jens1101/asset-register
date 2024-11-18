/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
import { Asset } from "./asset/resolvers/Asset.js";
import { AssetError } from "./asset/resolvers/AssetError.js";
import { createAsset as Mutation_createAsset } from "./asset/resolvers/Mutation/createAsset.js";
import { asset as Query_asset } from "./asset/resolvers/Query/asset.js";
import { assets as Query_assets } from "./asset/resolvers/Query/assets.js";
import { Document } from "./document/resolvers/Document.js";
import { File } from "./file/resolvers/File.js";
import { Image } from "./image/resolvers/Image.js";
import type { Resolvers } from "./types.generated.js";
import { ByteResolver, DateTimeResolver } from "graphql-scalars";

export const resolvers: Resolvers = {
  Query: { asset: Query_asset, assets: Query_assets },
  Mutation: { createAsset: Mutation_createAsset },

  Asset: Asset,
  AssetError: AssetError,
  Document: Document,
  File: File,
  Image: Image,
  Byte: ByteResolver,
  DateTime: DateTimeResolver,
};
