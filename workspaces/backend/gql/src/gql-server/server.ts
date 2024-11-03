import { resolvers } from "./resolvers.generated.js";
import { typeDefs } from "./typeDefs.generated.js";
import { useServer } from "graphql-ws/lib/use/ws";
import {
  createSchema,
  createYoga,
  useExecutionCancellation,
} from "graphql-yoga";
import { type RequestListener, createServer } from "node:http";
import { WebSocketServer } from "ws";

const GQL_SERVER_PORT = 5000;

const yoga = createYoga({
  graphiql: {
    subscriptionsProtocol: "WS",
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
          `http://localhost:${GQL_SERVER_PORT}`,
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

server.listen(GQL_SERVER_PORT);
