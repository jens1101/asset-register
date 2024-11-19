import { dataSource } from "../../../../dataSource.js";
import {
  type Asset,
  AssetEntity,
  DocumentEntity,
  FileEntity,
} from "../../../../entities/index.js";
import type { MutationResolvers } from "./../../../types.generated.js";

export const replaceProofOfPurchase: NonNullable<
  MutationResolvers["replaceProofOfPurchase"]
> = async (_parent, { id, proofOfPurchase }, _ctx) => {
  const asset = await dataSource.transaction<Asset>(async (manager) => {
    const asset = await manager.findOneOrFail(AssetEntity, {
      where: { id: Number(id) },
      relations: {
        images: true,
        proofOfPurchase: true,
      },
    });

    if (asset.proofOfPurchase) {
      await manager.remove(DocumentEntity, asset.proofOfPurchase);
      await manager.remove(FileEntity, asset.proofOfPurchase.file);
    }

    return {
      ...asset,
      proofOfPurchase: await manager.save(DocumentEntity, {
        ...proofOfPurchase,
        asset,
        file: await manager.save(FileEntity, proofOfPurchase.file),
      }),
    } satisfies Asset;
  });

  return {
    ...asset,
    __typename: "Asset",
  };
};
