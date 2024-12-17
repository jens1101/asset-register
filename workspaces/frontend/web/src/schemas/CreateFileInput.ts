import type { CreateFileInput as CreateFileInputType } from "../gql-client/types/graphql.js";
import { Effect, ParseResult, Schema } from "effect";

export const CreateFileInput: Schema.Schema<CreateFileInputType> =
  Schema.Struct({
    buffer: Schema.Uint8ArrayFromSelf,
    filename: Schema.NonEmptyString,
    mimeType: Schema.NonEmptyString,
  }).annotations({
    identifier: "CreateFileInput",
    title: "Create file input",
  });

export const CreateFileInputFromFile = Schema.transformOrFail(
  Schema.instanceOf(File),
  CreateFileInput,
  {
    strict: true,
    decode: (from, _options, ast) =>
      Effect.tryPromise({
        try: async () => ({
          buffer: new Uint8Array(await from.arrayBuffer()),
          filename: from.name,
          mimeType: from.type,
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
        new ParseResult.Forbidden(ast, to, "Cannot encode to AssetForm"),
      ),
  },
);
