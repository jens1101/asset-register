import type { CreateImageInput as CreateImageInputType } from "../gql-client/graphql.generated.ts";
import { CreateFileInput } from "./CreateFileInput.ts";
import { inputMaybe } from "./inputMaybe.ts";
import { Schema } from "effect";

export const CreateImageInput: Schema.Schema<CreateImageInputType> =
  Schema.Struct({
    name: inputMaybe(Schema.NonEmptyString),
    description: inputMaybe(Schema.NonEmptyString),
    file: CreateFileInput,
  }).annotations({
    identifier: "CreateImageInput",
    title: "Create image input",
  });
