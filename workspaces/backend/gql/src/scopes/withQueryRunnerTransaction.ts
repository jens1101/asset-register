import { QueryRunnerService } from "../services/index.ts";
import { Effect, Exit, pipe } from "effect";

export const withQueryRunnerTransaction = Effect.acquireRelease(
  pipe(
    QueryRunnerService,
    Effect.andThen((queryRunner) =>
      Effect.tryPromise(async () => {
        await queryRunner.startTransaction();
        return queryRunner;
      }),
    ),
    Effect.orDieWith(
      (error) => new Error("Failed to start transaction", { cause: error }),
    ),
  ),
  (queryRunner, exit) =>
    Exit.matchEffect(exit, {
      onSuccess: () =>
        Effect.orDieWith(
          Effect.tryPromise(() => queryRunner.commitTransaction()),
          (error) =>
            new Error("Failed to commit transaction", { cause: error }),
        ),
      onFailure: () =>
        Effect.orDieWith(
          Effect.tryPromise(() => queryRunner.rollbackTransaction()),
          (error) =>
            new Error("Failed to roll back transaction", { cause: error }),
        ),
    }),
);
