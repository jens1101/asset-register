import { dataSource } from "../../../../dataSource.js";
import { createAsset as createAssetHelper } from "../../../../helpers/asset.js";
import { withTransaction } from "../../../../scopes/index.js";
import {
  DataSourceService,
  EntityManagerService,
} from "../../../../services/index.js";
import type {
  MutationResolvers,
  ResolversTypes,
} from "./../../../types.generated.js";
import { Effect, pipe } from "effect";

export const createAsset: NonNullable<
  MutationResolvers["createAsset"]
> = async (_parent, { data }, _ctx) => {
  const program = pipe(
    createAssetHelper(data),
    Effect.provideServiceEffect(EntityManagerService, withTransaction),
    Effect.provideService(DataSourceService, dataSource),
    Effect.scoped,
    Effect.andThen(
      (asset) =>
        ({
          ...asset,
          __typename: "Asset",
        }) as ResolversTypes["AssetResponse"],
    ),
    Effect.catchAllCause((cause) =>
      pipe(
        Effect.logError("Failed to create asset", cause),
        Effect.as({
          __typename: "AssetError",
          message: "Failed to create asset",
        } as ResolversTypes["AssetResponse"]),
      ),
    ),
  );

  return Effect.runPromise(program);
};
