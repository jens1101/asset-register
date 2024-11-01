import { client } from "./gql-client/client.js";
import {
  ExamplesDocument,
  type ExamplesQuery,
  type ExamplesQueryVariables,
} from "./gql-client/types/graphql.js";

const { data } = await client.query<ExamplesQuery, ExamplesQueryVariables>(
  ExamplesDocument,
  {
    filter: {
      name: "example",
    },
  },
);

console.log(data?.examples);
