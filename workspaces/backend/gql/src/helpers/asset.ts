import { type Asset, AssetEntity } from "../entities/index.ts";
import { ReadAssetError } from "../errors/ReadAssetError.ts";
import type {
  CreateAssetInput,
  UpdateAssetInput,
} from "../gql-server/types.generated.ts";
import { createImage, mutateImages } from "./image.ts";
import {
  mutateProofOfPurchase,
  updateProofOfPurchase,
} from "./proofOfPurchase.ts";
import { entityManagerWapper, findOneOrFailWrapper } from "./util.ts";
import { Array, Effect, Option, pipe } from "effect";
import { Temporal } from "temporal-polyfill";
import { type FindOptionsRelations, type FindOptionsWhere } from "typeorm";

export const readAsset = ({
  where,
  relations,
}: {
  where: FindOptionsWhere<Asset>;
  relations?: FindOptionsRelations<Asset>;
}) =>
  findOneOrFailWrapper({
    evaluate: (manager) =>
      manager.findOneOrFail(AssetEntity, {
        where,
        ...(relations && { relations }),
        ...(relations?.images && {
          order: { images: { position: "ASC" } },
        }),
      }),
    onError: (cause) =>
      new ReadAssetError({
        message: "Unable to read asset",
        options: { cause },
      }),
  });

export const readAssets = ({
  relations,
}: {
  relations?: FindOptionsRelations<Asset>;
} = {}) =>
  entityManagerWapper({
    evaluate: (manager) =>
      manager.find(AssetEntity, {
        ...(relations && { relations }),
        ...(relations?.images && { order: { images: { position: "ASC" } } }),
      }),
    onError: (error) => Effect.die(error),
  });

const saveAsset = (input: Partial<Asset>) =>
  entityManagerWapper({
    evaluate: (manager) => manager.save(AssetEntity, input) as Promise<Asset>,
    onError: (error) => Effect.die(error),
  });

export const createAsset = (input: CreateAssetInput) =>
  pipe(
    saveAsset({
      name: input.name,
      description: input.description ?? undefined,
      images: [],
      value: input.value,
      createdAt: Temporal.Now.instant(),
      updatedAt: Temporal.Now.instant(),
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
      if (input.value) asset.value = input.value;

      asset.updatedAt = Temporal.Now.instant();

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

export const deleteAsset = (input: Asset) =>
  entityManagerWapper({
    evaluate: (manager) => manager.remove(AssetEntity, input),
    onError: (error) => Effect.die(error),
  });
