import { ServiceName } from "../enums/ServiceName.ts";
import { Context } from "effect";
import type { EntityManager } from "typeorm";

export class EntityManagerService extends Context.Tag(
  ServiceName.EntityManager,
)<EntityManagerService, EntityManager>() {}
