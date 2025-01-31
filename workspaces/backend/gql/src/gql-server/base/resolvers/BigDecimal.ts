import { runSyncWrapper } from "../../../helpers/util.js";
import {
  BigDecimalFromAst,
  type BigDecimalScalar,
  ScalarFromBigDecimal,
  tag,
} from "@app/common/scalars/BigDecimal";
import { Schema, BigDecimal as _BigDecimal } from "effect";
import { GraphQLScalarType } from "graphql";

export const BigDecimal = new GraphQLScalarType<
  _BigDecimal.BigDecimal,
  BigDecimalScalar
>({
  name: tag,
  serialize: (value) =>
    runSyncWrapper(
      Schema.encodeUnknown(ScalarFromBigDecimal)(value),
      `${tag} can only serialise instances of "BigDecimal".`,
    ),
  parseValue: (value) =>
    runSyncWrapper(
      Schema.decodeUnknown(ScalarFromBigDecimal)(value),
      `${tag} can only parse valid "BigDecimalScalar" shaped objects.`,
    ),
  parseLiteral: (node) =>
    runSyncWrapper(
      Schema.decodeUnknown(BigDecimalFromAst)(node),
      `${tag} can only parse valid "BigDecimalScalar" shaped objects.`,
    ),
});
