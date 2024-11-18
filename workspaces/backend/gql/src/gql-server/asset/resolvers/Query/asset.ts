import { dataSource } from "../../../../dataSource.js";
import { AssetEntity } from "../../../../entities/index.js";
import type { QueryResolvers } from "./../../../types.generated.js";

export const asset: NonNullable<QueryResolvers["asset"]> = async (
  _parent,
  { id },
  _ctx,
) => {
  const assetDataRepository = dataSource.getRepository(AssetEntity);

  const asset = await assetDataRepository.findOneOrFail({
    where: {
      id: Number(id),
    },
    relations: {
      proofOfPurchase: true,
      images: true,
    },
  });

  return {
    ...asset,
    __typename: "Asset",
  };
};
