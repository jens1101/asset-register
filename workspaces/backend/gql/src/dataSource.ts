import {
  DATA_SOURCE_INIT_DURATION,
  DATA_SOURCE_INIT_RETRIES,
} from "./config.ts";
import { entities } from "./entities/index.ts";
import { migrations } from "./migrations/index.ts";
import { Effect, Schedule, pipe } from "effect";
import { DataSource } from "typeorm";

export const dataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  logging: process.env.ENABLE_DB_LOGGING === "true",
  entities,
  migrations,
  subscribers: [],
});

/** Initialise the app's data source using exponential backoff with jitter. */
export const initialiseDataSource = pipe(
  Effect.tryPromise(() => dataSource.initialize()),
  Effect.retry(
    Schedule.intersect(
      Schedule.jittered(Schedule.exponential(DATA_SOURCE_INIT_DURATION)),
      Schedule.recurs(DATA_SOURCE_INIT_RETRIES),
    ),
  ),
);
