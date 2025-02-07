import {
  ScalarFromTemporalInstant,
  type TemporalInstantScalar,
} from "@app/common/scalars/TemporalInstant";
import {
  ScalarFromUint8Array,
  type Uint8ArrayScalar,
} from "@app/common/scalars/Uint8Array";
import { CombinedError, type Exchange } from "@urql/core";
import { Schema } from "effect";
import { GraphQLError } from "graphql";
import { Temporal } from "temporal-polyfill";
import { walkStep } from "walkjs";
import { map, pipe } from "wonka";

type TaggedScalar = TemporalInstantScalar | Uint8ArrayScalar;

function decodeScalar(scalar: TaggedScalar) {
  switch (scalar._tag) {
    case "TemporalInstant":
      return Schema.decodeSync(ScalarFromTemporalInstant)(scalar);
    case "Uint8Array":
      return Schema.decodeSync(ScalarFromUint8Array)(scalar);
  }
}

export const taggedScalarExchange: Exchange = ({ forward }) => {
  return (operations$) => {
    const operationResult$ = forward(
      pipe(
        operations$,
        map((operation) => {
          if (!operation.variables) {
            return operation;
          }

          // TODO: how to handle errors?
          for (const node of walkStep(operation.variables)) {
            const value: unknown = node.val;

            if (value instanceof Uint8Array) {
              if (!node.parent?.val || !node.key) {
                continue;
              }

              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              node.parent.val[node.key] =
                Schema.encodeSync(ScalarFromUint8Array)(value);

              continue;
            }

            if (value instanceof Temporal.Instant) {
              if (!node.parent?.val || !node.key) {
                continue;
              }

              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              node.parent.val[node.key] = Schema.encodeSync(
                ScalarFromTemporalInstant,
              )(value);

              continue;
            }
          }

          return operation;
        }),
      ),
    );

    return pipe(
      operationResult$,
      map((operationResult) => {
        if (!operationResult.data) {
          return operationResult;
        }

        try {
          for (const node of walkStep(operationResult.data)) {
            if (node.nodeType === "value") {
              continue;
            }

            const value: unknown = node.val;

            if (
              !(
                value &&
                typeof value === "object" &&
                "_tag" in value &&
                typeof value._tag === "string" &&
                "value" in value &&
                typeof value.value === "string"
              )
            ) {
              continue;
            }

            const scalar = {
              _tag: value._tag,
              value: value.value,
            } as TaggedScalar;

            if (!node.parent?.val || !node.key) {
              continue;
            }

            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            node.parent.val[node.key] = decodeScalar(scalar);
          }
        } catch (error) {
          const originalError = operationResult.error;

          const graphQLErrors = [
            new GraphQLError("Error while decoding tagged scalars", {
              ...(error instanceof Error && { originalError: error }),
            }),
          ];

          if (originalError?.graphQLErrors) {
            graphQLErrors.push(...originalError.graphQLErrors);
          }

          const input: ConstructorParameters<typeof CombinedError>[0] = {
            graphQLErrors,
          };

          if (originalError?.networkError) {
            input.networkError = originalError.networkError;
          }

          if (originalError?.response) {
            input.response = originalError.response as unknown;
          }

          operationResult.error = new CombinedError(input);
        }

        return operationResult;
      }),
    );
  };
};
