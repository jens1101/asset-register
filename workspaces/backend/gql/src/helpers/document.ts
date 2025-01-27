import { type Document, DocumentEntity } from "../entities/index.js";
import { ReadDocumentError } from "../errors/ReadDocumentError.js";
import { entityManagerWapper, findOneOrFailWrapper } from "./util.js";
import { Effect } from "effect";
import type { FindOptionsRelations, FindOptionsWhere } from "typeorm";

export const readDocument = ({
  where,
  relations,
}: {
  where: FindOptionsWhere<Document>;
  relations?: FindOptionsRelations<Document>;
}) =>
  findOneOrFailWrapper({
    evaluate: (manager) =>
      manager.findOneOrFail(DocumentEntity, {
        where,
        ...(relations && { relations }),
      }),
    onError: (cause) =>
      new ReadDocumentError({
        message: "Unable to read document",
        options: { cause },
      }),
  });

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
