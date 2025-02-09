import {
  type BigDecimalScalar,
  ScalarFromBigDecimal,
} from "@app/common/scalars/BigDecimal";
import {
  ScalarFromTemporalInstant,
  type TemporalInstantScalar,
} from "@app/common/scalars/TemporalInstant";
import {
  ScalarFromUint8Array,
  type Uint8ArrayScalar,
} from "@app/common/scalars/Uint8Array";
import { CombinedError, type Exchange } from "@urql/core";
import { BigDecimal, Schema } from "effect";
import { GraphQLError } from "graphql";
import { Temporal } from "temporal-polyfill";
import { type NodeVisitationRegister, type WalkNode, walkStep } from "walkjs";
import { map, pipe } from "wonka";

class VisitationRegister implements NodeVisitationRegister {
  readonly #seenObjects: Set<unknown> = new Set<unknown>();

  public objectHasBeenSeen(node: WalkNode): boolean {
    return this.#seenObjects.has(node.val);
  }

  public registerObjectVisit(node: WalkNode): void {
    this.#seenObjects.add(node.val);
  }
}

type TaggedScalar = TemporalInstantScalar | Uint8ArrayScalar | BigDecimalScalar;

function decodeScalar(scalar: TaggedScalar) {
  switch (scalar._tag) {
    case "TemporalInstant":
      return Schema.decodeSync(ScalarFromTemporalInstant)(scalar);
    case "Uint8Array":
      return Schema.decodeSync(ScalarFromUint8Array)(scalar);
    case "BigDecimal":
      return Schema.decodeSync(ScalarFromBigDecimal)(scalar);
  }
}

export const taggedScalarExchange: Exchange = ({ forward }) => {
  return (operations$) => {
    const operationResult$ = forward(
      pipe(
        operations$,
        map((operation) => {
          if (!operation.variables) return operation;

          const visitationRegister = new VisitationRegister();

          for (const node of walkStep(
            { variables: operation.variables },
            { graphMode: "graph", visitationRegister },
          )) {
            if (!node.key || !node.parent || node.isRoot) continue;

            if (node.val instanceof Uint8Array) {
              for (const childNode of node.getChildren()) {
                visitationRegister.registerObjectVisit(childNode);
              }

              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              node.parent.val[node.key] = Schema.encodeSync(
                ScalarFromUint8Array,
              )(node.val);

              continue;
            }

            if (node.val instanceof Temporal.Instant) {
              for (const childNode of node.getChildren()) {
                visitationRegister.registerObjectVisit(childNode);
              }

              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              node.parent.val[node.key] = Schema.encodeSync(
                ScalarFromTemporalInstant,
              )(node.val);

              continue;
            }

            if (BigDecimal.isBigDecimal(node.val)) {
              for (const childNode of node.getChildren()) {
                visitationRegister.registerObjectVisit(childNode);
              }

              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              node.parent.val[node.key] = Schema.encodeSync(
                ScalarFromBigDecimal,
              )(node.val);

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
