import { readAsset } from "../../../helpers/asset.js";
import { resolverWrapper } from "../../../helpers/util.js";
import { withTransaction } from "../../../scopes/index.js";
import type { ImageResolvers } from "./../../types.generated.js";
import { pipe } from "effect";

export const Image: ImageResolvers = {
  asset: (parent) =>
    resolverWrapper(
      pipe(
        readAsset({ where: { images: { id: Number(parent.id) } } }),
        withTransaction,
      ),
      "Failed to read asset",
    ),
};
