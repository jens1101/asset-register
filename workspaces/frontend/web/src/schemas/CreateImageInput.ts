import type { CreateImageInput as CreateImageInputType } from "../gql-client/types/graphql.js";
import { CreateFileInput } from "./CreateFileInput.js";
import { inputMaybe } from "./inputMaybe.js";
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
