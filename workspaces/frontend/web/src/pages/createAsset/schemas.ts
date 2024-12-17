import { CreateAssetInput } from "../../schemas/CreateAssetInput.js";
import { CreateDocumentInput } from "../../schemas/CreateDocumentInput.js";
import { CreateFileInputFromFile } from "../../schemas/CreateFileInput.js";
import { CreateImageInput } from "../../schemas/CreateImageInput.js";
import { decode as decodeFormData } from "decode-formdata";
import { Effect, ParseResult, Schema } from "effect";

const AssetForm = Schema.Struct({
  name: Schema.NonEmptyString,
  description: Schema.String,
  proofOfPurchase: Schema.optional(Schema.instanceOf(File)),
  images: Schema.Array(
    Schema.Struct({
      name: Schema.NonEmptyString,
      description: Schema.String,
      file: Schema.instanceOf(File),
    }),
  ),
}).annotations({
  identifier: "AssetForm",
  title: "Asset form values",
});

export const AssetFormFromFormData = Schema.transformOrFail(
  Schema.instanceOf(FormData),
  AssetForm,
  {
    strict: true,
    decode: (from, _options, ast) =>
      Effect.try({
        try: () =>
          decodeFormData<typeof AssetForm.Type>(from, {
            arrays: ["images"],
            files: ["proofOfPurchase", "images.$.file"],
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

export const CreateAssetInputFromAssetForm = Schema.transformOrFail(
  AssetForm,
  CreateAssetInput,
  {
    strict: true,
    decode: (from, _options, ast) =>
      Effect.mapError(
        Effect.gen(function* () {
          const images: typeof CreateAssetInput.Type.images = [];

          for (const image of from.images) {
            images.push(
              yield* Schema.decode(CreateImageInput)({
                name: image.name || null,
                description: image.description || null,
                file: yield* Schema.decode(CreateFileInputFromFile)(image.file),
              }),
            );
          }

          return {
            name: from.name,
            description: from.description || null,
            images,
            proofOfPurchase: !from.proofOfPurchase
              ? null
              : yield* Schema.decode(CreateDocumentInput)({
                  file: yield* Schema.decode(CreateFileInputFromFile)(
                    from.proofOfPurchase,
                  ),
                }),
          };
        }),
        (error) => new ParseResult.Type(ast, from, error.message),
      ),
    encode: (to, _options, ast) =>
      ParseResult.fail(
        new ParseResult.Forbidden(ast, to, "Cannot encode to AssetForm"),
      ),
  },
);
