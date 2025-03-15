import { loadWrapper } from "../common/utils.ts";
import { query } from "../gql-client/client.ts";
import {
  AssetListDocument,
  type AssetListQuery,
  type AssetListQueryVariables,
} from "../gql-client/types/graphql.ts";
import { pipe } from "effect";

/** Data loader function for a list of assets */
export const loadAssetList = () =>
  pipe(
    query<AssetListQuery, AssetListQueryVariables>(AssetListDocument, {}),
    loadWrapper("Failed to fetch asset list"),
    ([assetListQuery, { refetch }]) => ({ assetListQuery, refetch }),
  );

export type AssetListResource = ReturnType<typeof loadAssetList>;
