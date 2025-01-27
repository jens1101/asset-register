import { dataSource } from "../dataSource.js";
import {
  DataSourceService,
  EntityManagerService,
  QueryRunnerService,
} from "../services/index.js";
import { withQueryRunner } from "./withQueryRunner.js";
import { withQueryRunnerTransaction } from "./withQueryRunnerTransaction.js";
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
