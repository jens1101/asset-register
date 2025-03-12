import { readAssets } from "../../../../helpers/asset.js";
import { resolverWrapper } from "../../../../helpers/util.js";
import { withTransaction } from "../../../../scopes/index.js";
import type { QueryResolvers } from "./../../../types.generated.js";
import { pipe } from "effect";

export const assets: NonNullable<QueryResolvers["assets"]> = async (
  _parent,
  _arg,
  _ctx,
) =>
  pipe(
    readAssets({ relations: { images: true, proofOfPurchase: true } }),
    withTransaction,
    resolverWrapper("Failed to read assets"),
  );
