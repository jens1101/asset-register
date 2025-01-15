import { initialiseDataSource } from "./dataSource.js";
import { initServer } from "./gql-server/server.js";

await initialiseDataSource();
initServer(process.env.GQL_SERVER_PORT);
