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

export const taggedScalarExchange: Exchange = ({ forward }) => {
  return (operations$) => {
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
