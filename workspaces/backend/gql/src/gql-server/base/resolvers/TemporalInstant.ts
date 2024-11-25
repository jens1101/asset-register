import {
  ScalarFromTemporalInstant,
  TemporalInstantFromAst,
  type TemporalInstantScalar,
  tag,
} from "@app/common/scalars/TemporalInstant";
import { Schema } from "effect";
import { GraphQLError, GraphQLScalarType } from "graphql";
import type { Temporal } from "temporal-polyfill";

export const TemporalInstant = new GraphQLScalarType<
  Temporal.Instant,
  TemporalInstantScalar
>({
  name: tag,
  serialize(value): TemporalInstantScalar {
    try {
      return Schema.encodeUnknownSync(ScalarFromTemporalInstant)(value);
    } catch (error) {
      throw new GraphQLError(
        `${tag} can only serialise instances of "Temporal.Instant".`,
        {
          ...(error instanceof Error && { originalError: error }),
        },
      );
    }
  },
  parseValue(value): Temporal.Instant {
    try {
      return Schema.decodeUnknownSync(ScalarFromTemporalInstant)(value);
    } catch (error) {
      throw new GraphQLError(
        `${tag} can only parse valid "TemporalInstantScalar" shaped objects.`,
        {
          ...(error instanceof Error && { originalError: error }),
        },
      );
    }
  },
  parseLiteral(node): Temporal.Instant {
    try {
      return Schema.decodeUnknownSync(TemporalInstantFromAst)(node);
    } catch (error) {
      throw new GraphQLError(
        `${tag} can only parse valid "TemporalInstantScalar" shaped objects.`,
        {
          ...(error instanceof Error && { originalError: error }),
          nodes: node,
        },
      );
    }
  },
});
