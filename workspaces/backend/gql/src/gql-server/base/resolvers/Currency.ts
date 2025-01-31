import { runSyncWrapper } from "../../../helpers/util.js";
import {
  CurrencyFromAst,
  type CurrencyScalar,
  ScalarFromCurrency,
  tag,
} from "@app/common/scalars/Currency";
import { Schema } from "effect";
import { GraphQLScalarType } from "graphql";

export const Currency = new GraphQLScalarType<string, CurrencyScalar>({
  name: tag,
  serialize: (value) =>
    runSyncWrapper(
      Schema.encodeUnknown(ScalarFromCurrency)(value),
      `${tag} can only serialise instances of "string".`,
    ),
  parseValue: (value) =>
    runSyncWrapper(
      Schema.decodeUnknown(ScalarFromCurrency)(value),
      `${tag} can only parse valid "CurrencyScalar" shaped objects.`,
    ),
  parseLiteral: (node) =>
    runSyncWrapper(
      Schema.decodeUnknown(CurrencyFromAst)(node),
      `${tag} can only parse valid "CurrencyScalar" shaped objects.`,
    ),
});
