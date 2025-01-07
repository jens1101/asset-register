import { type Asset, AssetEntity } from "../entities/index.js";
import { EntityManagerService } from "../services/index.js";
import { Effect } from "effect";
import type { FindOptionsOrder, FindOptionsRelations } from "typeorm";

export const getAsset = (
  id: number,
  {
    relations,
  }: {
    relations?: FindOptionsRelations<Asset>;
  } = {},
): Effect.Effect<Asset, Error, EntityManagerService> =>
  Effect.gen(function* () {
    const order: FindOptionsOrder<Asset> = {
      ...(relations?.images && { images: { position: "ASC" } }),
    };

    const manager = yield* EntityManagerService;

    return yield* Effect.tryPromise({
      try: async () =>
        manager.findOneOrFail(AssetEntity, {
          where: {
            id: Number(id),
          },
          ...(relations && { relations }),
          order,
        }),
      catch: (error) => new Error(String(error)),
    });
  });
