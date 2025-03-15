/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
import { Asset } from "./asset/resolvers/Asset.ts";
import { createAsset as Mutation_createAsset } from "./asset/resolvers/Mutation/createAsset.ts";
import { deleteAsset as Mutation_deleteAsset } from "./asset/resolvers/Mutation/deleteAsset.ts";
import { updateAsset as Mutation_updateAsset } from "./asset/resolvers/Mutation/updateAsset.ts";
import { asset as Query_asset } from "./asset/resolvers/Query/asset.ts";
import { assets as Query_assets } from "./asset/resolvers/Query/assets.ts";
import { ReadAssetError } from "./asset/resolvers/ReadAssetError.ts";
import { BigDecimal } from "./base/resolvers/BigDecimal.ts";
import { Currency } from "./base/resolvers/Currency.ts";
import { NonEmptyTrimmedString } from "./base/resolvers/NonEmptyTrimmedString.ts";
import { TemporalInstant } from "./base/resolvers/TemporalInstant.ts";
import { TrimmedString } from "./base/resolvers/TrimmedString.ts";
import { Uint8Array } from "./base/resolvers/Uint8Array.ts";
import { DeleteDocumentError } from "./document/resolvers/DeleteDocumentError.ts";
import { Document } from "./document/resolvers/Document.ts";
import { File } from "./file/resolvers/File.ts";
import { Image } from "./image/resolvers/Image.ts";
import { ImageNotFoundError } from "./image/resolvers/ImageNotFoundError.ts";
import { Sum } from "./sum/resolvers/Sum.ts";
import type { Resolvers } from "./types.generated.ts";

export const resolvers: Resolvers = {
  Query: { asset: Query_asset, assets: Query_assets },
  Mutation: {
    createAsset: Mutation_createAsset,
    deleteAsset: Mutation_deleteAsset,
    updateAsset: Mutation_updateAsset,
  },

  Asset: Asset,
  DeleteDocumentError: DeleteDocumentError,
  Document: Document,
  File: File,
  Image: Image,
  ImageNotFoundError: ImageNotFoundError,
  ReadAssetError: ReadAssetError,
  Sum: Sum,
  BigDecimal: BigDecimal,
  Currency: Currency,
  NonEmptyTrimmedString: NonEmptyTrimmedString,
  TemporalInstant: TemporalInstant,
  TrimmedString: TrimmedString,
  Uint8Array: Uint8Array,
};
