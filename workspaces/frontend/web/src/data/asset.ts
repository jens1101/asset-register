import { client } from "../gql-client/client.js";
import {
  AssetDocument,
  type AssetQuery,
  type AssetQueryVariables,
} from "../gql-client/types/graphql.js";
import type { RoutePreloadFunc } from "@solidjs/router";
import { type Resource, createResource } from "solid-js";

// TODO: maybe return an Either that contains the error or data.
export type AssetResource = Resource<AssetQuery | undefined>;

export const loadAsset: RoutePreloadFunc<AssetResource> = ({ params }) => {
  // TODO: error handling. Maybe we need to separate the errors from the data?
  const [data] = createResource(async () => {
    const { data } = await client.query<AssetQuery, AssetQueryVariables>(
      AssetDocument,
      {
        id: params["id"] ?? "",
      },
    );

    return data;
  });

  return data;
};
