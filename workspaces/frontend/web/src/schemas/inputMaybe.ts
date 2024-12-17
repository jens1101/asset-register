import { Schema } from "effect";

export function inputMaybe<Member extends Schema.Schema.All>(schema: Member) {
  return Schema.optionalWith(Schema.Union(Schema.Null, schema), {
    exact: true,
  });
}
