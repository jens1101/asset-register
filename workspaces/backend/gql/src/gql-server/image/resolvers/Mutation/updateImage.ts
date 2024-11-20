import { dataSource } from "../../../../dataSource.js";
import { type Image, ImageEntity } from "../../../../entities/Image.js";
import type { MutationResolvers } from "./../../../types.generated.js";
import { Decimal } from "decimal.js";
import type { EntityManager } from "typeorm";

async function updateImagePosition(
  manager: EntityManager,
  id: string,
  previousImageId: string | null,
): Promise<void> {
  // If the the image is its own previous image then reordering is pointless.
  if (id === previousImageId) {
    return;
  }

  const image = await manager.findOneOrFail(ImageEntity, {
    where: { id: Number(id) },
    relations: {
      asset: true,
    },
  });
  const assetImages = await manager.findBy(ImageEntity, {
    asset: {
      id: image.asset.id,
    },
  });

  // If the asset only has one image then reordering is pointless.
  if (assetImages.length <= 1) {
    return;
  }

  // If the previous image ID is null then that means the image should be added
  // to the beginning of the list.
  if (previousImageId === null) {
    await manager.update(ImageEntity, id, {
      position: assetImages[0]?.position.minus(1) ?? new Decimal(0),
    });

    return;
  }

  const previousImageIndex = assetImages.findIndex(
    (image) => image.id === Number(previousImageId),
  );

  // If the previous image could not be found within the list of images for the
  // current asset then that's an error.
  if (previousImageIndex === -1) {
    throw new Error(
      `Asset ${image.asset.id} does not have image with ID ${previousImageId}`,
    );
  }

  const newPosition =
    previousImageIndex + 1 === assetImages.length
      ? (assetImages[previousImageIndex]?.position.add(1) ?? new Decimal(0))
      : Decimal.sum(
          assetImages[previousImageIndex]?.position ?? 0,
          assetImages[previousImageIndex + 1]?.position ?? 0,
        ).dividedBy(2);

  await manager.update(ImageEntity, id, {
    position: newPosition,
  });
}

export const updateImage: NonNullable<
  MutationResolvers["updateImage"]
> = async (_parent, { data: { id, previousImageId, ...updates } }, _ctx) => {
  const image = await dataSource.transaction<Image>(async (manager) => {
    await manager.update(
      ImageEntity,
      id,
      Object.fromEntries(
        Object.entries(updates).filter(([, value]) => value != null),
      ),
    );

    if (previousImageId || previousImageId === null) {
      await updateImagePosition(manager, id, previousImageId);
    }

    return manager.findOneOrFail(ImageEntity, {
      where: {
        id: Number(id),
      },
      relations: {
        file: true,
      },
    });
  });

  return {
    ...image,
    __typename: "Image",
  };
};
