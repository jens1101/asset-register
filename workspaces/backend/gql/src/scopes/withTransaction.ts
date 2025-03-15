import { dataSource } from "../dataSource.ts";
import {
  DataSourceService,
  EntityManagerService,
  QueryRunnerService,
} from "../services/index.ts";
import { withQueryRunner } from "./withQueryRunner.ts";
import { withQueryRunnerTransaction } from "./withQueryRunnerTransaction.ts";
import { Effect, pipe } from "effect";

export const withTransaction = <A, E>(
  effect: Effect.Effect<A, E, EntityManagerService>,
) =>
  pipe(
    effect,
    Effect.provideServiceEffect(
      EntityManagerService,
      Effect.map(
        withQueryRunnerTransaction,
        (queryRunner) => queryRunner.manager,
      ),
    ),
    Effect.provideServiceEffect(QueryRunnerService, withQueryRunner),
    Effect.provideService(DataSourceService, dataSource),
    Effect.scoped,
  );
