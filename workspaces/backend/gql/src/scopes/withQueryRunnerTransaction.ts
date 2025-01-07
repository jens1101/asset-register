import { QueryRunnerService } from "../services/index.js";
import { Effect, Exit } from "effect";

export const withQueryRunnerTransaction = Effect.acquireRelease(
  Effect.gen(function* () {
    const queryRunner = yield* QueryRunnerService;

    yield* Effect.tryPromise({
      try: () => queryRunner.startTransaction(),
      // TODO: error handling
      catch: (error) => new Error(String(error)),
    });

    return queryRunner;
  }),
  (queryRunner, exit) =>
    Exit.matchEffect(exit, {
      onSuccess: () =>
        Effect.orElse(
          Effect.tryPromise(async () => queryRunner.commitTransaction()),
          Effect.log,
        ),
      onFailure: () =>
        Effect.orElse(
          Effect.tryPromise(async () => queryRunner.rollbackTransaction()),
          Effect.log,
        ),
    }),
);
