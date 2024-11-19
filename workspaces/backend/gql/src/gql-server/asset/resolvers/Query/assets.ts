import { dataSource } from "../../../../dataSource.js";
import { AssetEntity } from "../../../../entities/index.js";
import type { QueryResolvers } from "./../../../types.generated.js";

export const assets: NonNullable<QueryResolvers["assets"]> = async (
  _parent,
  _arg,
  _ctx,
) => {
  const assetDataRepository = dataSource.getRepository(AssetEntity);

  const assets = await assetDataRepository.find({
    relations: {
      proofOfPurchase: true,
      images: true,
    },
  });

  return assets.map((asset) => ({
    ...asset,
    __typename: "Asset",
  }));
};