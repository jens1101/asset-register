import { client } from "../gql-client/client.js";
import {
  AssetsDocument,
  type AssetsQuery,
  type AssetsQueryVariables,
} from "../gql-client/types/graphql.js";
import type { RoutePreloadFunc } from "@solidjs/router";
import { type Resource, createResource } from "solid-js";

export type AboutData = Resource<string>;

export const loadAbout: RoutePreloadFunc<AboutData> = () => {
  const [data] = createResource(async () => {
    const { data } = await client.query<AssetsQuery, AssetsQueryVariables>(
      AssetsDocument,
      {},
    );

    return JSON.stringify(data, null, 2);
  });

  return data;
};
