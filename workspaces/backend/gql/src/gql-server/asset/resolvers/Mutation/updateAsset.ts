import { dataSource } from "../../../../dataSource.js";
import { AssetEntity } from "../../../../entities/index.js";
import {
  getAsset,
  mutateImages,
  mutateProofOfPurchase,
} from "../../../../helpers/index.js";
import { withTransaction } from "../../../../scopes/index.js";
import {
  DataSourceService,
  EntityManagerService,
} from "../../../../services/index.js";
import type { MutationResolvers } from "./../../../types.generated.js";
import { Cause, Effect, Exit, pipe } from "effect";

export const updateAsset: NonNullable<
  MutationResolvers["updateAsset"]
> = async (
  _parent,
  { data: { id, name, description, proofOfPurchase, images } },
  _ctx,
) => {
  const program = Effect.scoped(
    pipe(
      Effect.gen(function* () {
        const manager = yield* EntityManagerService;
        const asset = yield* getAsset(Number(id), {
          relations: { images: true, proofOfPurchase: true },
        });

        if (name != null) asset.name = name;
        if (description != null) asset.description = description;

        return yield* Effect.promise(() => manager.save(AssetEntity, asset));
      }),
      Effect.flatMap((asset) =>
        Effect.gen(function* () {
          if (!proofOfPurchase) return asset;

          return yield* mutateProofOfPurchase(asset, proofOfPurchase);
        }),
      ),
      Effect.flatMap((asset) =>
        Effect.gen(function* () {
          if (!images || images.length <= 0) return asset;

          return yield* mutateImages(asset, images);
        }),
      ),
      Effect.provideServiceEffect(EntityManagerService, withTransaction),
      Effect.provideService(DataSourceService, dataSource),
    ),
  );

  return Exit.match(await Effect.runPromiseExit(program), {
    onSuccess(asset) {
      return {
        ...asset,
        __typename: "Asset",
      };
    },
    onFailure(cause) {
      return {
        __typename: "AssetError",
        message: Cause.pretty(cause),
      };
    },
  });
};
