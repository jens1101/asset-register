import { createAsset as createAssetHelper } from "../../../../helpers/asset.js";
import {
  handleResolverResponse,
  resolverWrapper,
} from "../../../../helpers/util.js";
import { withTransaction } from "../../../../scopes/index.js";
import type { MutationResolvers } from "./../../../types.generated.js";
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
