import { initialiseDataSource } from "./dataSource.ts";
import { initServer } from "./gql-server/server.ts";

await initialiseDataSource();
initServer(process.env.GQL_SERVER_PORT);
