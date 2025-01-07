import { type Asset, DocumentEntity, FileEntity } from "../entities/index.js";
import type {
  DeleteDocumentInput,
  MutateDocumentInput,
  UpdateDocumentInput,
} from "../gql-server/types.generated.js";
import { EntityManagerService } from "../services/index.js";
import { Effect } from "effect";

export const mutateProofOfPurchase = (
  asset: Asset,
  input: MutateDocumentInput,
): Effect.Effect<Asset, Error, EntityManagerService> =>
  Effect.gen(function* () {
    if (input.update) return yield* updateProofOfPurchase(asset, input.update);
    return yield* deleteProofOfPurchase(asset, input.delete);
  });

const updateProofOfPurchase = (
  asset: Asset,
  input: UpdateDocumentInput,
): Effect.Effect<Asset, Error, EntityManagerService> =>
  Effect.gen(function* () {
    const manager = yield* EntityManagerService;

    if (asset.proofOfPurchase) {
      const proofOfPurchase = asset.proofOfPurchase;

      yield* Effect.tryPromise({
        try: async () => {
          await manager.remove(DocumentEntity, proofOfPurchase);
          await manager.remove(FileEntity, proofOfPurchase.file);
        },
        catch: (error) => new Error(String(error)),
      });
    }

    asset.proofOfPurchase = yield* Effect.tryPromise({
      try: async () =>
        manager.save(DocumentEntity, {
          asset,
          file: await manager.save(FileEntity, input.file),
        }),
      catch: (error) => new Error(String(error)),
    });

    return asset;
  });

const deleteProofOfPurchase = (
  asset: Asset,
  input: DeleteDocumentInput,
): Effect.Effect<Asset, Error, EntityManagerService> =>
  Effect.gen(function* () {
    if (
      !asset.proofOfPurchase?.id ||
      Number(input.id) !== asset.proofOfPurchase.id
    ) {
      return yield* Effect.fail(
        new Error(`Proof of purchase with ID ${input.id} not found in asset`),
      );
    }

    const manager = yield* EntityManagerService;
    const proofOfPurchase = asset.proofOfPurchase;

    yield* Effect.tryPromise({
      try: async () => {
        await manager.remove(DocumentEntity, proofOfPurchase);
        await manager.remove(FileEntity, proofOfPurchase.file);
      },
      catch: (error) => new Error(String(error)),
    });

    asset.proofOfPurchase = null;
    return asset;
  });
