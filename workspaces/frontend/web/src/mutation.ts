import { client } from "./gql-client/client.js";
import {
  CreateExampleDocument,
  type CreateExampleMutation,
  type CreateExampleMutationVariables,
} from "./gql-client/types/graphql.js";

const { data } = await client.mutation<
  CreateExampleMutation,
  CreateExampleMutationVariables
>(CreateExampleDocument, {
  name: "example",
});

console.log(data?.createExample);
