import { dataSource } from "../../../../dataSource.js";
import {
  type Asset,
  AssetEntity,
  FileEntity,
  type Image,
  ImageEntity,
} from "../../../../entities/index.js";
import type { MutationResolvers } from "./../../../types.generated.js";

export const deleteAssetImages: NonNullable<
  MutationResolvers["deleteAssetImages"]
> = async (_parent, { id, imageIds }, _ctx) => {
  const asset = await dataSource.transaction<Asset>(async (manager) => {
    const asset = await manager.findOneOrFail(AssetEntity, {
      where: { id: Number(id) },
      relations: {
        images: true,
        proofOfPurchase: true,
      },
    });

    const { imagesToKeep, imagesToRemove } = asset.images.reduce<{
      imagesToKeep: Image[];
      imagesToRemove: Image[];
    }>(
      (acc, image) => {
        !imageIds || imageIds.includes(String(image.id))
          ? acc.imagesToRemove.push(image)
          : acc.imagesToKeep.push(image);

        return acc;
      },
      { imagesToKeep: [], imagesToRemove: [] },
    );

    await manager.remove(ImageEntity, imagesToRemove);
    await manager.remove(
      FileEntity,
      imagesToRemove.map((image) => image.file),
    );

    return {
      ...asset,
      images: imagesToKeep,
    } satisfies Asset;
  });

  return {
    ...asset,
    __typename: "Asset",
  };
};
