import { DATA_SOURCE_INIT_RETRIES } from "./config.ts";
import { entities } from "./entities/index.ts";
import { migrations } from "./migrations/index.ts";
import retry from "retry";
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

/**
 * Initialise the app's data source using exponential backoff. This is the
 * recommended approach to initialise a data source since it might not always
 * be immediately available.
 * @throws {AggregateError} When the maximum number of retries has been reached.
 */
export function initialiseDataSource(): Promise<DataSource> {
  const operation = retry.operation({
    retries: DATA_SOURCE_INIT_RETRIES,
  });

  return new Promise<DataSource>((resolve, reject) => {
    operation.attempt((currentAttempt) => {
      dataSource
        .initialize()
        .then(resolve)
        .catch((error: unknown) => {
          if (operation.retry(error instanceof Error ? error : undefined)) {
            return;
          }

          const aggregateError = new AggregateError(
            operation.errors(),
            `Connection to data source failed after ${currentAttempt} attempts`,
          );

          reject(aggregateError);
        });
    });
  });
}
