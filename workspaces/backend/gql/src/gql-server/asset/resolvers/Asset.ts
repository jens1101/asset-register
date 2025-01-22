import { dataSource } from "../../../dataSource.js";
import { readMainImage } from "../../../helpers/image.js";
import { withTransaction } from "../../../scopes/index.js";
import {
  DataSourceService,
  EntityManagerService,
} from "../../../services/index.js";
import type { AssetResolvers } from "./../../types.generated.js";
import { Effect, Exit, Option, pipe } from "effect";
import { GraphQLError } from "graphql";

export const Asset: AssetResolvers = {
  mainImage: (parent) =>
    Effect.runPromiseExit(
      pipe(
        readMainImage(Number(parent.id)),
        Effect.provideServiceEffect(EntityManagerService, withTransaction),
        Effect.provideService(DataSourceService, dataSource),
        Effect.scoped,
        Effect.map((mainImage) => Option.getOrNull(mainImage)),
      ),
    ).then((exit) =>
      Exit.match(exit, {
        onSuccess: (value) => value,
        onFailure(cause) {
          Effect.logError("Failed to read main image", cause);
          return Promise.reject(new GraphQLError("Failed to read main image"));
        },
      }),
    ),
};
