import type { TaggedScalarSchema } from "./TaggedScalarSchema.js";
import { Effect, ParseResult, Schema, pipe } from "effect";
import { GraphQLError, Kind } from "graphql";

export function makeTaggedScalarSchema<Tag extends string>(
  tag: Tag,
  value: Schema.Schema<string>,
): TaggedScalarSchema<Tag> {
  return Schema.TaggedStruct(tag, {
    value,
  });
}

export const taggedScalarFromAst = <Tag extends string>(
  TaggedScalarSchema: TaggedScalarSchema<Tag>,
  tag: Tag,
) =>
  Schema.transformOrFail(Schema.Unknown, TaggedScalarSchema, {
    strict: true,
    decode: (from, _options, ast) =>
      Effect.mapError(
        getTaggedScalarFromAst<Tag>(from, tag),
        (error) => new ParseResult.Type(ast, from, error.message),
      ),
    encode: (to, _options, ast) =>
      ParseResult.fail(new ParseResult.Type(ast, to, "Cannot encode to AST")),
  });

export const stringScalarFromAst = Schema.transformOrFail(
  Schema.Unknown,
  Schema.String,
  {
    strict: true,
    decode: (from, _options, ast) =>
      pipe(
        from,
        getStringScalarFromAst,
        Effect.mapError(
          (error) => new ParseResult.Type(ast, from, error.message),
        ),
      ),
    encode: (to, _options, ast) =>
      ParseResult.fail(new ParseResult.Type(ast, to, "Cannot encode to AST")),
  },
);

function getStringScalarFromAst(ast: unknown): Effect.Effect<string, Error> {
  if (!(ast && typeof ast === "object" && "value" in ast)) {
    return Effect.fail(new Error("Missing value property"));
  }

  const value = ast["value"];

  if (typeof value !== "string") {
    return Effect.fail(new Error("Value is not a string"));
  }

  return Effect.succeed(value);
}

function getTaggedScalarFromAst<Tag extends string>(
  ast: unknown,
  tag: Tag,
): Effect.Effect<TaggedScalarSchema<Tag>["Type"], Error> {
  if (!(ast && typeof ast === "object" && "fields" in ast)) {
    return Effect.fail(new Error("Missing fields property"));
  }

  const fields = ast["fields"];

  if (!Array.isArray(fields)) {
    return Effect.fail(new Error("fields is not an Array"));
  }

  if (fields.length !== 2) {
    return Effect.fail(new Error("fields doesn't have a length of 2"));
  }

  const tagField: unknown = fields[0];

  if (
    !(
      tagField &&
      typeof tagField === "object" &&
      "name" in tagField &&
      tagField.name &&
      typeof tagField.name === "object" &&
      "value" in tagField.name &&
      tagField.name.value === "_tag" &&
      "value" in tagField &&
      tagField.value &&
      typeof tagField.value === "object" &&
      "kind" in tagField.value &&
      tagField.value.kind === Kind.STRING &&
      "value" in tagField.value &&
      tagField.value.value === tag
    )
  ) {
    return Effect.fail(new Error("Invaid tag field"));
  }

  const valueField: unknown = fields[1];

  if (
    !(
      valueField &&
      typeof valueField === "object" &&
      "name" in valueField &&
      valueField.name &&
      typeof valueField.name === "object" &&
      "value" in valueField.name &&
      valueField.name.value === "_type" &&
      "value" in valueField &&
      valueField.value &&
      typeof valueField.value === "object" &&
      "kind" in valueField.value &&
      valueField.value.kind === Kind.STRING &&
      "value" in valueField.value &&
      typeof valueField.value.value === "string"
    )
  ) {
    return Effect.fail(new Error("Invaid value field"));
  }

  const scalar = {
    _tag: tag,
    value: valueField.value.value,
  };

  return Effect.succeed(scalar);
}

/**
 * A wrapper that will syncronously run the given effect. If a defect or
 * uncaught error occurs then this dies with a `GraphQLError`.
 */
export const gqlServerRun = <A, E>(
  effect: Effect.Effect<A, E>,
  defectMessage: string,
) =>
  pipe(
    effect,
    Effect.catchAllCause((cause) =>
      pipe(
        Effect.logError(defectMessage, cause),
        Effect.andThen(Effect.die(new GraphQLError(defectMessage))),
      ),
    ),
    Effect.runSync,
  );
