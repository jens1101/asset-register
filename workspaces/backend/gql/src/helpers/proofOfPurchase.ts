import { type Asset } from "../entities/index.js";
import { DeleteDocumentError } from "../errors/DeleteDocumentError.js";
import type {
  DeleteDocumentInput,
  MutateDocumentInput,
  UpdateDocumentInput,
} from "../gql-server/types.generated.js";
import { deleteDocument, saveDocument } from "./document.js";
import { saveFile } from "./file.js";
import { Effect } from "effect";

export const mutateProofOfPurchase = (
  asset: Asset,
  input: MutateDocumentInput,
) =>
  Effect.gen(function* () {
    if (input.update) return yield* updateProofOfPurchase(asset, input.update);
    return yield* deleteProofOfPurchase(asset, input.delete);
  });

export const updateProofOfPurchase = (
  asset: Asset,
  input: UpdateDocumentInput,
) =>
  Effect.gen(function* () {
    if (asset.proofOfPurchase) yield* deleteDocument(asset.proofOfPurchase);

    asset.proofOfPurchase = yield* saveDocument({
      asset,
      file: yield* saveFile(input.file),
    });

    return asset;
  });

const deleteProofOfPurchase = (asset: Asset, input: DeleteDocumentInput) =>
  Effect.gen(function* () {
    if (Number(input.id) !== asset.proofOfPurchase?.id) {
      return yield* new DeleteDocumentError({
        message: "Proof of purchase not found in asset",
        options: { input },
      });
    }

    yield* deleteDocument(asset.proofOfPurchase);
    asset.proofOfPurchase = null;
    return asset;
  });
