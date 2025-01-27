import { type Document, DocumentEntity } from "../entities/index.js";
import { entityManagerWapper } from "./util.js";
import { Effect } from "effect";

export const deleteDocument = (input: Document) =>
  entityManagerWapper({
    evaluate: (manager) => manager.remove(DocumentEntity, input),
    onError: (error) => Effect.die(error),
  });

export const saveDocument = (input: Partial<Document>) =>
  entityManagerWapper({
    evaluate: (manager) =>
      manager.save(DocumentEntity, input) as Promise<Document>,
    onError: (error) => Effect.die(error),
  });
