import { initialiseDataSource } from "./dataSource.js";
import "./gql-server/server.js";
import "reflect-metadata";

console.log("Initialising GQL...");

await initialiseDataSource();
console.log("Initialised GQL...");
