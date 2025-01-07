import { DataSourceService } from "../services/index.js";
import { Effect } from "effect";

export const withQueryRunner = Effect.acquireRelease(
  Effect.gen(function* () {
    const dataSource = yield* DataSourceService;

    return yield* Effect.tryPromise({
      async try() {
        const queryRunner = dataSource.createQueryRunner();
        await queryRunner.connect();
        return queryRunner;
      },
      // TODO: error handling
      catch: (error) => new Error(String(error)),
    });
  }),
  (queryRunner) =>
    Effect.orElse(
      Effect.tryPromise(async () => queryRunner.release()),
      Effect.log,
    ),
);
