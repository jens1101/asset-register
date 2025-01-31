import { readImages, readMainImage } from "../../../helpers/image.js";
import { readProofOfPurchase } from "../../../helpers/proofOfPurchase.js";
import { runAsyncWrapper } from "../../../helpers/util.js";
import { withTransaction } from "../../../scopes/index.js";
import type { AssetResolvers } from "./../../types.generated.js";
import { Effect, Option, pipe } from "effect";

export const Asset: AssetResolvers = {
  mainImage: (parent) =>
    runAsyncWrapper(
      pipe(
        readMainImage({ where: { asset: { id: Number(parent.id) } } }),
        withTransaction,
        Effect.map(Option.getOrNull),
      ),
      "Failed to read main image",
    ),
  images: (parent) =>
    runAsyncWrapper(
      pipe(
        readImages({ where: { asset: { id: Number(parent.id) } } }),
        withTransaction,
      ),
      "Failed to read images",
    ),
  proofOfPurchase: (parent) =>
    runAsyncWrapper(
      pipe(
        readProofOfPurchase({ where: { asset: { id: Number(parent.id) } } }),
        withTransaction,
        Effect.map(Option.getOrNull),
      ),
      "Failed to read proof of purchase",
    ),
};
