import { QueryRunnerService } from "../services/index.js";
import { withQueryRunner } from "./withQueryRunner.js";
import { withQueryRunnerTransaction } from "./withQueryRunnerTransaction.js";
import { Effect, pipe } from "effect";

export const withTransaction = pipe(
  withQueryRunnerTransaction,
  Effect.map((queryRunner) => queryRunner.manager),
  Effect.provideServiceEffect(QueryRunnerService, withQueryRunner),
);
