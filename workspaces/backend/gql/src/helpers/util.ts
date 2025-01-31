import { EntityManagerService } from "../services/index.js";
import { Effect, pipe } from "effect";
import { GraphQLError } from "graphql";
import { type EntityManager, EntityNotFoundError } from "typeorm";

/**
 * Effective wrapper of the entity manager. This will asyncronously run the
 * `evaluate` callback, catch any errors, and map them via the `onError`
 * callback.
 */
export const entityManagerWapper = <A, E, R, B = never>({
  evaluate,
  onError,
}: {
  evaluate: (manager: EntityManager) => PromiseLike<A>;
  onError: (error: unknown) => Effect.Effect<B, E, R>;
}) =>
  pipe(
    EntityManagerService,
    Effect.andThen((manager) =>
      Effect.tryPromise({
        try: () => evaluate(manager),
        catch: (cause) => cause,
      }),
    ),
    Effect.catchAll((error) => onError(error)),
  );

/**
 * Effective wrapper of the `findOneOrFail` function. This will asyncronously
 * run the `evaluate` callback (which should use `findOneOrFail`), catch the
 * `EntityNotFoundError` error, and map it using the `onError` callback. Any
 * other errors will result in a defect.
 */
export const findOneOrFailWrapper = <A, E, R, B = never>(options: {
  evaluate: (manager: EntityManager) => PromiseLike<A>;
  onError: (error: EntityNotFoundError) => Effect.Effect<B, E, R>;
}) =>
  entityManagerWapper({
    evaluate: options.evaluate,
    onError: (error) =>
      error instanceof EntityNotFoundError
        ? options.onError(error)
        : Effect.die(error),
  });

export const resolverWrapper = <A, E>(
  effect: Effect.Effect<A, E>,
  defectMessage: string,
) =>
  pipe(
    effect,
    Effect.catchAllCause((cause) =>
      pipe(
        Effect.logError(defectMessage, cause),
        Effect.andThen(Effect.die(cause)),
      ),
    ),
    Effect.runPromise,
    (result) =>
      result.catch(() => Promise.reject(new GraphQLError(defectMessage))),
  );

export const runSyncWrapper = <A, E>(
  effect: Effect.Effect<A, E>,
  defectMessage: string,
) =>
  pipe(
    effect,
    Effect.catchAllCause((cause) =>
      pipe(
        Effect.logError(defectMessage, cause),
        Effect.andThen(Effect.die(new GraphQLError(defectMessage))),
      ),
    ),
    Effect.runSync,
  );
