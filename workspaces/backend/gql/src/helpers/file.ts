import { type File, FileEntity } from "../entities/index.ts";
import { entityManagerWapper } from "./util.ts";
import { Effect } from "effect";

export const deleteFile = (input: File) =>
  entityManagerWapper({
    evaluate: (manager) => manager.remove(FileEntity, input),
    onError: (error) => Effect.die(error),
  });

export const saveFile = (input: Partial<File>) =>
  entityManagerWapper({
    evaluate: (manager) => manager.save(FileEntity, input) as Promise<File>,
    onError: (error) => Effect.die(error),
  });
