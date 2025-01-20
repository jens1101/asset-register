import { dataSource } from "../../../../dataSource.js";
import { readAssets } from "../../../../helpers/index.js";
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

export const assets: NonNullable<QueryResolvers["assets"]> = async (
  _parent,
  _arg,
  _ctx,
) => {
  const program = pipe(
    readAssets({ relations: { images: true, proofOfPurchase: true } }),
    Effect.provideServiceEffect(EntityManagerService, withTransaction),
    Effect.provideService(DataSourceService, dataSource),
    Effect.scoped,
    Effect.andThen(
      (value) =>
        ({
          __typename: "Assets",
          value,
        }) as ResolversTypes["AssetsResponse"],
    ),
    Effect.catchAllCause((cause) =>
      pipe(
        Effect.logError("Failed to read asset", cause),
        Effect.as({
          __typename: "AssetError",
          message: "Failed to read asset",
        } as ResolversTypes["AssetsResponse"]),
      ),
    ),
  );

  return Effect.runPromise(program);
};
