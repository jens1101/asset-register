import { ErrorTags } from "../../../../enums/ErrorTags.ts";
import {
  readAsset,
  updateAsset as updateAssetHelper,
} from "../../../../helpers/asset.ts";
import {
  handleResolverError,
  handleResolverResponse,
  resolverWrapper,
} from "../../../../helpers/util.ts";
import { withTransaction } from "../../../../scopes/index.ts";
import type { MutationResolvers } from "./../../../types.generated.ts";
import { Effect, pipe } from "effect";

export const updateAsset: NonNullable<
  MutationResolvers["updateAsset"]
> = async (_parent, { data }, _ctx) =>
  pipe(
    readAsset({
      where: { id: Number(data.id) },
      relations: { images: true, proofOfPurchase: true },
    }),
    Effect.andThen((asset) => updateAssetHelper(asset, data)),
    withTransaction,
    Effect.andThen(handleResolverResponse("Asset")),
    Effect.catchTag(ErrorTags.ReadAsset, handleResolverError),
    Effect.catchTag(ErrorTags.DeleteDocument, handleResolverError),
    Effect.catchTag(ErrorTags.ImageNotFound, handleResolverError),
    resolverWrapper("Failed to update asset"),
  );
