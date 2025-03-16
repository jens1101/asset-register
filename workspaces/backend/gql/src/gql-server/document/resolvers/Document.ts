import { readAsset } from "../../../helpers/asset.ts";
import { resolverWrapper } from "../../../helpers/util.ts";
import { withTransaction } from "../../../scopes/index.ts";
import type { DocumentResolvers } from "./../../types.generated.ts";
import { pipe } from "effect";

export const Document: DocumentResolvers = {
  asset: (parent) =>
    pipe(
      readAsset({ where: { proofOfPurchase: { id: Number(parent.id) } } }),
      withTransaction,
      resolverWrapper("Failed to read asset"),
    ),
};
