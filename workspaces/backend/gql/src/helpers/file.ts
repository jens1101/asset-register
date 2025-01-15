import { type File, FileEntity } from "../entities/index.js";
import { DeleteFileError } from "../errors/DeleteFileError.js";
import { SaveFileError } from "../errors/SaveFileError.js";
import { EntityManagerService } from "../services/EntityManagerService.js";
import { Effect } from "effect";

export const deleteFile = (input: File) =>
  Effect.gen(function* () {
    const manager = yield* EntityManagerService;

    yield* Effect.tryPromise({
      try: async () => manager.remove(FileEntity, input),
      catch: (cause) =>
        new DeleteFileError({
          message: "Failed to delete file",
          options: { cause, input },
        }),
    });
  });

export const saveFile = (input: Partial<File>) =>
  Effect.gen(function* () {
    const manager = yield* EntityManagerService;

    return yield* Effect.tryPromise({
      try: async () => (await manager.save(FileEntity, input)) as File,
      catch: (cause) =>
        new SaveFileError({
          message: "Failed to save file",
          options: { cause, input },
        }),
    });
  });
