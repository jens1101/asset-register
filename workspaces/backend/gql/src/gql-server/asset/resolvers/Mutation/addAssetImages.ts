import { dataSource } from "../../../../dataSource.js";
import {
  type Asset,
  AssetEntity,
  FileEntity,
  type Image,
  ImageEntity,
} from "../../../../entities/index.js";
import type { MutationResolvers } from "./../../../types.generated.js";
import { Decimal } from "decimal.js";

export const addAssetImages: NonNullable<
  MutationResolvers["addAssetImages"]
> = async (_parent, { id, images }, _ctx) => {
  const asset = await dataSource.transaction<Asset>(async (manager) => {
    const asset = await manager.findOneOrFail(AssetEntity, {
      where: { id: Number(id) },
      relations: {
        images: true,
        proofOfPurchase: true,
      },
      order: {
        images: {
          position: "ASC",
        },
      },
    });

    const lastImagePosition = asset.images.at(-1)?.position ?? new Decimal(-1);

    const newImages: Image[] = await manager.save(
      ImageEntity,
      await Promise.all(
        images.map(async (image, index) => ({
          ...image,
          asset,
          file: await manager.save(FileEntity, image.file),
          position: lastImagePosition.add(index + 1),
        })),
      ),
    );

    return {
      ...asset,
      images: [...asset.images, ...newImages],
    };
  });

  return {
    ...asset,
    __typename: "Asset",
  };
};
