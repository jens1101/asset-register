import { taggedScalarExchange } from "./taggedScalarExchange.ts";
import schema from "./types/introspection.ts";
import {
  bigDecimalScalar,
  temporalInstantScalar,
  uint8ArrayScalar,
} from "@app/scalars";
import {
  Client,
  type OperationResult,
  fetchExchange,
  subscriptionExchange,
} from "@urql/core";
import type { FetchBody } from "@urql/core/internal";
import { cacheExchange } from "@urql/exchange-graphcache";
import { Effect, Option, pipe } from "effect";
import { type SubscribePayload, createClient } from "graphql-ws";

const UPSTREAM_GQL_URL = import.meta.env.VITE_UPSTREAM_GQL_URL;

const webSocketClient = createClient({
  url: UPSTREAM_GQL_URL,
  webSocketImpl: WebSocket,
});

const client = new Client({
  url: UPSTREAM_GQL_URL,
  exchanges: [
    taggedScalarExchange(
      bigDecimalScalar,
      temporalInstantScalar,
      uint8ArrayScalar,
    ),
    cacheExchange({
      schema,
      keys: {
        Sum: () => null,
      },
    }),
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

/**
 * Helper function to parse URQL's operation result data.
 * @param result The data to parse
 * @returns An effect with the value of the operation result data. It can fail
 * if either the operation returned an error or when no data is returned. Note
 * that nullable data is handled correctly and will not result in an error.
 */
const parseResult = <
  Data,
  Variables extends Record<string, unknown> | undefined,
>(
  result: OperationResult<Data, Variables>,
) =>
  pipe(
    Effect.succeed(result),
    Effect.flatMap((result) =>
      result.error ? Effect.fail(result.error) : Effect.succeed(result),
    ),
    Effect.flatMap((result) =>
      "data" in result ? Option.some(result.data) : Option.none(),
    ),
  );

/**
 * Create and issue a GraphQL mutation operation.
 * @param args Same arguments as the underlying URQL {@link Client.mutation}.
 * @returns Same return as the {@link parseResult} function.
 */
export const mutation = <
  Data,
  Variables extends Record<string, unknown> | undefined,
>(
  ...args: Parameters<typeof client.mutation<Data, Variables>>
) =>
  pipe(
    Effect.promise(() => client.mutation<Data, Variables>(...args)),
    Effect.andThen(parseResult),
  );

/**
 * Create and issue a GraphQL query operation.
 * @param args Same arguments as the underlying URQL {@link Client.query}.
 * @returns Same return as the {@link parseResult} function.
 */
export const query = <
  Data,
  Variables extends Record<string, unknown> | undefined,
>(
  ...args: Parameters<typeof client.query<Data, Variables>>
) =>
  pipe(
    Effect.promise(() => client.query<Data, Variables>(...args)),
    Effect.andThen(parseResult),
  );
