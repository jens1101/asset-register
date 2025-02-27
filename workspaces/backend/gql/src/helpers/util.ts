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

/**
 * Helper function for GQL resolvers. This automatically handles uncaught errors
 * and defects, runs the specified effect as a promise, and converts any promise
 * rejections into a `GraphQLError` instance.
 * @param defectMessage The message to use when a defect occurs. This gets
 * logged and used as message for the `GraphQLError` instance. This makes it
 * easier to reference the error in the logs at a later stage.
 */
export const resolverWrapper =
  (defectMessage: string) =>
  <A, E>(effect: Effect.Effect<A, E>) =>
    pipe(
      effect,
      Effect.tapErrorCause((cause) => Effect.logError(defectMessage, cause)),
      Effect.catchAllCause(Effect.die),
      Effect.runPromise,
      (result) =>
        result.catch(() => Promise.reject(new GraphQLError(defectMessage))),
    );
