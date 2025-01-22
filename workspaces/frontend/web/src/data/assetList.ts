import { client } from "../gql-client/client.js";
import {
  AssetListDocument,
  type AssetListQuery,
  type AssetListQueryVariables,
} from "../gql-client/types/graphql.js";
import type { RoutePreloadFunc } from "@solidjs/router";
import { type Resource, createResource } from "solid-js";

export type AssetListResource = Resource<AssetListQuery | undefined>;

// TODO: error handling
export const loadAssetList: RoutePreloadFunc<AssetListResource> = () => {
  const [data] = createResource(async () => {
    const { data } = await client.query<
      AssetListQuery,
      AssetListQueryVariables
    >(AssetListDocument, {});

    return data;
  });

  return data;
};
