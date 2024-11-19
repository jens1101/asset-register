import { dataSource } from "../../../../dataSource.js";
import {
  AssetEntity,
  DocumentEntity,
  FileEntity,
  ImageEntity,
} from "../../../../entities/index.js";
import type { MutationResolvers } from "./../../../types.generated.js";

export const deleteAsset: NonNullable<
  MutationResolvers["deleteAsset"]
> = async (_parent, { id }, _ctx) => {
  await dataSource.transaction(async (manager) => {
    const asset = await manager.findOneOrFail(AssetEntity, {
      where: {
        id: Number(id),
      },
      relations: {
        images: true,
        proofOfPurchase: true,
      },
    });

    await manager.remove(ImageEntity, asset.images);
    await manager.remove(
      FileEntity,
      asset.images.map((image) => image.file),
    );

    if (asset.proofOfPurchase) {
      await manager.remove(DocumentEntity, asset.proofOfPurchase);
      await manager.remove(FileEntity, asset.proofOfPurchase.file);
    }

    await manager.remove(AssetEntity, asset);
  });
};
