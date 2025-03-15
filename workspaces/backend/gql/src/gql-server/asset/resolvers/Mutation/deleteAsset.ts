import { ErrorTags } from "../../../../enums/ErrorTags.ts";
import {
  deleteAsset as deleteAssetHelper,
  readAsset,
} from "../../../../helpers/asset.ts";
import {
  handleResolverError,
  resolverWrapper,
} from "../../../../helpers/util.ts";
import { withTransaction } from "../../../../scopes/index.ts";
import type { MutationResolvers } from "./../../../types.generated.ts";
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
