import type { ScalarName } from "./ScalarName.js";
import { gqlServerRun, stringScalarFromAst } from "./utils.js";
import { Schema } from "effect";
import { GraphQLScalarType } from "graphql";

export class StringScalar<Tag extends ScalarName> {
  name: Tag;
  /** The schema for this scalar */
  schema: Schema.Schema<string>;
  /** Schema that can transform from an abstract syntax tree to a this schema */
  fromAst: Schema.Schema<string, unknown>;
  /**
   * An instance of `GraphQLScalarType`. Used to easily add this scalar to a GQL
   * server.
   */
  gqlServerScalar: GraphQLScalarType<string, string>;

  constructor({ name, schema }: { name: Tag; schema: Schema.Schema<string> }) {
    this.name = name;
    this.schema = schema;
    this.fromAst = Schema.compose(stringScalarFromAst, this.schema);
    this.gqlServerScalar = new GraphQLScalarType({
      name: this.name,
      serialize: (value) =>
        gqlServerRun(
          Schema.encodeUnknown(this.schema)(value),
          `${this.name}: failed to serialize value`,
        ),
      parseValue: (value) =>
        gqlServerRun(
          Schema.decodeUnknown(this.schema)(value),
          `${this.name}: failed to parse value`,
        ),
      parseLiteral: (node) =>
        gqlServerRun(
          Schema.decodeUnknown(this.fromAst)(node),
          `${this.name}: failed to parse AST`,
        ),
    });
  }
}
