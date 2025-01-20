import { type Document, DocumentEntity } from "../entities/index.js";
import { DeleteDocumentError } from "../errors/DeleteDocumentError.js";
import { SaveDocumentError } from "../errors/SaveDocumentError.js";
import { EntityManagerService } from "../services/EntityManagerService.js";
import { deleteFile } from "./file.js";
import { Effect } from "effect";

export const deleteDocument = (input: Document) =>
  Effect.gen(function* () {
    const manager = yield* EntityManagerService;

    yield* Effect.tryPromise({
      try: async () => manager.remove(DocumentEntity, input),
      catch: (cause) =>
        new DeleteDocumentError({
          message: "Failed to delete document",
          options: { cause, input },
        }),
    });

    yield* deleteFile(input.file);
  });

export const saveDocument = (input: Partial<Document>) =>
  Effect.gen(function* () {
    const manager = yield* EntityManagerService;

    return yield* Effect.tryPromise({
      try: async () => (await manager.save(DocumentEntity, input)) as Document,
      catch: (cause) =>
        new SaveDocumentError({
          message: "Failed to save document",
          options: { cause, input },
        }),
    });
  });
