/* eslint-disable */
import * as types from "./graphql.js";
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
  "fragment asset on Asset {\n  __typename\n  id\n  name\n  description\n  createdAt\n  updatedAt\n  proofOfPurchase {\n    ...document\n  }\n  images {\n    ...image\n  }\n}":
    types.AssetFragmentDoc,
  "fragment assetListItem on Asset {\n  __typename\n  id\n  name\n  description\n  createdAt\n  updatedAt\n  images {\n    ...image\n  }\n}":
    types.AssetListItemFragmentDoc,
  "fragment document on Document {\n  __typename\n  id\n  file {\n    ...file\n  }\n  createdAt\n}":
    types.DocumentFragmentDoc,
  "fragment file on File {\n  __typename\n  id\n  buffer\n  filename\n  mimeType\n  createdAt\n}":
    types.FileFragmentDoc,
  "fragment image on Image {\n  __typename\n  id\n  name\n  description\n  file {\n    ...file\n  }\n  createdAt\n  updatedAt\n}":
    types.ImageFragmentDoc,
  "mutation CreateAsset($data: CreateAssetInput!) {\n  createAsset(data: $data) {\n    ... on Asset {\n      ...asset\n    }\n  }\n}":
    types.CreateAssetDocument,
  "mutation DeleteAsset($id: ID!) {\n  deleteAsset(id: $id)\n}":
    types.DeleteAssetDocument,
  "mutation UpdateAsset($data: UpdateAssetInput!) {\n  updateAsset(data: $data) {\n    ... on Asset {\n      ...asset\n    }\n  }\n}":
    types.UpdateAssetDocument,
  "query Asset($id: ID!) {\n  asset(id: $id) {\n    ... on Asset {\n      ...asset\n    }\n  }\n}":
    types.AssetDocument,
  "query AssetList {\n  assets {\n    ... on Asset {\n      ...assetListItem\n    }\n  }\n}":
    types.AssetListDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "fragment asset on Asset {\n  __typename\n  id\n  name\n  description\n  createdAt\n  updatedAt\n  proofOfPurchase {\n    ...document\n  }\n  images {\n    ...image\n  }\n}",
): (typeof documents)["fragment asset on Asset {\n  __typename\n  id\n  name\n  description\n  createdAt\n  updatedAt\n  proofOfPurchase {\n    ...document\n  }\n  images {\n    ...image\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "fragment assetListItem on Asset {\n  __typename\n  id\n  name\n  description\n  createdAt\n  updatedAt\n  images {\n    ...image\n  }\n}",
): (typeof documents)["fragment assetListItem on Asset {\n  __typename\n  id\n  name\n  description\n  createdAt\n  updatedAt\n  images {\n    ...image\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "fragment document on Document {\n  __typename\n  id\n  file {\n    ...file\n  }\n  createdAt\n}",
): (typeof documents)["fragment document on Document {\n  __typename\n  id\n  file {\n    ...file\n  }\n  createdAt\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "fragment file on File {\n  __typename\n  id\n  buffer\n  filename\n  mimeType\n  createdAt\n}",
): (typeof documents)["fragment file on File {\n  __typename\n  id\n  buffer\n  filename\n  mimeType\n  createdAt\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "fragment image on Image {\n  __typename\n  id\n  name\n  description\n  file {\n    ...file\n  }\n  createdAt\n  updatedAt\n}",
): (typeof documents)["fragment image on Image {\n  __typename\n  id\n  name\n  description\n  file {\n    ...file\n  }\n  createdAt\n  updatedAt\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation CreateAsset($data: CreateAssetInput!) {\n  createAsset(data: $data) {\n    ... on Asset {\n      ...asset\n    }\n  }\n}",
): (typeof documents)["mutation CreateAsset($data: CreateAssetInput!) {\n  createAsset(data: $data) {\n    ... on Asset {\n      ...asset\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation DeleteAsset($id: ID!) {\n  deleteAsset(id: $id)\n}",
): (typeof documents)["mutation DeleteAsset($id: ID!) {\n  deleteAsset(id: $id)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation UpdateAsset($data: UpdateAssetInput!) {\n  updateAsset(data: $data) {\n    ... on Asset {\n      ...asset\n    }\n  }\n}",
): (typeof documents)["mutation UpdateAsset($data: UpdateAssetInput!) {\n  updateAsset(data: $data) {\n    ... on Asset {\n      ...asset\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query Asset($id: ID!) {\n  asset(id: $id) {\n    ... on Asset {\n      ...asset\n    }\n  }\n}",
): (typeof documents)["query Asset($id: ID!) {\n  asset(id: $id) {\n    ... on Asset {\n      ...asset\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query AssetList {\n  assets {\n    ... on Asset {\n      ...assetListItem\n    }\n  }\n}",
): (typeof documents)["query AssetList {\n  assets {\n    ... on Asset {\n      ...assetListItem\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
