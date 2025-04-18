import type { CreateDocumentInput as CreateDocumentInputType } from "../gql-client/graphql.generated.ts";
import { CreateFileInput } from "./CreateFileInput.ts";
import { Schema } from "effect";

export const CreateDocumentInput: Schema.Schema<CreateDocumentInputType> =
  Schema.Struct({
    file: CreateFileInput,
  }).annotations({
    identifier: "CreateDocumentInput",
    title: "Create document input",
  });
