import { ErrorTags } from "../../../../enums/ErrorTags.js";
import {
  readAsset,
  updateAsset as updateAssetHelper,
} from "../../../../helpers/asset.js";
import {
  handleResolverError,
  handleResolverResponse,
  resolverWrapper,
} from "../../../../helpers/util.js";
import { withTransaction } from "../../../../scopes/index.js";
import type { MutationResolvers } from "./../../../types.generated.js";
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
