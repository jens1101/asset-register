import { type Asset, type Image, ImageEntity } from "../entities/index.js";
import { DeleteImageError } from "../errors/DeleteImageError.js";
import { ImageNotFoundError } from "../errors/ImageNotFoundError.js";
import { SaveImageError } from "../errors/SaveImageError.js";
import type {
  CreateImageInput,
  MutateImageInput,
  UpdateImageInput,
} from "../gql-server/types.generated.js";
import { EntityManagerService } from "../services/index.js";
import { deleteFile, saveFile } from "./file.js";
import { Decimal } from "decimal.js";
import { Array, Effect, Option, pipe } from "effect";

export const readMainImage = (assetId: number) =>
  pipe(
    EntityManagerService,
    Effect.andThen((manager) =>
      Effect.promise(() =>
        manager.findOne(ImageEntity, {
          where: {
            asset: {
              id: assetId,
            },
          },
          order: {
            position: "ASC",
          },
        }),
      ),
    ),
    Effect.map((mainImage) => Option.fromNullable(mainImage)),
  );

export const mutateImages = (asset: Asset, inputs: MutateImageInput[]) =>
  Effect.reduce(inputs, asset, (asset, input) =>
    Effect.gen(function* () {
      if (input.create) return yield* createImage(asset, input.create);
      if (input.update) return yield* updateImage(asset, input.update);

      const image = yield* findImage(asset.images, Number(input.delete.id));
      yield* deleteImage(image);
      asset.images = Array.difference(asset.images, [image]);

      return asset;
    }),
  );

const saveImage = (input: Partial<Image>) =>
  Effect.gen(function* () {
    const manager = yield* EntityManagerService;

    return yield* Effect.tryPromise({
      try: async () => (await manager.save(ImageEntity, input)) as Image,
      catch: (cause) =>
        new SaveImageError({
          message: "Failed to save document",
          options: { cause, input },
        }),
    });
  });

const deleteImage = (input: Image) =>
  Effect.gen(function* () {
    const manager = yield* EntityManagerService;

    yield* Effect.tryPromise({
      try: async () => manager.remove(ImageEntity, input),
      catch: (cause) =>
        new DeleteImageError({
          message: "Failed to delete image",
          options: { cause, input },
        }),
    });

    yield* deleteFile(input.file);
  });

export const createImage = (asset: Asset, input: CreateImageInput) =>
  Effect.gen(function* () {
    const image = yield* saveImage({
      asset,
      name: input.name,
      description: input.description,
      file: yield* saveFile(input.file),
      position: yield* getNewImagePosition(
        asset.images,
        Option.filter(
          Option.some(Number(input.previousImageId)),
          (value) => !Number.isNaN(value),
        ),
      ),
    });

    asset.images = [...asset.images, image].sort((a, b) =>
      a.position.comparedTo(b.position),
    );

    return asset;
  });

const updateImage = (asset: Asset, input: UpdateImageInput) =>
  Effect.gen(function* () {
    const image = yield* findImage(asset.images, Number(input.id));
    const oldFile = Option.filter(Option.some(image.file), () => !!input.file);

    if (input.name != null) image.name = input.name;
    if (input.description != null) image.description = input.description;
    if (input.file) image.file = yield* saveFile(input.file);
    if (input.previousImageId || input.previousImageId === null) {
      image.position = yield* getNewImagePosition(
        asset.images,
        Option.filter(Option.some(Number(input.previousImageId)), Number.isNaN),
      );

      asset.images.sort((a, b) => a.position.comparedTo(b.position));
    }

    yield* saveImage(image);

    // Note: We can only remove the old file once the image changes have been
    // persisted to the DB. Otherwise the FK constraint will throw an error.
    if (Option.isSome(oldFile)) yield* deleteFile(oldFile.value);

    return asset;
  });

const findImage = (images: Image[], id: number) =>
  Effect.mapError(
    Array.findFirst(images, (image) => image.id === id),
    (cause) =>
      new ImageNotFoundError({
        message: "Image not found in asset",
        options: { cause, input: { images, id } },
      }),
  );

const getNewImagePosition = (
  assetImages: Image[],
  previousImageId: Option.Option<number>,
) =>
  pipe(
    previousImageId,
    Option.map((previousImageId) =>
      Effect.gen(function* () {
        const previousImageIndex = assetImages.findIndex(
          (image) => image.id === Number(previousImageId),
        );

        if (previousImageIndex === -1) {
          return yield* new ImageNotFoundError({
            message: "Image not found in asset",
            options: { input: { assetImages, previousImageId } },
          });
        }

        return previousImageIndex + 1 === assetImages.length
          ? (assetImages[previousImageIndex]?.position.add(1) ?? new Decimal(0))
          : Decimal.sum(
              assetImages[previousImageIndex]?.position ?? 0,
              assetImages[previousImageIndex + 1]?.position ?? 0,
            ).dividedBy(2);
      }),
    ),
    Option.getOrElse(() =>
      Effect.succeed(assetImages[0]?.position.minus(1) ?? new Decimal(0)),
    ),
  );
