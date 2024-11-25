import { client } from "../gql-client/client.js";
import {
  AssetsDocument,
  type AssetsQuery,
  type AssetsQueryVariables,
} from "../gql-client/types/graphql.js";
import type { RoutePreloadFunc } from "@solidjs/router";
import { type Resource, createResource } from "solid-js";

export type HomeData = Resource<AssetsQuery | undefined>;

export const loadHome: RoutePreloadFunc<HomeData> = () => {
  const [data] = createResource(async () => {
    const { data } = await client.query<AssetsQuery, AssetsQueryVariables>(
      AssetsDocument,
      {},
    );

    return data;
  });

  return data;
};
