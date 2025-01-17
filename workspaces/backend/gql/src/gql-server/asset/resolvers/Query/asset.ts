import { dataSource } from "../../../../dataSource.js";
import { readAsset } from "../../../../helpers/index.js";
import { withTransaction } from "../../../../scopes/index.js";
import {
  DataSourceService,
  EntityManagerService,
} from "../../../../services/index.js";
import type {
  QueryResolvers,
  ResolversTypes,
} from "./../../../types.generated.js";
import { Effect, pipe } from "effect";

export const asset: NonNullable<QueryResolvers["asset"]> = async (
  _parent,
  { id },
  _ctx,
) => {
  const program = pipe(
    readAsset(Number(id), {
      relations: { images: true, proofOfPurchase: true },
    }),
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
        Effect.logError("Failed to read asset", cause),
        Effect.as({
          __typename: "AssetError",
          message: "Failed to read asset",
        } as ResolversTypes["AssetResponse"]),
      ),
    ),
  );

  return Effect.runPromise(program);
};
