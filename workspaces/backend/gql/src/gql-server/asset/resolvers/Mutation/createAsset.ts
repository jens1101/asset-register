import { createAsset as createAssetHelper } from "../../../../helpers/asset.js";
import { runAsyncWrapper } from "../../../../helpers/util.js";
import { withTransaction } from "../../../../scopes/index.js";
import type {
  MutationResolvers,
  ResolversTypes,
} from "./../../../types.generated.js";
import { Effect, pipe } from "effect";

export const createAsset: NonNullable<
  MutationResolvers["createAsset"]
> = async (_parent, { data }, _ctx) =>
  runAsyncWrapper(
    pipe(
      createAssetHelper(data),
      withTransaction,
      Effect.andThen(
        (asset) =>
          ({
            ...asset,
            __typename: "Asset",
          }) as ResolversTypes["AssetResponse"],
      ),
    ),
    "Failed to create asset",
  );
