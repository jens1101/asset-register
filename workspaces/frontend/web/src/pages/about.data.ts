import { client } from "../gql-client/client.js";
import {
  ExamplesDocument,
  type ExamplesQuery,
  type ExamplesQueryVariables,
} from "../gql-client/types/graphql.js";
import type { RoutePreloadFunc } from "@solidjs/router";
import { type Resource, createResource } from "solid-js";

export type AboutData = Resource<string>;

export const loadAbout: RoutePreloadFunc<AboutData> = () => {
  const [data] = createResource(async () => {
    const { data } = await client.query<ExamplesQuery, ExamplesQueryVariables>(
      ExamplesDocument,
      {
        filter: {
          name: "example",
        },
      },
    );

    return data?.examples.name ?? "default";
  });

  return data;
};
