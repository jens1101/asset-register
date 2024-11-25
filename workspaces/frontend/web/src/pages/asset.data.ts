import { client } from "../gql-client/client.js";
import {
  AssetDocument,
  type AssetQuery,
  type AssetQueryVariables,
} from "../gql-client/types/graphql.js";
import type { RoutePreloadFunc } from "@solidjs/router";
import { type Resource, createResource } from "solid-js";

// TODO: return the asset fragment or error fragment
export type AssetData = Resource<string>;

export const loadAsset: RoutePreloadFunc<AssetData> = ({ params }) => {
  // TODO: error handling. Maybe we need to separate the errors from the data?
  const [data] = createResource(async () => {
    const { data } = await client.query<AssetQuery, AssetQueryVariables>(
      AssetDocument,
      {
        id: params["id"] ?? "",
      },
    );

    return JSON.stringify(data, null, 2);
  });

  return data;
};
