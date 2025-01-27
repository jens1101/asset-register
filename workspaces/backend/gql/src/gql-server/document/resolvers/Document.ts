import { readDocument } from "../../../helpers/document.js";
import { resolverWrapper } from "../../../helpers/util.js";
import { withTransaction } from "../../../scopes/index.js";
import type { DocumentResolvers } from "./../../types.generated.js";
import { Effect, pipe } from "effect";

export const Document: DocumentResolvers = {
  asset: (parent) =>
    resolverWrapper(
      pipe(
        readDocument({
          where: { id: Number(parent.id) },
          relations: { asset: true },
        }),
        Effect.map((document) => document.asset),
        withTransaction,
      ),
      "Failed to read asset",
    ),
};
