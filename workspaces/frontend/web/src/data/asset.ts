import { loadWrapper } from "../common/utils.js";
import { query } from "../gql-client/client.js";
import {
  AssetDocument,
  type AssetQuery,
  type AssetQueryVariables,
} from "../gql-client/types/graphql.js";
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
