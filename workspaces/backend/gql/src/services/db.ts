import { ServiceName } from "../enums/service.js";
import { Context, Effect, Exit, pipe } from "effect";
import type { DataSource, EntityManager, QueryRunner } from "typeorm";

export class DataSourceService extends Context.Tag(ServiceName.DataSource)<
  DataSourceService,
  DataSource
>() {}

export class EntityManagerService extends Context.Tag(
  ServiceName.EntityManager,
)<EntityManagerService, EntityManager>() {}

class QueryRunnerService extends Context.Tag(ServiceName.QueryRunner)<
  QueryRunnerService,
  QueryRunner
>() {}

const useQueryRunner = Effect.acquireRelease(
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

const useQueryRunnerTransaction = Effect.acquireRelease(
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

export const useTransaction = pipe(
  useQueryRunnerTransaction,
  Effect.map((queryRunner) => queryRunner.manager),
  Effect.provideServiceEffect(QueryRunnerService, useQueryRunner),
);
