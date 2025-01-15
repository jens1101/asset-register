import { type Asset, AssetEntity } from "../entities/index.js";
import { ReadAssetError } from "../errors/ReadAssetError.js";
import { SaveAssetError } from "../errors/SaveAssetError.js";
import type { UpdateAssetInput } from "../gql-server/types.generated.js";
import { EntityManagerService } from "../services/index.js";
import { mutateImages } from "./image.js";
import { mutateProofOfPurchase } from "./proofOfPurchase.js";
import { Array, Effect, Option, pipe } from "effect";
import type { FindOptionsRelations } from "typeorm";

export const readAsset = (
  id: number,
  {
    relations,
  }: {
    relations?: FindOptionsRelations<Asset>;
  } = {},
) =>
  Effect.gen(function* () {
    const manager = yield* EntityManagerService;

    return yield* Effect.tryPromise({
      try: async () =>
        manager.findOneOrFail(AssetEntity, {
          where: {
            id: Number(id),
          },
          ...(relations && { relations }),
          ...(relations?.images && { order: { images: { position: "ASC" } } }),
        }),
      catch: (cause) =>
        new ReadAssetError({
          message: "Unable to read asset",
          options: { cause },
        }),
    });
  });

export const updateAsset = (asset: Asset, input: UpdateAssetInput) =>
  pipe(
    Effect.gen(function* () {
      const manager = yield* EntityManagerService;

      if (input.name != null) asset.name = input.name;
      if (input.description != null) asset.description = input.description;

      return yield* Effect.tryPromise({
        try: async () => await manager.save(AssetEntity, asset),
        catch: (cause) =>
          new SaveAssetError({
            message: "Failed to save document",
            options: { cause, input },
          }),
      });
    }),
    Effect.andThen((asset) =>
      Option.match(Option.fromNullable(input.proofOfPurchase), {
        onSome: (proofOfPurchase) =>
          mutateProofOfPurchase(asset, proofOfPurchase),
        onNone: () => Effect.succeed(asset),
      }),
    ),
    Effect.andThen((asset) =>
      Option.match(
        Option.filter(Option.fromNullable(input.images), Array.isNonEmptyArray),
        {
          onSome: (images) => mutateImages(asset, images),
          onNone: () => Effect.succeed(asset),
        },
      ),
    ),
  );
