import { entities } from "./entities/index.js";
import { migrations } from "./migrations/index.js";
import retry from "retry";
import { DataSource } from "typeorm";

const appDataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  logging: process.env.ENABLE_DB_LOGGING === "true",
  // TODO: I don't think this is a good idea...
  synchronize: true,
  entities,
  migrations,
  subscribers: [],
  // TODO: I don't think this is a good idea...
  migrationsRun: true,
});

/**
 * Initialise the app's data source using exponential backoff. This is the
 * recommended approach to initialise a data source since it might not always
 * be immediately available.
 * @throws {AggregateError} When the maximum number of retries has been reached.
 */
export function initialiseDataSource(): Promise<DataSource> {
  const operation = retry.operation();

  return new Promise<DataSource>((resolve, reject) => {
    operation.attempt((currentAttempt) => {
      appDataSource
        .initialize()
        .then(resolve)
        .catch((error) => {
          if (operation.retry(error)) {
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
