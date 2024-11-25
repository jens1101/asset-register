import { taggedScalarExchange } from "./taggedScalarExchange.js";
import { Client, fetchExchange, subscriptionExchange } from "@urql/core";
import type { FetchBody } from "@urql/core/internal";
import { type SubscribePayload, createClient } from "graphql-ws";

const UPSTREAM_GQL_URL = import.meta.env.VITE_UPSTREAM_GQL_URL;

const webSocketClient = createClient({
  url: UPSTREAM_GQL_URL,
  webSocketImpl: WebSocket,
});

export const client = new Client({
  url: UPSTREAM_GQL_URL,
  exchanges: [
    taggedScalarExchange,
    fetchExchange,
    subscriptionExchange({
      forwardSubscription(request: FetchBody) {
        const payload: SubscribePayload = {
          operationName: request.operationName ?? null,
          query: request.query ?? "",
          variables: request.variables ?? null,
          extensions: request.extensions ?? {},
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
