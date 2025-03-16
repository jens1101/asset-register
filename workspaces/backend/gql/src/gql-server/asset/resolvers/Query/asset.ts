import { ErrorTags } from "../../../../enums/ErrorTags.ts";
import { readAsset } from "../../../../helpers/asset.ts";
import {
  handleResolverError,
  handleResolverResponse,
  resolverWrapper,
} from "../../../../helpers/util.ts";
import { withTransaction } from "../../../../scopes/index.ts";
import type { QueryResolvers } from "./../../../types.generated.ts";
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
