import { readImages, readMainImage } from "../../../helpers/image.js";
import { readProofOfPurchase } from "../../../helpers/proofOfPurchase.js";
import { resolverWrapper } from "../../../helpers/util.js";
import { withTransaction } from "../../../scopes/index.js";
import type { AssetResolvers } from "./../../types.generated.js";
import { Effect, Option, pipe } from "effect";

export const Asset: AssetResolvers = {
  mainImage: (parent) =>
    pipe(
      readMainImage({ where: { asset: { id: Number(parent.id) } } }),
      withTransaction,
      Effect.map(Option.getOrNull),
      resolverWrapper("Failed to read main image"),
    ),
  images: (parent) =>
    pipe(
      readImages({ where: { asset: { id: Number(parent.id) } } }),
      withTransaction,
      resolverWrapper("Failed to read images"),
    ),
  proofOfPurchase: (parent) =>
    pipe(
      readProofOfPurchase({ where: { asset: { id: Number(parent.id) } } }),
      withTransaction,
      Effect.map(Option.getOrNull),
      resolverWrapper("Failed to read proof of purchase"),
    ),
};
