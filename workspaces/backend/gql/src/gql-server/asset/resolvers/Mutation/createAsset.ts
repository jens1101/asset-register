import type { Maybe } from "../../../../common/types.js";
import { dataSource } from "../../../../dataSource.js";
import {
  type Asset,
  AssetEntity,
  type Document,
  DocumentEntity,
  FileEntity,
  type Image,
  ImageEntity,
} from "../../../../entities/index.js";
import type { MutationResolvers } from "./../../../types.generated.js";
import { Decimal } from "decimal.js";

export const createAsset: NonNullable<
  MutationResolvers["createAsset"]
> = async (_parent, { data }, _ctx) => {
  const asset = await dataSource.transaction<Asset>(async (manager) => {
    const asset = await manager.save(AssetEntity, {
      name: data.name,
      description: data.description,
      images: [],
    });

    const images: Image[] = data.images
      ? await manager.save(
          ImageEntity,
          await Promise.all(
            data.images.map(async (image, index) => ({
              ...image,
              asset,
              position: new Decimal(index),
              file: await manager.save(FileEntity, image.file),
            })),
          ),
        )
      : [];

    const proofOfPurchase: Maybe<Document> =
      data.proofOfPurchase &&
      (await manager.save(DocumentEntity, {
        ...data.proofOfPurchase,
        asset,
        file: await manager.save(FileEntity, data.proofOfPurchase.file),
      }));

    return {
      ...asset,
      proofOfPurchase,
      images,
    } satisfies Asset;
  });

  return {
    ...asset,
    __typename: "Asset",
  };
};
