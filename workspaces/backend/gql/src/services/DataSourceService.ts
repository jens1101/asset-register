import { ServiceName } from "../enums/ServiceName.js";
import { Context } from "effect";
import type { DataSource } from "typeorm";

export class DataSourceService extends Context.Tag(ServiceName.DataSource)<
  DataSourceService,
  DataSource
>() {}
