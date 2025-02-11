import {
  bigDecimalScalar,
  temporalInstantScalar,
  uint8ArrayScalar,
} from "@app/scalars";
import { type Exchange } from "@urql/core";
import { Option, Schema, pipe } from "effect";
import { walkStep } from "walkjs";
import { map, pipe as wonkaPipe } from "wonka";

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
        map((operation) => {
          if (!operation.variables) return operation;

          const operationVariables = { variables: operation.variables };

          for (const node of walkStep(operationVariables, {
            graphMode: "graph",
          })) {
            pipe(
              Option.some(node),
              // The root node can always be skipped since it just exists as a
              // container for the variables.
              Option.filter((node) => !node.isRoot),
              Option.flatMap((node) =>
                Schema.encodeUnknownOption(taggedScalarsSchema)(node.val),
              ),
              Option.andThen((value) => {
                if (node.parent?.val && node.key) {
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                  node.parent.val[node.key] = value;
                }
              }),
            );
          }

          operation.variables = operationVariables.variables;
          return operation;
        }),
      ),
    );

    // Decode the tagged scalars within the operation result data.
    return wonkaPipe(
      operationResult$,
      map((operationResult) => {
        if (!operationResult.data) return operationResult;

        const operationData = { data: operationResult.data as unknown };

        for (const node of walkStep(operationData)) {
          pipe(
            Option.some(node),
            // - The root node can always be skipped since it just exists as a
            //   container for the data.
            // - Tagged scalars are always objects, so we can skip any node
            //   that's a primitive value.
            Option.filter((node) => !node.isRoot && node.nodeType !== "value"),
            Option.flatMap((node) =>
              Schema.decodeUnknownOption(taggedScalarsSchema)(node.val),
            ),
            Option.andThen((value) => {
              if (node.parent?.val && node.key) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                node.parent.val[node.key] = value;
              }
            }),
          );
        }

        operationResult.data = operationData.data;
        return operationResult;
      }),
    );
  };
};
