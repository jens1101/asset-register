import { initialiseDataSource } from "./dataSource.ts";
import { initServer } from "./gql-server/server.ts";
import { Effect, pipe } from "effect";

await pipe(
  initialiseDataSource,
  Effect.andThen(
    Effect.try(() => {
      initServer(process.env.GQL_SERVER_PORT);
    }),
  ),
  Effect.tapErrorCause(Effect.logError),
  Effect.runPromise,
);
