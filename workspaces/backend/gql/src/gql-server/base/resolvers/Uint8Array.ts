import {
  ScalarFromUint8Array,
  Uint8ArrayFromAst,
  type Uint8ArrayScalar,
  tag,
} from "@app/common/scalars/Uint8Array";
import { Schema } from "effect";
import { GraphQLError, GraphQLScalarType } from "graphql";

export const Uint8Array = new GraphQLScalarType<Uint8Array, Uint8ArrayScalar>({
  name: tag,
  serialize(value) {
    try {
      return Schema.encodeUnknownSync(ScalarFromUint8Array)(value);
    } catch (error) {
      throw new GraphQLError(
        `${tag} can only serialise instances of "Uint8Array".`,
        {
          ...(error instanceof Error && { originalError: error }),
        },
      );
    }
  },
  parseValue(value) {
    try {
      return Schema.decodeUnknownSync(ScalarFromUint8Array)(value);
    } catch (error) {
      throw new GraphQLError(
        `${tag} can only parse valid "Uint8ArrayScalar" shaped objects.`,
        {
          ...(error instanceof Error && { originalError: error }),
        },
      );
    }
  },
  parseLiteral(node) {
    try {
      return Schema.decodeUnknownSync(Uint8ArrayFromAst)(node);
    } catch (error) {
      throw new GraphQLError(
        `${tag} can only parse valid "Uint8ArrayScalar" shaped objects.`,
        {
          ...(error instanceof Error && { originalError: error }),
          nodes: node,
        },
      );
    }
  },
});
