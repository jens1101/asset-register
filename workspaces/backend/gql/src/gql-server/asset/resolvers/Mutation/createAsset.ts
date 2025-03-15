import { createAsset as createAssetHelper } from "../../../../helpers/asset.ts";
import {
  handleResolverResponse,
  resolverWrapper,
} from "../../../../helpers/util.ts";
import { withTransaction } from "../../../../scopes/index.ts";
import type { MutationResolvers } from "./../../../types.generated.ts";
import { Effect, pipe } from "effect";

export const createAsset: NonNullable<
  MutationResolvers["createAsset"]
> = async (_parent, { data }, _ctx) =>
  pipe(
    createAssetHelper(data),
    withTransaction,
    Effect.andThen(handleResolverResponse("Asset")),
    resolverWrapper("Failed to create asset"),
  );
