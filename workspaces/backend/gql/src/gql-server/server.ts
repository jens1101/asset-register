import { resolvers } from "./resolvers.generated.js";
import { typeDefs } from "./typeDefs.generated.js";
import dedent from "dedent";
import { useServer } from "graphql-ws/lib/use/ws";
import {
  createSchema,
  createYoga,
  useExecutionCancellation,
} from "graphql-yoga";
import { type RequestListener, createServer } from "node:http";
import { WebSocketServer } from "ws";

const yoga = createYoga({
  graphiql: {
    subscriptionsProtocol: "WS",
    defaultTabs: [
      {
        query: dedent`
          query Asset($id: ID!) {
            asset(id: $id) {
              ... on Asset {
                id
                name
                description
                filename
                images {
                  id
                  file
                  filename
                  mimeType
                  name
                  description
                  createdAt
                  updatedAt
                }
                proofOfPurchase {
                  createdAt
                  file
                  filename
                  id
                  mimeType
                  updatedAt
                }
              }
              ... on AssetError {
                __typename
                message
              }
            }
          }
        `,
        variables: dedent`
          {
            "id": 1
          }
        `,
      },
    ],
  },
  schema: createSchema({ typeDefs, resolvers }),
  plugins: [useExecutionCancellation()],
});

const server = createServer(yoga as RequestListener);
const webSocketServer = new WebSocketServer({
  server,
  path: yoga.graphqlEndpoint,
});

useServer(
  {
    onSubscribe: async (context, message) => {
      // Subscriptions are handled differently from regular queries or
      // mutations. This is because they are upgraded to a websocket connection.
      // This means that the initial context needs to be manually created below.

      // Construct a standard request object from the Node.js request. In the
      //  future, a
      //  [built-in function](https://github.com/nodejs/node/issues/42529)
      //  could make this easier.
      const initialRequest = context.extra.request;
      const headers = new Headers({
        ...(message.payload.extensions?.["headers"] as Record<string, string>),
        ...(initialRequest.headers as Record<string, string>),
      });
      const request = new Request(
        new URL(
          initialRequest.url as string,
          `http://localhost:${process.env.GQL_SERVER_PORT}`,
        ),
        {
          headers: headers,
          method: initialRequest.method as string,
        },
      );

      const { schema, execute, subscribe, contextFactory, parse, validate } =
        yoga.getEnveloped({
          ...context,
          request,
          params: message.payload,
        });

      const args = {
        schema,
        operationName: message.payload.operationName,
        document: parse(message.payload.query),
        variableValues: message.payload.variables,
        contextValue: await contextFactory(),
        execute,
        subscribe,
      };

      const errors = validate(args.schema, args.document);
      if (errors.length) return errors;
      return args;
    },
  },
  webSocketServer,
);

server.listen(process.env.GQL_SERVER_PORT);
