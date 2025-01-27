import { readAsset } from "../../../helpers/asset.js";
import { resolverWrapper } from "../../../helpers/util.js";
import { withTransaction } from "../../../scopes/index.js";
import type { DocumentResolvers } from "./../../types.generated.js";
import { pipe } from "effect";

export const Document: DocumentResolvers = {
  asset: (parent) =>
    resolverWrapper(
      pipe(
        readAsset({ where: { proofOfPurchase: { id: Number(parent.id) } } }),
        withTransaction,
      ),
      "Failed to read asset",
    ),
};
