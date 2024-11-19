import { dataSource } from "../../../../dataSource.js";
import { AssetEntity } from "../../../../entities/index.js";
import type { MutationResolvers } from "./../../../types.generated.js";

export const updateAsset: NonNullable<
  MutationResolvers["updateAsset"]
> = async (_parent, { data }, _ctx) => {
  const { id, ...changes } = data;

  await dataSource.manager.update(
    AssetEntity,
    id,
    Object.fromEntries(
      Object.entries(changes).filter(([, value]) => value != null),
    ),
  );

  const asset = await dataSource.manager.findOneOrFail(AssetEntity, {
    where: {
      id: Number(id),
    },
  });

  return {
    ...asset,
    __typename: "Asset",
  };
};
