import { decode as decodeFormData } from "decode-formdata";
import { Effect, ParseResult, Schema } from "effect";

export const AssetFormValues = Schema.Struct({
  id: Schema.optional(Schema.NonEmptyString),
  name: Schema.NonEmptyString,
  description: Schema.String,
  proofOfPurchase: Schema.optional(
    Schema.Struct({
      id: Schema.optional(Schema.NonEmptyString),
      file: Schema.optional(Schema.instanceOf(File)),
    }),
  ),
  images: Schema.Array(
    Schema.Struct({
      id: Schema.optional(Schema.NonEmptyString),
      name: Schema.String,
      description: Schema.String,
      file: Schema.instanceOf(File),
    }),
  ),
}).annotations({
  identifier: "AssetFormValues",
  title: "Asset form values",
});

export const AssetFormValuesFromFormData = Schema.transformOrFail(
  Schema.instanceOf(FormData),
  AssetFormValues,
  {
    strict: true,
    decode: (from, _options, ast) =>
      Effect.try({
        try: () =>
          decodeFormData<typeof AssetFormValues.Type>(from, {
            arrays: ["images"],
            files: ["proofOfPurchase.file", "images.$.file"],
          }),
        catch: (error) =>
          new ParseResult.Type(
            ast,
            from,
            `Failed to decode form data with error: ${String(error)}`,
          ),
      }),
    encode: (to, _options, ast) =>
      ParseResult.fail(
        new ParseResult.Forbidden(ast, to, "Cannot encode to FormData"),
      ),
  },
);
