import {
  type Asset,
  type Document,
  DocumentEntity,
} from "../entities/index.ts";
import { DeleteDocumentError } from "../errors/DeleteDocumentError.ts";
import type {
  DeleteDocumentInput,
  MutateDocumentInput,
  UpdateDocumentInput,
} from "../gql-server/types.generated.ts";
import { deleteDocument, saveDocument } from "./document.ts";
import { saveFile } from "./file.ts";
import { entityManagerWapper } from "./util.ts";
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
    asset.proofOfPurchase = undefined;
    return asset;
  });
