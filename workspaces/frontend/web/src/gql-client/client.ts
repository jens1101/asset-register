import { Client, fetchExchange, subscriptionExchange } from "@urql/core";
import type { FetchBody } from "@urql/core/internal";
import { type SubscribePayload, createClient } from "graphql-ws";

const UPSTREAM_GQL_URL = "http://example.com/graphql";
const ACCESS_TOKEN = "TODO";

const webSocketClient = createClient({
  url: UPSTREAM_GQL_URL,
  webSocketImpl: WebSocket,
});

export const client = new Client({
  url: UPSTREAM_GQL_URL,
  fetchOptions: {
    headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
  },
  exchanges: [
    fetchExchange,
    subscriptionExchange({
      forwardSubscription(request: FetchBody) {
        const payload: SubscribePayload = {
          operationName: request.operationName ?? null,
          query: request.query ?? "",
          variables: request.variables ?? null,
          extensions: {
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`,
              ...request.extensions?.["headers"],
            },
            ...request.extensions,
          },
        };

        return {
          subscribe(sink) {
            const unsubscribe = webSocketClient.subscribe(payload, sink);
            return { unsubscribe };
          },
        };
      },
    }),
  ],
});
