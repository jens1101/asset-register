import type { ScalarName } from "./ScalarName.ts";
import type { TaggedScalarSchema } from "./TaggedScalarSchema.ts";
import {
  gqlServerRun,
  makeTaggedScalarSchema,
  taggedScalarFromAst,
} from "./utils.ts";
import { Schema } from "effect";
import { GraphQLScalarType } from "graphql";

export class TaggedScalar<Tag extends keyof typeof ScalarName, Type> {
  /** The name and tag of this scalar */
  name: Tag;
  /** The schema for this scalar */
  schema: TaggedScalarSchema<Tag>;
  /** Schema that can transform from this scalar to the source type */
  typeFromScalar: Schema.Schema<Type, TaggedScalarSchema<Tag>["Type"]>;
  /**
   * Schema that can transform from an abstract syntax tree to the source type.
   */
  typeFromAst: Schema.Schema<Type, unknown>;
  /**
   * An instance of `GraphQLScalarType`. Used to easily add this scalar to a GQL
   * server.
   */
  gqlServerScalar: GraphQLScalarType<Type, TaggedScalarSchema<Tag>["Type"]>;

  constructor({
    name,
    typeFromStringSchema,
  }: {
    name: Tag;
    typeFromStringSchema: Schema.Schema<Type, string>;
  }) {
    this.name = name;
    this.schema = makeTaggedScalarSchema(this.name, Schema.String);
    this.typeFromScalar = Schema.transform(this.schema, typeFromStringSchema, {
      decode: (scalar) => scalar.value,
      encode: (value) => ({
        _tag: this.name,
        value,
      }),
    });
    this.typeFromAst = Schema.compose(
      taggedScalarFromAst(this.schema, this.name),
      this.typeFromScalar,
    );
    this.gqlServerScalar = new GraphQLScalarType({
      name: this.name,
      serialize: (value) =>
        gqlServerRun(
          Schema.encodeUnknown(this.typeFromScalar)(value),
          `${this.name}: failed to serialize value`,
        ),
      parseValue: (value) =>
        gqlServerRun(
          Schema.decodeUnknown(this.typeFromScalar)(value),
          `${this.name}: failed to parse value`,
        ),
      parseLiteral: (node) =>
        gqlServerRun(
          Schema.decodeUnknown(this.typeFromAst)(node),
          `${this.name}: failed to parse AST`,
        ),
    });
  }
}
