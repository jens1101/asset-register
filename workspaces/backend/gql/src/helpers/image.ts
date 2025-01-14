import {
  type Asset,
  type File,
  FileEntity,
  type Image,
  ImageEntity,
} from "../entities/index.js";
import type {
  CreateImageInput,
  DeleteImageInput,
  MutateImageInput,
  UpdateImageInput,
} from "../gql-server/types.generated.js";
import { EntityManagerService } from "../services/index.js";
import { Decimal } from "decimal.js";
import { Effect, Option } from "effect";

export const mutateImages = (
  asset: Asset,
  inputs: MutateImageInput[],
): Effect.Effect<Asset, Error, EntityManagerService> =>
  Effect.gen(function* () {
    let currentAsset = asset;
    for (const input of inputs) {
      if (input.create) currentAsset = yield* createImage(asset, input.create);
      if (input.update) currentAsset = yield* updateImage(asset, input.update);
      if (input.delete) currentAsset = yield* deleteImage(asset, input.delete);
    }

    return currentAsset;
  });

const createImage = (
  asset: Asset,
  input: CreateImageInput,
): Effect.Effect<Asset, Error, EntityManagerService> =>
  Effect.gen(function* () {
    const manager = yield* EntityManagerService;
    const position = getNewImagePosition(
      asset.images,
      input.previousImageId ? Number(input.previousImageId) : null,
    );

    const image: Image = yield* Effect.tryPromise({
      try: async () =>
        manager.save(ImageEntity, {
          asset,
          name: input.name,
          description: input.description,
          file: await manager.save(FileEntity, input.file),
          position,
        }),
      catch: (error) => new Error(String(error)),
    });

    asset.images = [...asset.images, image].sort((a, b) =>
      a.position.minus(b.position).toNumber(),
    );

    return asset;
  });

const updateImage = (
  asset: Asset,
  input: UpdateImageInput,
): Effect.Effect<Asset, Error, EntityManagerService> =>
  Effect.gen(function* () {
    const image = asset.images.find((image) => image.id === Number(input.id));
    let oldFile: Option.Option<File> = Option.none();

    if (!image) {
      return yield* Effect.fail(
        new Error(`Image with ID ${input.id} not found in asset`),
      );
    }

    const manager = yield* EntityManagerService;

    if (input.name != null) image.name = input.name;

    if (input.description != null) image.description = input.description;

    if (input.previousImageId || input.previousImageId === null) {
      image.position = getNewImagePosition(
        asset.images,
        input.previousImageId === null ? null : Number(input.previousImageId),
      );

      asset.images.sort((a, b) => a.position.minus(b.position).toNumber());
    }

    if (input.file) {
      const newFile = input.file;
      oldFile = Option.some(image.file);
      image.file = yield* Effect.tryPromise({
        try: () => manager.save(FileEntity, newFile),
        catch: (error) => new Error(String(error)),
      });
    }

    yield* Effect.tryPromise({
      try: () => manager.save(ImageEntity, image),
      catch: (error) => new Error(String(error)),
    });

    // Note: We can only remove the old file once the image changes have been
    // persisted to the DB. Otherwise the FK constraint will throw an error.
    if (Option.isSome(oldFile)) {
      yield* Effect.tryPromise({
        try: () => manager.remove(FileEntity, oldFile.value),
        catch: (error) => new Error(String(error)),
      });
    }

    return asset;
  });

const deleteImage = (
  asset: Asset,
  input: DeleteImageInput,
): Effect.Effect<Asset, Error, EntityManagerService> =>
  Effect.gen(function* () {
    const image = asset.images.find((image) => image.id === Number(input.id));

    if (!image)
      return yield* Effect.fail(
        new Error(`Image with ID ${input.id} not found in asset`),
      );

    const manager = yield* EntityManagerService;

    yield* Effect.tryPromise({
      try: async () => {
        await manager.remove(ImageEntity, image);
        await manager.remove(FileEntity, image.file);
      },
      catch: (error) => new Error(String(error)),
    });

    asset.images = asset.images.filter((x) => x !== image);

    return asset;
  });

function getNewImagePosition(
  assetImages: Image[],
  previousImageId: number | null,
): Decimal {
  // If the previous image ID is null then that means the image should be added
  // to the beginning of the list.
  if (previousImageId === null) {
    return assetImages[0]?.position.minus(1) ?? new Decimal(0);
  }

  const previousImageIndex = assetImages.findIndex(
    (image) => image.id === Number(previousImageId),
  );

  // If the previous image could not be found within the list of images for the
  // current asset then that's an error.
  if (previousImageIndex === -1) {
    throw new Error(`Could not find image with ID ${previousImageId} in asset`);
  }

  return previousImageIndex + 1 === assetImages.length
    ? (assetImages[previousImageIndex]?.position.add(1) ?? new Decimal(0))
    : Decimal.sum(
        assetImages[previousImageIndex]?.position ?? 0,
        assetImages[previousImageIndex + 1]?.position ?? 0,
      ).dividedBy(2);
}
