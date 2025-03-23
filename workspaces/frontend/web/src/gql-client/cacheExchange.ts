import {
  AssetListDocument,
  type AssetListQuery,
} from "../gql-client/graphql.generated.ts";
import schema from "./introspection.generated.ts";
import { cacheExchange } from "@urql/exchange-graphcache";
import { Option, pipe } from "effect";

export const cache = cacheExchange({
  schema,
  keys: {
    Sum: () => null,
    ReadAssetError: () => null,
    DeleteDocumentError: () => null,
    ImageNotFoundError: () => null,
  },
  updates: {
    Mutation: {
      deleteAsset: (_result, args, cache) => {
        // Remove the asset from the asset list
        cache.updateQuery({ query: AssetListDocument }, (data) =>
          pipe(
            data,
            Option.fromNullable,
            Option.map(
              (assetListQuery) =>
                ({
                  ...assetListQuery,
                  assets: assetListQuery.assets.filter(
                    (asset) => asset.id !== args["id"],
                  ),
                }) satisfies AssetListQuery,
            ),
            Option.getOrNull,
          ),
        );

        // Invalidate the asset itself to prevent stale data being accidentally
        // shown.
        cache.invalidate({
          __typename: "Asset",
          id: String(args["id"] as unknown),
        });
      },
    },
  },
});
