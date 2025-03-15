import { readAssets } from "../../../../helpers/asset.ts";
import { resolverWrapper } from "../../../../helpers/util.ts";
import { withTransaction } from "../../../../scopes/index.ts";
import type { QueryResolvers } from "./../../../types.generated.ts";
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
