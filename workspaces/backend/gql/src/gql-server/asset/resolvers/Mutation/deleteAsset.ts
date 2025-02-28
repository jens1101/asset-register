import { ErrorTags } from "../../../../enums/ErrorTags.js";
import {
  deleteAsset as deleteAssetHelper,
  readAsset,
} from "../../../../helpers/asset.js";
import {
  handleResolverError,
  resolverWrapper,
} from "../../../../helpers/util.js";
import { withTransaction } from "../../../../scopes/index.js";
import type { MutationResolvers } from "./../../../types.generated.js";
import { Effect, pipe } from "effect";

export const deleteAsset: NonNullable<
  MutationResolvers["deleteAsset"]
> = async (_parent, { id }, _ctx) =>
  pipe(
    readAsset({ where: { id: Number(id) } }),
    Effect.andThen(deleteAssetHelper),
    Effect.as(null),
    withTransaction,
    Effect.catchTag(ErrorTags.ReadAsset, handleResolverError),
    resolverWrapper("Failed to delete asset"),
  );
