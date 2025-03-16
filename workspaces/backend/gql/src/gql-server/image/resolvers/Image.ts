import { readAsset } from "../../../helpers/asset.ts";
import { resolverWrapper } from "../../../helpers/util.ts";
import { withTransaction } from "../../../scopes/index.ts";
import type { ImageResolvers } from "./../../types.generated.ts";
import { pipe } from "effect";

export const Image: ImageResolvers = {
  asset: (parent) =>
    pipe(
      readAsset({ where: { images: { id: Number(parent.id) } } }),
      withTransaction,
      resolverWrapper("Failed to read asset"),
    ),
};
