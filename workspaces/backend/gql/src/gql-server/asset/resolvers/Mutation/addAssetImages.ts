import { dataSource } from "../../../../dataSource.js";
import {
  type Asset,
  AssetEntity,
  FileEntity,
  ImageEntity,
} from "../../../../entities/index.js";
import type { MutationResolvers } from "./../../../types.generated.js";

export const addAssetImages: NonNullable<
  MutationResolvers["addAssetImages"]
> = async (_parent, { id, images }, _ctx) => {
  const asset = await dataSource.transaction<Asset>(async (manager) => {
    const asset = await manager.findOneByOrFail(AssetEntity, {
      id: Number(id),
    });

    await manager.save(
      ImageEntity,
      await Promise.all(
        images.map(async (image) => ({
          ...image,
          asset,
          file: await manager.save(FileEntity, image.file),
        })),
      ),
    );

    return manager.findOneOrFail(AssetEntity, {
      where: { id: Number(id) },
      relations: {
        images: true,
        proofOfPurchase: true,
      },
    });
  });

  return {
    ...asset,
    __typename: "Asset",
  };
};
