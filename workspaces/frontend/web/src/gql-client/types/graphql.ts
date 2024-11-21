/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** Represents the Node `Buffer` type */
  Byte: { input: string; output: string };
  /** RFC 3339 compliant date-time string. */
  DateTime: { input: string; output: string };
  /** Represents the absence of a value */
  Void: { input: void; output: void };
};

export type Asset = {
  __typename?: "Asset";
  createdAt: Scalars["DateTime"]["output"];
  description?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  images: Array<Image>;
  name: Scalars["String"]["output"];
  proofOfPurchase?: Maybe<Document>;
  updatedAt: Scalars["DateTime"]["output"];
};

export type AssetError = Error & {
  __typename?: "AssetError";
  message: Scalars["String"]["output"];
};

export type AssetResponse = Asset | AssetError;

export type CreateDocumentInput = {
  file: CreeateFileInput;
};

export type CreateImageInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  file: CreeateFileInput;
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type CreeateAssetInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  images?: InputMaybe<Array<CreateImageInput>>;
  name: Scalars["String"]["input"];
  proofOfPurchase?: InputMaybe<CreateDocumentInput>;
};

export type CreeateFileInput = {
  buffer: Scalars["Byte"]["input"];
  filename: Scalars["String"]["input"];
  mimeType: Scalars["String"]["input"];
};

export type Document = {
  __typename?: "Document";
  asset: Asset;
  createdAt: Scalars["DateTime"]["output"];
  file: File;
  id: Scalars["ID"]["output"];
};

/** A generic error interface. */
export type Error = {
  message: Scalars["String"]["output"];
};

export type File = {
  __typename?: "File";
  buffer: Scalars["Byte"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  filename: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  mimeType: Scalars["String"]["output"];
};

export type Image = {
  __typename?: "Image";
  asset: Asset;
  createdAt: Scalars["DateTime"]["output"];
  description?: Maybe<Scalars["String"]["output"]>;
  file: File;
  id: Scalars["ID"]["output"];
  name?: Maybe<Scalars["String"]["output"]>;
};

export type ImageError = Error & {
  __typename?: "ImageError";
  message: Scalars["String"]["output"];
};

export type ImageResponse = Image | ImageError;

export type Mutation = {
  __typename?: "Mutation";
  addAssetImages: AssetResponse;
  createAsset: AssetResponse;
  deleteAsset?: Maybe<Scalars["Void"]["output"]>;
  deleteAssetImages: AssetResponse;
  deleteProofOfPurchase: AssetResponse;
  replaceProofOfPurchase: AssetResponse;
  updateAsset: AssetResponse;
  updateImage: ImageResponse;
};

export type MutationAddAssetImagesArgs = {
  id: Scalars["ID"]["input"];
  images: Array<CreateImageInput>;
};

export type MutationCreateAssetArgs = {
  data: CreeateAssetInput;
};

export type MutationDeleteAssetArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteAssetImagesArgs = {
  id: Scalars["ID"]["input"];
  imageIds?: InputMaybe<Array<Scalars["ID"]["input"]>>;
};

export type MutationDeleteProofOfPurchaseArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationReplaceProofOfPurchaseArgs = {
  id: Scalars["ID"]["input"];
  proofOfPurchase: CreateDocumentInput;
};

export type MutationUpdateAssetArgs = {
  data: UpdateAssetInput;
};

export type MutationUpdateImageArgs = {
  data: UpdateImageInput;
};

export type Query = {
  __typename?: "Query";
  asset: AssetResponse;
  assets: Array<AssetResponse>;
};

export type QueryAssetArgs = {
  id: Scalars["ID"]["input"];
};

export type UpdateAssetInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["ID"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateImageInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["ID"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
  previousImageId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type CreateAssetMutationVariables = Exact<{
  data: CreeateAssetInput;
}>;

export type CreateAssetMutation = {
  __typename?: "Mutation";
  createAsset:
    | {
        __typename?: "Asset";
        id: string;
        name: string;
        description?: string | null;
        createdAt: string;
        updatedAt: string;
        images: Array<{
          __typename?: "Image";
          id: string;
          name?: string | null;
          createdAt: string;
          description?: string | null;
          file: { __typename?: "File"; filename: string; mimeType: string };
        }>;
        proofOfPurchase?: {
          __typename?: "Document";
          id: string;
          createdAt: string;
          file: { __typename?: "File"; filename: string; mimeType: string };
        } | null;
      }
    | { __typename?: "AssetError" };
};

export type AssetsQueryVariables = Exact<{ [key: string]: never }>;

export type AssetsQuery = {
  __typename?: "Query";
  assets: Array<
    | {
        __typename?: "Asset";
        id: string;
        name: string;
        description?: string | null;
        createdAt: string;
        proofOfPurchase?: {
          __typename?: "Document";
          id: string;
          createdAt: string;
          file: {
            __typename?: "File";
            filename: string;
            mimeType: string;
            id: string;
          };
        } | null;
        images: Array<{
          __typename?: "Image";
          id: string;
          createdAt: string;
          name?: string | null;
          file: {
            __typename?: "File";
            filename: string;
            id: string;
            mimeType: string;
          };
        }>;
      }
    | { __typename?: "AssetError" }
  >;
};

export const CreateAssetDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateAsset" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CreeateAssetInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createAsset" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "data" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: { kind: "Name", value: "Asset" },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "description" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "createdAt" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "updatedAt" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "images" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "file" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "filename" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "mimeType" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "createdAt" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "description" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "proofOfPurchase" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "file" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "filename" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "mimeType" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "createdAt" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateAssetMutation, CreateAssetMutationVariables>;
export const AssetsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Assets" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "assets" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: { kind: "Name", value: "Asset" },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "description" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "createdAt" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "proofOfPurchase" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "createdAt" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "file" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "filename" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "mimeType" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "id" },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "images" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "createdAt" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "file" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "filename" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "id" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "mimeType" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AssetsQuery, AssetsQueryVariables>;
