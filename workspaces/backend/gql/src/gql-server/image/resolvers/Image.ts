import { readImage } from "../../../helpers/image.js";
import { resolverWrapper } from "../../../helpers/util.js";
import { withTransaction } from "../../../scopes/index.js";
import type { ImageResolvers } from "./../../types.generated.js";
import { Effect, pipe } from "effect";

export const Image: ImageResolvers = {
  asset: (parent) =>
    resolverWrapper(
      pipe(
        readImage({
          where: { id: Number(parent.id) },
          relations: { asset: true },
        }),
        Effect.map((image) => image.asset),
        withTransaction,
      ),
      "Failed to read asset",
    ),
};
