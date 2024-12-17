import type { CreateAssetInput as CreateAssetInputType } from "../gql-client/types/graphql.js";
import { CreateDocumentInput } from "./CreateDocumentInput.js";
import { CreateImageInput } from "./CreateImageInput.js";
import { inputMaybe } from "./inputMaybe.js";
import { Schema } from "effect";

export const CreateAssetInput: Schema.Schema<CreateAssetInputType> =
  Schema.Struct({
    name: Schema.NonEmptyString,
    description: inputMaybe(Schema.NonEmptyString),
    proofOfPurchase: inputMaybe(CreateDocumentInput),
    images: inputMaybe(Schema.mutable(Schema.Array(CreateImageInput))),
  }).annotations({
    identifier: "CreateAssetInput",
    name: "Create asset input",
  });
