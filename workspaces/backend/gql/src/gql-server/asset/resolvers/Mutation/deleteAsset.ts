import { dataSource } from "../../../../dataSource.js";
import {
  deleteAsset as deleteAssetHelper,
  readAsset,
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

export const deleteAsset: NonNullable<
  MutationResolvers["deleteAsset"]
> = async (_parent, data, _ctx) => {
  const program = pipe(
    readAsset(Number(data.id)),
    Effect.andThen((asset) => deleteAssetHelper(asset)),
    Effect.provideServiceEffect(EntityManagerService, withTransaction),
    Effect.provideService(DataSourceService, dataSource),
    Effect.scoped,
    Effect.as(null),
    Effect.catchAllCause((cause) =>
      pipe(
        Effect.logError("Failed to update asset", cause),
        Effect.as({
          __typename: "AssetError",
          message: "Failed to update asset",
        } as ResolversTypes["AssetError"]),
      ),
    ),
  );

  return Effect.runPromise(program);
};
