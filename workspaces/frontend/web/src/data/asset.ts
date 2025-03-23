import { loadWrapper } from "../common/utils.ts";
import { query } from "../gql-client/client.ts";
import {
  AssetDocument,
  type AssetQuery,
  type AssetQueryVariables,
} from "../gql-client/graphql.generated.ts";
import type { RoutePreloadFuncArgs } from "@solidjs/router";
import { pipe } from "effect";

/** Data loader function for an asset */
export const loadAsset = ({ params }: RoutePreloadFuncArgs) =>
  pipe(
    query<AssetQuery, AssetQueryVariables>(AssetDocument, {
      id: params["id"] ?? "",
    }),
    loadWrapper("Failed to fetch asset"),
    ([assetQuery, { refetch }]) => ({ assetQuery, refetch }),
  );

export type AssetResource = ReturnType<typeof loadAsset>;
