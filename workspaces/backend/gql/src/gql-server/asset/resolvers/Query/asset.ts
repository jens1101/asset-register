import { ErrorTags } from "../../../../enums/ErrorTags.js";
import { readAsset } from "../../../../helpers/asset.js";
import {
  handleResolverError,
  handleResolverResponse,
  resolverWrapper,
} from "../../../../helpers/util.js";
import { withTransaction } from "../../../../scopes/index.js";
import type { QueryResolvers } from "./../../../types.generated.js";
import { Effect, pipe } from "effect";

export const asset: NonNullable<QueryResolvers["asset"]> = async (
  _parent,
  { id },
  _ctx,
) =>
  pipe(
    readAsset({ where: { id: Number(id) } }),
    withTransaction,
    Effect.andThen(handleResolverResponse("Asset")),
    Effect.catchTag(ErrorTags.ReadAsset, handleResolverError),
    resolverWrapper("Failed to read asset"),
  );
