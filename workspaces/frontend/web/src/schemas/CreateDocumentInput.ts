import type { CreateDocumentInput as CreateDocumentInputType } from "../gql-client/types/graphql.js";
import { CreateFileInput } from "./CreateFileInput.js";
import { Schema } from "effect";

export const CreateDocumentInput: Schema.Schema<CreateDocumentInputType> =
  Schema.Struct({
    file: CreateFileInput,
  }).annotations({
    identifier: "CreateDocumentInput",
    title: "Create document input",
  });
