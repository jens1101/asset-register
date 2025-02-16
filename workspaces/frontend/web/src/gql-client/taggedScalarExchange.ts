import { type TaggedScalar } from "@app/scalars";
import { walk } from "@app/walker";
import { type Exchange } from "@urql/core";
import { Effect, Option, Schema, pipe } from "effect";
import {
  fromPromise as wonkaFromPromise,
  mergeMap as wonkaMergeMap,
  pipe as wonkaPipe,
} from "wonka";

/**
 * Helper function for the common tasks that need to be done as part of both
 * encoding and decoding GQL data.
 * Note that this function mutates the original data that's passed in.
 * @param data The target data that needs to be processed
 * @param codeValue A function that codes the data in the necessary manner.
 * @returns The original data with the necessary mutations applied to it.
 */
async function codeData<T, A, E>(
  data: T,
  codeValue: (value: unknown) => Effect.Effect<A, E>,
) {
  for (const node of walk(data)) {
    if (node.isPrimitive) continue;
    if (Option.isNone(node.parentInfo)) continue;

    const codedValue = await pipe(
      node.value,
      codeValue,
      Effect.option,
      Effect.runPromise,
    );

    if (Option.isNone(codedValue)) continue;

    const { parentNode, childKey } = node.parentInfo.value;

    node.skipDescendants();
    parentNode.value[childKey] = codedValue.value;
  }

  return data;
}

/**
 * This exchange takes in a list of tagged scalars and will automatically endode
 * and decode them.
 */
export const taggedScalarExchange = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...scalars: TaggedScalar<any, any>[]
): Exchange => {
  const taggedScalarsSchema = Schema.Union(
    ...scalars.map((scalar) => scalar.typeFromScalar),
  );

  return ({ forward }) =>
    (operations$) => {
      // Encode the tagged scalars within the operation variables.
      const operationResult$ = forward(
        wonkaPipe(
          operations$,
          wonkaMergeMap((operation) =>
            wonkaFromPromise(
              codeData(
                { variables: operation.variables },
                Schema.encodeUnknown(taggedScalarsSchema),
              ).then(({ variables }) => {
                operation.variables = variables;
                return operation;
              }),
            ),
          ),
        ),
      );

      // Decode the tagged scalars within the operation result data.
      return wonkaPipe(
        operationResult$,
        wonkaMergeMap((operationResult) =>
          wonkaFromPromise(
            codeData(
              { data: operationResult.data as unknown },
              Schema.decodeUnknown(taggedScalarsSchema),
            ).then(({ data }) => {
              operationResult.data = data;
              return operationResult;
            }),
          ),
        ),
      );
    };
};
