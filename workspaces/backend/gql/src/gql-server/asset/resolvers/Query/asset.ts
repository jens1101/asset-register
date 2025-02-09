import { ErrorTags } from "../../../../enums/ErrorTags.js";
import { readAsset } from "../../../../helpers/asset.js";
import { runAsyncWrapper } from "../../../../helpers/util.js";
import { withTransaction } from "../../../../scopes/index.js";
import type {
  QueryResolvers,
  ResolversTypes,
} from "./../../../types.generated.js";
import { Effect, pipe } from "effect";

export const asset: NonNullable<QueryResolvers["asset"]> = async (
  _parent,
  { id },
  _ctx,
) =>
  runAsyncWrapper(
    pipe(
      readAsset({ where: { id: Number(id) } }),
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
    ),
    "Failed to read asset",
  );
