import { type Asset, AssetEntity } from "../entities/index.js";
import { ReadAssetError } from "../errors/ReadAssetError.js";
import { SaveAssetError } from "../errors/SaveAssetError.js";
import type {
  CreateAssetInput,
  UpdateAssetInput,
} from "../gql-server/types.generated.js";
import { EntityManagerService } from "../services/index.js";
import { createImage, mutateImages } from "./image.js";
import {
  mutateProofOfPurchase,
  updateProofOfPurchase,
} from "./proofOfPurchase.js";
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

const saveAsset = (input: Partial<Asset>) =>
  Effect.gen(function* () {
    const manager = yield* EntityManagerService;

    return yield* Effect.tryPromise({
      try: async () => (await manager.save(AssetEntity, input)) as Asset,
      catch: (cause) =>
        new SaveAssetError({
          message: "Failed to save asset",
          options: { cause, input },
        }),
    });
  });

export const createAsset = (input: CreateAssetInput) =>
  pipe(
    saveAsset({
      name: input.name,
      description: input.description,
    }),
    Effect.andThen((asset) =>
      Option.match(Option.fromNullable(input.proofOfPurchase), {
        onSome: (proofOfPurchase) =>
          updateProofOfPurchase(asset, proofOfPurchase),
        onNone: () => Effect.succeed(asset),
      }),
    ),
    Effect.andThen((asset) =>
      Option.match(
        Option.filter(Option.fromNullable(input.images), Array.isNonEmptyArray),
        {
          onSome: (images) =>
            Effect.reduce(Array.reverse(images), asset, (asset, image) =>
              createImage(asset, image),
            ),
          onNone: () => Effect.succeed(asset),
        },
      ),
    ),
  );

export const updateAsset = (asset: Asset, input: UpdateAssetInput) =>
  pipe(
    Effect.gen(function* () {
      if (input.name != null) asset.name = input.name;
      if (input.description != null) asset.description = input.description;

      return yield* saveAsset(asset);
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
