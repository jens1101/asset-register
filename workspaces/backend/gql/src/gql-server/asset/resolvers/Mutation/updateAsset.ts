import { ErrorTags } from "../../../../enums/ErrorTags.js";
import {
  readAsset,
  updateAsset as updateAssetHelper,
} from "../../../../helpers/asset.js";
import { resolverWrapper } from "../../../../helpers/util.js";
import { withTransaction } from "../../../../scopes/index.js";
import type {
  MutationResolvers,
  ResolversTypes,
} from "./../../../types.generated.js";
import { Effect, pipe } from "effect";

export const updateAsset: NonNullable<
  MutationResolvers["updateAsset"]
> = async (_parent, { data }, _ctx) =>
  resolverWrapper(
    pipe(
      readAsset({
        where: { id: Number(data.id) },
        relations: { images: true, proofOfPurchase: true },
      }),
      Effect.andThen((asset) => updateAssetHelper(asset, data)),
      withTransaction,
      Effect.andThen(
        (asset) =>
          ({
            ...asset,
            __typename: "Asset",
          }) as ResolversTypes["AssetResponse"],
      ),
      Effect.catchTag(ErrorTags.ReadAsset, (error) =>
        pipe(
          Effect.logWarning(error),
          Effect.as({
            __typename: "AssetError",
            message: "Asset not found",
          } as ResolversTypes["AssetResponse"]),
        ),
      ),
      Effect.catchTag(ErrorTags.DeleteDocument, (error) =>
        pipe(
          Effect.logWarning(error),
          Effect.as({
            __typename: "AssetError",
            message: "Proof of purchase document not found in asset",
          } as ResolversTypes["AssetResponse"]),
        ),
      ),
      Effect.catchTag(ErrorTags.ImageNotFound, (error) =>
        pipe(
          Effect.logWarning(error),
          Effect.as({
            __typename: "AssetError",
            message: "Image(s) not found in asset",
          } as ResolversTypes["AssetResponse"]),
        ),
      ),
    ),
    "Failed to update asset",
  );
