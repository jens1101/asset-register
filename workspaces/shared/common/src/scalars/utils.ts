import { Effect, ParseResult, Schema } from "effect";
import { Kind } from "graphql";

type TaggedScalarSchema<Tag extends string> = Schema.TaggedStruct<
  Tag,
  { value: Schema.Schema<string> }
>;

export function makeScalarSchema<Tag extends string>(
  tag: Tag,
  value: Schema.Schema<string>,
): TaggedScalarSchema<Tag> {
  return Schema.TaggedStruct(tag, {
    value,
  });
}

export function TaggedScalarFromAst<Tag extends string>(
  TaggedScalarSchema: TaggedScalarSchema<Tag>,
  tag: Tag,
) {
  return Schema.transformOrFail(Schema.Unknown, TaggedScalarSchema, {
    strict: true,
    decode: (from, _options, ast) =>
      Effect.mapError(
        getTaggedScalar<Tag>(from, tag),
        (error) => new ParseResult.Type(ast, from, error.message),
      ),
    encode: (to, _options, ast) =>
      ParseResult.fail(new ParseResult.Type(ast, to, "Cannot encode to AST")),
  });
}

function getTaggedScalar<Tag extends string>(
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
