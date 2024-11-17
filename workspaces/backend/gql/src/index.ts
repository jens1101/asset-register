import { initialiseDataSource } from "./dataSource.js";
import { initServer } from "./gql-server/server.js";
import "reflect-metadata";

await initialiseDataSource();
initServer(process.env.GQL_SERVER_PORT);
