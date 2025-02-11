import type { Schema } from "effect";

export type TaggedScalarSchema<Tag extends string> = Schema.TaggedStruct<
  Tag,
  { value: Schema.Schema<string> }
>;
