import type { CreateFileInput as CreateFileInputType } from "../gql-client/graphql.generated.ts";
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
            `Failed to decode form File with error: ${String(error)}`,
          ),
      }),
    encode: (to, _options, ast) =>
      Effect.try({
        try: () => new File([to.buffer], to.filename, { type: to.mimeType }),
        catch: (error) =>
          new ParseResult.Type(
            ast,
            to,
            `Failed to encode to File with error: ${String(error)}`,
          ),
      }),
  },
);
