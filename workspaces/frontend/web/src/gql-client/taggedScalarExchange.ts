import {
  ScalarFromTemporalInstant,
  type TemporalInstantScalar,
} from "@app/common/scalars/TemporalInstant";
import {
  ScalarFromUint8Array,
  type Uint8ArrayScalar,
} from "@app/common/scalars/Uint8Array";
import type { Exchange } from "@urql/core";
import { Schema } from "effect";
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
    const operationResult$ = forward(operations$);
    return pipe(
      operationResult$,
      map((operationResult) => {
        if (!operationResult.data) {
          return operationResult;
        }

        // TODO: catch and handle errors. Probably want to add any errors to the operationResult.error object
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

        return operationResult;
      }),
    );
  };
};
