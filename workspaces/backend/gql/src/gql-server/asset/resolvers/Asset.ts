import { readImages, readMainImage } from "../../../helpers/image.js";
import { readProofOfPurchase } from "../../../helpers/proofOfPurchase.js";
import { resolverWrapper } from "../../../helpers/util.js";
import { withTransaction } from "../../../scopes/index.js";
import type { AssetResolvers } from "./../../types.generated.js";
import { Effect, Option, pipe } from "effect";

export const Asset: AssetResolvers = {
  mainImage: (parent) =>
    resolverWrapper(
      pipe(
        readMainImage({ where: { asset: { id: Number(parent.id) } } }),
        withTransaction,
        Effect.map(Option.getOrNull),
      ),
      "Failed to read main image",
    ),
  images: (parent) =>
    resolverWrapper(
      pipe(
        readImages({ where: { asset: { id: Number(parent.id) } } }),
        withTransaction,
      ),
      "Failed to read images",
    ),
  proofOfPurchase: (parent) =>
    resolverWrapper(
      pipe(
        readProofOfPurchase({ where: { asset: { id: Number(parent.id) } } }),
        withTransaction,
        Effect.map(Option.getOrNull),
      ),
      "Failed to read proof of purchase",
    ),
};
