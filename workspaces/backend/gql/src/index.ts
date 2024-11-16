import { initialiseDataSource } from "./dataSource.js";
import "./gql-server/server.js";
import "reflect-metadata";

await initialiseDataSource();
