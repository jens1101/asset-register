import { dataSource } from "../../../../dataSource.js";
import {
  readAsset,
  updateAsset as updateAssetHelper,
} from "../../../../helpers/index.js";
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

export const updateAsset: NonNullable<
  MutationResolvers["updateAsset"]
> = async (_parent, { data }, _ctx) => {
  const program = pipe(
    readAsset(Number(data.id), {
      relations: { images: true, proofOfPurchase: true },
    }),
    Effect.andThen((asset) => updateAssetHelper(asset, data)),
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
        Effect.logError("Failed to update asset", cause),
        Effect.as({
          __typename: "AssetError",
          message: "Failed to update asset",
        } as ResolversTypes["AssetResponse"]),
      ),
    ),
  );

  return Effect.runPromise(program);
};
