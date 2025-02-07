import {
  type Asset,
  type Document,
  DocumentEntity,
} from "../entities/index.js";
import { DeleteDocumentError } from "../errors/DeleteDocumentError.js";
import type {
  DeleteDocumentInput,
  MutateDocumentInput,
  UpdateDocumentInput,
} from "../gql-server/types.generated.js";
import { deleteDocument, saveDocument } from "./document.js";
import { saveFile } from "./file.js";
import { entityManagerWapper } from "./util.js";
import { Effect, Option, pipe } from "effect";
import type { FindOptionsWhere } from "typeorm";

export const readProofOfPurchase = ({
  where,
}: {
  where: FindOptionsWhere<Document> | FindOptionsWhere<Document>[];
}) =>
  pipe(
    entityManagerWapper({
      evaluate: (manager) => manager.findOne(DocumentEntity, { where }),
      onError: (error) => Effect.die(error),
    }),
    Effect.map(Option.fromNullable),
  );

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
