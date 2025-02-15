import {
  bigDecimalScalar,
  temporalInstantScalar,
  uint8ArrayScalar,
} from "@app/scalars";
import { walk } from "@app/walker";
import { type Exchange } from "@urql/core";
import { Effect, Option, Schema, pipe } from "effect";
import {
  fromPromise as wonkaFromPromise,
  mergeMap as wonkaMergeMap,
  pipe as wonkaPipe,
} from "wonka";

/** A union schema of all the tagged scalars used in this GQL API. */
const taggedScalarsSchema = Schema.Union(
  bigDecimalScalar.typeFromScalar,
  temporalInstantScalar.typeFromScalar,
  uint8ArrayScalar.typeFromScalar,
);

export const taggedScalarExchange: Exchange = ({ forward }) => {
  return (operations$) => {
    // Encode the tagged scalars within the operation variables.
    const operationResult$ = forward(
      wonkaPipe(
        operations$,
        wonkaMergeMap((operation) =>
          pipe(
            operation,
            async (operation) => {
              const operationVariables = { variables: operation.variables };

              for (const node of walk(operationVariables)) {
                if (node.isPrimitive) continue;
                if (Option.isNone(node.parentInfo)) continue;

                const encodedValue = await pipe(
                  node.value,
                  Schema.encodeUnknown(taggedScalarsSchema),
                  Effect.option,
                  Effect.runPromise,
                );

                if (Option.isNone(encodedValue)) continue;

                const { parentNode, childKey } = node.parentInfo.value;

                node.skipDescendants();
                parentNode.value[childKey] = encodedValue.value;
              }

              operation.variables = operationVariables.variables;
              return operation;
            },
            wonkaFromPromise,
          ),
        ),
      ),
    );

    // Decode the tagged scalars within the operation result data.
    return wonkaPipe(
      operationResult$,
      wonkaMergeMap((operationResult) =>
        pipe(
          operationResult,
          async (operationResult) => {
            const operationData = { data: operationResult.data as unknown };

            for (const node of walk(operationData)) {
              if (node.isPrimitive) continue;
              if (Option.isNone(node.parentInfo)) continue;

              const decodedValue = await pipe(
                node.value,
                Schema.decodeUnknown(taggedScalarsSchema),
                Effect.option,
                Effect.runPromise,
              );

              if (Option.isNone(decodedValue)) continue;

              const { parentNode, childKey } = node.parentInfo.value;

              node.skipDescendants();
              parentNode.value[childKey] = decodedValue.value;
            }

            operationResult.data = operationData.data;
            return operationResult;
          },
          wonkaFromPromise,
        ),
      ),
    );
  };
};
