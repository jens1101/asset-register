import { client } from "./gql-client/client.js";
import {
  StreamExamplesDocument,
  type StreamExamplesSubscription,
  type StreamExamplesSubscriptionVariables,
} from "./gql-client/types/graphql.js";

const { unsubscribe } = client
  .subscription<
    StreamExamplesSubscription,
    StreamExamplesSubscriptionVariables
  >(StreamExamplesDocument, {
    filter: {
      name: "example",
    },
  })
  .subscribe(({ data }) => {
    console.log(data?.examples);
  });

setTimeout(() => unsubscribe(), 10_000);
