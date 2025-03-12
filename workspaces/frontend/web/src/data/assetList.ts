import { loadWrapper } from "../common/utils.js";
import { query } from "../gql-client/client.js";
import {
  AssetListDocument,
  type AssetListQuery,
  type AssetListQueryVariables,
} from "../gql-client/types/graphql.js";
import { pipe } from "effect";

/** Data loader function for a list of assets */
export const loadAssetList = () =>
  pipe(
    query<AssetListQuery, AssetListQueryVariables>(AssetListDocument, {}),
    loadWrapper("Failed to fetch asset list"),
    ([assetListQuery, { refetch }]) => ({ assetListQuery, refetch }),
  );

export type AssetListResource = ReturnType<typeof loadAssetList>;
