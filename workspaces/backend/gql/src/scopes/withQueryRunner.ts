import { DataSourceService } from "../services/index.ts";
import { Effect, pipe } from "effect";

export const withQueryRunner = Effect.acquireRelease(
  pipe(
    DataSourceService,
    Effect.andThen((dataSource) =>
      Effect.tryPromise(async () => {
        const queryRunner = dataSource.createQueryRunner();
        await queryRunner.connect();
        return queryRunner;
      }),
    ),
    Effect.orDieWith(
      (error) => new Error("Failed to acquire query runner", { cause: error }),
    ),
  ),
  (queryRunner) =>
    Effect.orDieWith(
      Effect.tryPromise(() => queryRunner.release()),
      (error) => new Error("Failed to release query runner", { cause: error }),
    ),
);
