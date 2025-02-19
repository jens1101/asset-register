import { type Asset, type Image, ImageEntity } from "../entities/index.js";
import { ImageNotFoundError } from "../errors/ImageNotFoundError.js";
import type {
  CreateImageInput,
  MutateImageInput,
  UpdateImageInput,
} from "../gql-server/types.generated.js";
import { deleteFile, saveFile } from "./file.js";
import { entityManagerWapper } from "./util.js";
import { Array, BigDecimal, Effect, Option, Order, pipe } from "effect";
import { Temporal } from "temporal-polyfill";
import type { FindOptionsRelations, FindOptionsWhere } from "typeorm";

export const readMainImage = ({ where }: { where: FindOptionsWhere<Image> }) =>
  pipe(
    entityManagerWapper({
      evaluate: (manager) =>
        manager.findOne(ImageEntity, {
          where,
          order: { position: "ASC" },
        }),
      onError: (error) => Effect.die(error),
    }),
    Effect.map(Option.fromNullable),
  );

export const readImages = ({
  where,
  relations,
}: {
  where: FindOptionsWhere<Image>;
  relations?: FindOptionsRelations<Image>;
}) =>
  entityManagerWapper({
    evaluate: (manager) =>
      manager.find(ImageEntity, {
        where,
        ...(relations && { relations }),
        order: { position: "ASC" },
      }),
    onError: (error) => Effect.die(error),
  });

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
  entityManagerWapper({
    evaluate: (manager) => manager.save(ImageEntity, input) as Promise<Image>,
    onError: (error) => Effect.die(error),
  });

const deleteImage = (input: Image) =>
  entityManagerWapper({
    evaluate: (manager) => manager.remove(ImageEntity, input),
    onError: (error) => Effect.die(error),
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
        pipe(
          Option.fromNullable(input.previousImageId),
          Option.map(Number),
          Option.filter((value) => !Number.isNaN(value)),
        ),
      ),
    });

    asset.images = Array.sort([...asset.images, image], orderImageByPosition);

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
        pipe(
          Option.fromNullable(input.previousImageId),
          Option.map(Number),
          Option.filter((value) => !Number.isNaN(value)),
        ),
      );

      asset.images = Array.sort(asset.images, orderImageByPosition);
    }

    image.updatedAt = Temporal.Now.instant();

    yield* saveImage(image);

    // Note: We can only remove the old file once the image changes have been
    // persisted to the DB. Otherwise the FK constraint will throw an error.
    if (Option.isSome(oldFile)) yield* deleteFile(oldFile.value);

    return asset;
  });

const orderImageByPosition = Order.mapInput(
  BigDecimal.Order,
  (image: Image) => image.position,
);

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

        if (previousImageIndex + 1 === assetImages.length) {
          return yield* pipe(
            Option.fromNullable(assetImages[previousImageIndex]?.position),
            Option.map(BigDecimal.sum(BigDecimal.fromBigInt(1n))),
          );
        }

        return yield* pipe(
          Option.all([
            Option.fromNullable(assetImages[previousImageIndex]?.position),
            Option.fromNullable(assetImages[previousImageIndex + 1]?.position),
          ]),
          Option.map(([a, b]) => BigDecimal.sum(a, b)),
          Option.flatMap((value) =>
            BigDecimal.divide(value, BigDecimal.fromBigInt(2n)),
          ),
        );
      }),
    ),
    Option.getOrElse(() =>
      pipe(
        Option.fromNullable(assetImages[0]?.position),
        Option.map(BigDecimal.subtract(BigDecimal.fromBigInt(1n))),
        Option.getOrElse(() => BigDecimal.fromBigInt(0n)),
        Effect.succeed,
      ),
    ),
  );
