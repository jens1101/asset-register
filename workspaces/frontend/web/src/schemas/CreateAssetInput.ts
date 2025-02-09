import type { CreateAssetInput as CreateAssetInputType } from "../gql-client/types/graphql.js";
import { AssetFormValues } from "./AssetFormValues.js";
import { CreateDocumentInput } from "./CreateDocumentInput.js";
import { CreateFileInputFromFile } from "./CreateFileInput.js";
import { CreateImageInput } from "./CreateImageInput.js";
import { SumInput, SumInputFromFormValues } from "./SumInput.js";
import { inputMaybe } from "./inputMaybe.js";
import { Effect, ParseResult, Schema } from "effect";

const CreateAssetInput: Schema.Schema<CreateAssetInputType> = Schema.Struct({
  name: Schema.NonEmptyString,
  description: inputMaybe(Schema.NonEmptyString),
  proofOfPurchase: inputMaybe(CreateDocumentInput),
  value: SumInput,
  images: inputMaybe(Schema.mutable(Schema.Array(CreateImageInput))),
}).annotations({
  identifier: "CreateAssetInput",
  name: "Create asset input",
});

export const CreateAssetInputFromAssetFormValues = Schema.transformOrFail(
  AssetFormValues,
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
            proofOfPurchase: !from.proofOfPurchase?.file
              ? null
              : yield* Schema.decode(CreateDocumentInput)({
                  file: yield* Schema.decode(CreateFileInputFromFile)(
                    from.proofOfPurchase.file,
                  ),
                }),
            value: yield* Schema.decode(SumInputFromFormValues)(from.value),
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
