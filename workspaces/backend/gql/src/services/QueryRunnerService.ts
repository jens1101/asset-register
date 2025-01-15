import { ServiceName } from "../enums/ServiceName.js";
import { Context } from "effect";
import type { QueryRunner } from "typeorm";

export class QueryRunnerService extends Context.Tag(ServiceName.QueryRunner)<
  QueryRunnerService,
  QueryRunner
>() {}
