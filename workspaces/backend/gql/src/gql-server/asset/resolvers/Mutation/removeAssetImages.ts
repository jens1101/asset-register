import { dataSource } from "../../../../dataSource.js";
import {
  type Asset,
  AssetEntity,
  FileEntity,
  ImageEntity,
} from "../../../../entities/index.js";
import type { MutationResolvers } from "./../../../types.generated.js";

export const removeAssetImages: NonNullable<
  MutationResolvers["removeAssetImages"]
> = async (_parent, { id, imageIds }, _ctx) => {
  const asset = await dataSource.transaction<Asset>(async (manager) => {
    const asset = await manager.findOneOrFail(AssetEntity, {
      where: { id: Number(id) },
      relations: {
        images: true,
        proofOfPurchase: true,
      },
    });

    const imagesToRemove = asset.images.filter(
      (image) => !imageIds || imageIds.includes(String(image.id)),
    );

    await manager.remove(ImageEntity, imagesToRemove);
    await manager.remove(
      FileEntity,
      imagesToRemove.map((image) => image.file),
    );

    return {
      ...asset,
      images: asset.images.filter((image) => image.id != null),
    } satisfies Asset;
  });

  return {
    ...asset,
    __typename: "Asset",
  };
};
