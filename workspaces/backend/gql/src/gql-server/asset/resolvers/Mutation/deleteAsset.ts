import { ErrorTags } from "../../../../enums/ErrorTags.js";
import {
  deleteAsset as deleteAssetHelper,
  readAsset,
} from "../../../../helpers/asset.js";
import { resolverWrapper } from "../../../../helpers/util.js";
import { withTransaction } from "../../../../scopes/index.js";
import type {
  MutationResolvers,
  ResolversTypes,
} from "./../../../types.generated.js";
import { Effect, pipe } from "effect";

export const deleteAsset: NonNullable<
  MutationResolvers["deleteAsset"]
> = async (_parent, { id }, _ctx) =>
  resolverWrapper(
    pipe(
      readAsset({ where: { id: Number(id) } }),
      Effect.andThen(deleteAssetHelper),
      Effect.as(null),
      withTransaction,
      Effect.catchTag(ErrorTags.ReadAsset, (error) =>
        pipe(
          Effect.logWarning(error),
          Effect.as({
            __typename: "AssetError",
            message: "Asset not found",
          } as ResolversTypes["AssetError"]),
        ),
      ),
    ),
    "Failed to delete asset",
  );
