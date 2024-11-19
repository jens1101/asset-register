import { dataSource } from "../../../../dataSource.js";
import {
  type Asset,
  AssetEntity,
  DocumentEntity,
  FileEntity,
} from "../../../../entities/index.js";
import type { MutationResolvers } from "./../../../types.generated.js";

export const removeProofOfPurchase: NonNullable<
  MutationResolvers["removeProofOfPurchase"]
> = async (_parent, { id }, _ctx) => {
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
      proofOfPurchase: null,
    } satisfies Asset;
  });

  return {
    ...asset,
    __typename: "Asset",
  };
};
