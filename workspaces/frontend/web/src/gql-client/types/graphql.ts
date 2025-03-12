/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
import type { BigDecimal } from "effect";
import type { Temporal } from "temporal-polyfill";

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
  BigDecimal: { input: BigDecimal.BigDecimal; output: BigDecimal.BigDecimal };
  Currency: { input: string; output: string };
  NonEmptyTrimmedString: { input: string; output: string };
  TemporalInstant: { input: Temporal.Instant; output: Temporal.Instant };
  TrimmedString: { input: string; output: string };
  Uint8Array: { input: Uint8Array; output: Uint8Array };
};

export type Asset = {
  __typename?: "Asset";
  createdAt: Scalars["TemporalInstant"]["output"];
  description?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  images: Array<Image>;
  mainImage?: Maybe<Image>;
  name: Scalars["NonEmptyTrimmedString"]["output"];
  proofOfPurchase?: Maybe<Document>;
  updatedAt: Scalars["TemporalInstant"]["output"];
  value: Sum;
};

export type CreateAssetInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  images?: InputMaybe<Array<CreateImageInput>>;
  name: Scalars["NonEmptyTrimmedString"]["input"];
  proofOfPurchase?: InputMaybe<CreateDocumentInput>;
  value: SumInput;
};

export type CreateDocumentInput = {
  file: CreateFileInput;
};

export type CreateFileInput = {
  buffer: Scalars["Uint8Array"]["input"];
  filename: Scalars["String"]["input"];
  mimeType: Scalars["String"]["input"];
};

export type CreateImageInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  file: CreateFileInput;
  name?: InputMaybe<Scalars["TrimmedString"]["input"]>;
  previousImageId?: InputMaybe<Scalars["ID"]["input"]>;
};

/**
 * Occurs when attempting to delete a document from an asset that doesn't own the
 * document.
 */
export type DeleteDocumentError = Error & {
  __typename?: "DeleteDocumentError";
  message: Scalars["String"]["output"];
};

export type DeleteDocumentInput = {
  id: Scalars["ID"]["input"];
};

export type DeleteImageInput = {
  id: Scalars["ID"]["input"];
};

export type Document = {
  __typename?: "Document";
  asset: Asset;
  createdAt: Scalars["TemporalInstant"]["output"];
  file: File;
  id: Scalars["ID"]["output"];
};

export type Error = {
  message: Scalars["String"]["output"];
};

export type File = {
  __typename?: "File";
  buffer: Scalars["Uint8Array"]["output"];
  createdAt: Scalars["TemporalInstant"]["output"];
  filename: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  mimeType: Scalars["String"]["output"];
};

export type Image = {
  __typename?: "Image";
  asset: Asset;
  createdAt: Scalars["TemporalInstant"]["output"];
  description?: Maybe<Scalars["String"]["output"]>;
  file: File;
  id: Scalars["ID"]["output"];
  name?: Maybe<Scalars["TrimmedString"]["output"]>;
  updatedAt: Scalars["TemporalInstant"]["output"];
};

/** Occurs when an image was not found in the asset's list of images */
export type ImageNotFoundError = Error & {
  __typename?: "ImageNotFoundError";
  message: Scalars["String"]["output"];
};

export type MutateDocumentInput =
  | { delete: DeleteDocumentInput; update?: never }
  | { delete?: never; update: UpdateDocumentInput };

export type MutateImageInput =
  | { create: CreateImageInput; delete?: never; update?: never }
  | { create?: never; delete: DeleteImageInput; update?: never }
  | { create?: never; delete?: never; update: UpdateImageInput };

export type Mutation = {
  __typename?: "Mutation";
  createAsset: Asset;
  deleteAsset?: Maybe<ReadAssetError>;
  updateAsset: UpdateAssetResponse;
};

export type MutationCreateAssetArgs = {
  data: CreateAssetInput;
};

export type MutationDeleteAssetArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationUpdateAssetArgs = {
  data: UpdateAssetInput;
};

export type Query = {
  __typename?: "Query";
  asset: ReadAssetResponse;
  assets: Array<Asset>;
};

export type QueryAssetArgs = {
  id: Scalars["ID"]["input"];
};

/** Occurs when the specified asset could not be found in the database */
export type ReadAssetError = Error & {
  __typename?: "ReadAssetError";
  message: Scalars["String"]["output"];
};

export type ReadAssetResponse = Asset | ReadAssetError;

export type Sum = {
  __typename?: "Sum";
  amount: Scalars["BigDecimal"]["output"];
  currency: Scalars["Currency"]["output"];
};

export type SumInput = {
  amount: Scalars["BigDecimal"]["input"];
  currency: Scalars["Currency"]["input"];
};

export type UpdateAssetInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["ID"]["input"];
  images?: InputMaybe<Array<MutateImageInput>>;
  name?: InputMaybe<Scalars["NonEmptyTrimmedString"]["input"]>;
  proofOfPurchase?: InputMaybe<MutateDocumentInput>;
  value?: InputMaybe<SumInput>;
};

export type UpdateAssetResponse =
  | Asset
  | DeleteDocumentError
  | ImageNotFoundError
  | ReadAssetError;

export type UpdateDocumentInput = {
  file: CreateFileInput;
};

export type UpdateImageInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  file?: InputMaybe<CreateFileInput>;
  id: Scalars["ID"]["input"];
  name?: InputMaybe<Scalars["TrimmedString"]["input"]>;
  previousImageId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type AssetFragment = {
  __typename: "Asset";
  id: string;
  name: string;
  description?: string | null;
  createdAt: Temporal.Instant;
  updatedAt: Temporal.Instant;
  value: {
    __typename?: "Sum";
    currency: string;
    amount: BigDecimal.BigDecimal;
  };
  proofOfPurchase?: {
    __typename: "Document";
    id: string;
    createdAt: Temporal.Instant;
    file: {
      __typename: "File";
      id: string;
      buffer: Uint8Array;
      filename: string;
      mimeType: string;
      createdAt: Temporal.Instant;
    };
  } | null;
  images: Array<{
    __typename: "Image";
    id: string;
    name?: string | null;
    description?: string | null;
    createdAt: Temporal.Instant;
    updatedAt: Temporal.Instant;
    file: {
      __typename: "File";
      id: string;
      buffer: Uint8Array;
      filename: string;
      mimeType: string;
      createdAt: Temporal.Instant;
    };
  }>;
};

export type AssetListItemFragment = {
  __typename: "Asset";
  id: string;
  name: string;
  description?: string | null;
  value: {
    __typename?: "Sum";
    currency: string;
    amount: BigDecimal.BigDecimal;
  };
  mainImage?: {
    __typename: "Image";
    id: string;
    name?: string | null;
    description?: string | null;
    createdAt: Temporal.Instant;
    updatedAt: Temporal.Instant;
    file: {
      __typename: "File";
      id: string;
      buffer: Uint8Array;
      filename: string;
      mimeType: string;
      createdAt: Temporal.Instant;
    };
  } | null;
};

export type DocumentFragment = {
  __typename: "Document";
  id: string;
  createdAt: Temporal.Instant;
  file: {
    __typename: "File";
    id: string;
    buffer: Uint8Array;
    filename: string;
    mimeType: string;
    createdAt: Temporal.Instant;
  };
};

type Error_DeleteDocumentError_Fragment = {
  __typename: "DeleteDocumentError";
  message: string;
};

type Error_ImageNotFoundError_Fragment = {
  __typename: "ImageNotFoundError";
  message: string;
};

type Error_ReadAssetError_Fragment = {
  __typename: "ReadAssetError";
  message: string;
};

export type ErrorFragment =
  | Error_DeleteDocumentError_Fragment
  | Error_ImageNotFoundError_Fragment
  | Error_ReadAssetError_Fragment;

export type FileFragment = {
  __typename: "File";
  id: string;
  buffer: Uint8Array;
  filename: string;
  mimeType: string;
  createdAt: Temporal.Instant;
};

export type ImageFragment = {
  __typename: "Image";
  id: string;
  name?: string | null;
  description?: string | null;
  createdAt: Temporal.Instant;
  updatedAt: Temporal.Instant;
  file: {
    __typename: "File";
    id: string;
    buffer: Uint8Array;
    filename: string;
    mimeType: string;
    createdAt: Temporal.Instant;
  };
};

export type SumFragment = {
  __typename?: "Sum";
  currency: string;
  amount: BigDecimal.BigDecimal;
};

export type CreateAssetMutationVariables = Exact<{
  data: CreateAssetInput;
}>;

export type CreateAssetMutation = {
  __typename?: "Mutation";
  createAsset: {
    __typename: "Asset";
    id: string;
    name: string;
    description?: string | null;
    createdAt: Temporal.Instant;
    updatedAt: Temporal.Instant;
    value: {
      __typename?: "Sum";
      currency: string;
      amount: BigDecimal.BigDecimal;
    };
    proofOfPurchase?: {
      __typename: "Document";
      id: string;
      createdAt: Temporal.Instant;
      file: {
        __typename: "File";
        id: string;
        buffer: Uint8Array;
        filename: string;
        mimeType: string;
        createdAt: Temporal.Instant;
      };
    } | null;
    images: Array<{
      __typename: "Image";
      id: string;
      name?: string | null;
      description?: string | null;
      createdAt: Temporal.Instant;
      updatedAt: Temporal.Instant;
      file: {
        __typename: "File";
        id: string;
        buffer: Uint8Array;
        filename: string;
        mimeType: string;
        createdAt: Temporal.Instant;
      };
    }>;
  };
};

export type DeleteAssetMutationVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type DeleteAssetMutation = {
  __typename?: "Mutation";
  deleteAsset?: { __typename: "ReadAssetError"; message: string } | null;
};

export type UpdateAssetMutationVariables = Exact<{
  data: UpdateAssetInput;
}>;

export type UpdateAssetMutation = {
  __typename?: "Mutation";
  updateAsset:
    | {
        __typename: "Asset";
        id: string;
        name: string;
        description?: string | null;
        createdAt: Temporal.Instant;
        updatedAt: Temporal.Instant;
        value: {
          __typename?: "Sum";
          currency: string;
          amount: BigDecimal.BigDecimal;
        };
        proofOfPurchase?: {
          __typename: "Document";
          id: string;
          createdAt: Temporal.Instant;
          file: {
            __typename: "File";
            id: string;
            buffer: Uint8Array;
            filename: string;
            mimeType: string;
            createdAt: Temporal.Instant;
          };
        } | null;
        images: Array<{
          __typename: "Image";
          id: string;
          name?: string | null;
          description?: string | null;
          createdAt: Temporal.Instant;
          updatedAt: Temporal.Instant;
          file: {
            __typename: "File";
            id: string;
            buffer: Uint8Array;
            filename: string;
            mimeType: string;
            createdAt: Temporal.Instant;
          };
        }>;
      }
    | { __typename: "DeleteDocumentError"; message: string }
    | { __typename: "ImageNotFoundError"; message: string }
    | { __typename: "ReadAssetError"; message: string };
};

export type AssetQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type AssetQuery = {
  __typename?: "Query";
  asset:
    | {
        __typename: "Asset";
        id: string;
        name: string;
        description?: string | null;
        createdAt: Temporal.Instant;
        updatedAt: Temporal.Instant;
        value: {
          __typename?: "Sum";
          currency: string;
          amount: BigDecimal.BigDecimal;
        };
        proofOfPurchase?: {
          __typename: "Document";
          id: string;
          createdAt: Temporal.Instant;
          file: {
            __typename: "File";
            id: string;
            buffer: Uint8Array;
            filename: string;
            mimeType: string;
            createdAt: Temporal.Instant;
          };
        } | null;
        images: Array<{
          __typename: "Image";
          id: string;
          name?: string | null;
          description?: string | null;
          createdAt: Temporal.Instant;
          updatedAt: Temporal.Instant;
          file: {
            __typename: "File";
            id: string;
            buffer: Uint8Array;
            filename: string;
            mimeType: string;
            createdAt: Temporal.Instant;
          };
        }>;
      }
    | { __typename: "ReadAssetError"; message: string };
};

export type AssetListQueryVariables = Exact<{ [key: string]: never }>;

export type AssetListQuery = {
  __typename?: "Query";
  assets: Array<{
    __typename: "Asset";
    id: string;
    name: string;
    description?: string | null;
    value: {
      __typename?: "Sum";
      currency: string;
      amount: BigDecimal.BigDecimal;
    };
    mainImage?: {
      __typename: "Image";
      id: string;
      name?: string | null;
      description?: string | null;
      createdAt: Temporal.Instant;
      updatedAt: Temporal.Instant;
      file: {
        __typename: "File";
        id: string;
        buffer: Uint8Array;
        filename: string;
        mimeType: string;
        createdAt: Temporal.Instant;
      };
    } | null;
  }>;
};

export const SumFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "sum" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Sum" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "currency" } },
          { kind: "Field", name: { kind: "Name", value: "amount" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SumFragment, unknown>;
export const FileFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "file" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "File" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "buffer" } },
          { kind: "Field", name: { kind: "Name", value: "filename" } },
          { kind: "Field", name: { kind: "Name", value: "mimeType" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<FileFragment, unknown>;
export const DocumentFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "document" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Document" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "file" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "file" },
                },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "file" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "File" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "buffer" } },
          { kind: "Field", name: { kind: "Name", value: "filename" } },
          { kind: "Field", name: { kind: "Name", value: "mimeType" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DocumentFragment, unknown>;
export const ImageFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "image" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Image" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "description" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "file" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "file" },
                },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "file" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "File" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "buffer" } },
          { kind: "Field", name: { kind: "Name", value: "filename" } },
          { kind: "Field", name: { kind: "Name", value: "mimeType" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ImageFragment, unknown>;
export const AssetFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "asset" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Asset" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "description" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "value" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "sum" },
                },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "proofOfPurchase" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "document" },
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
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "image" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "file" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "File" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "buffer" } },
          { kind: "Field", name: { kind: "Name", value: "filename" } },
          { kind: "Field", name: { kind: "Name", value: "mimeType" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "sum" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Sum" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "currency" } },
          { kind: "Field", name: { kind: "Name", value: "amount" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "document" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Document" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "file" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "file" },
                },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "image" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Image" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "description" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "file" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "file" },
                },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AssetFragment, unknown>;
export const AssetListItemFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "assetListItem" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Asset" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "description" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "value" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "sum" },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "mainImage" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "image" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "file" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "File" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "buffer" } },
          { kind: "Field", name: { kind: "Name", value: "filename" } },
          { kind: "Field", name: { kind: "Name", value: "mimeType" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "sum" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Sum" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "currency" } },
          { kind: "Field", name: { kind: "Name", value: "amount" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "image" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Image" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "description" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "file" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "file" },
                },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AssetListItemFragment, unknown>;
export const ErrorFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "error" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Error" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "message" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ErrorFragment, unknown>;
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
              name: { kind: "Name", value: "CreateAssetInput" },
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
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "asset" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "sum" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Sum" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "currency" } },
          { kind: "Field", name: { kind: "Name", value: "amount" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "file" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "File" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "buffer" } },
          { kind: "Field", name: { kind: "Name", value: "filename" } },
          { kind: "Field", name: { kind: "Name", value: "mimeType" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "document" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Document" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "file" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "file" },
                },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "image" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Image" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "description" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "file" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "file" },
                },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "asset" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Asset" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "description" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "value" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "sum" },
                },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "proofOfPurchase" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "document" },
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
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "image" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateAssetMutation, CreateAssetMutationVariables>;
export const DeleteAssetDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteAsset" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteAsset" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
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
                    name: { kind: "Name", value: "Error" },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "error" },
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
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "error" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Error" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "message" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteAssetMutation, DeleteAssetMutationVariables>;
export const UpdateAssetDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateAsset" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "UpdateAssetInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateAsset" },
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
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "asset" },
                      },
                    ],
                  },
                },
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: { kind: "Name", value: "Error" },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "error" },
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
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "sum" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Sum" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "currency" } },
          { kind: "Field", name: { kind: "Name", value: "amount" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "file" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "File" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "buffer" } },
          { kind: "Field", name: { kind: "Name", value: "filename" } },
          { kind: "Field", name: { kind: "Name", value: "mimeType" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "document" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Document" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "file" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "file" },
                },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "image" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Image" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "description" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "file" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "file" },
                },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "asset" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Asset" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "description" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "value" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "sum" },
                },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "proofOfPurchase" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "document" },
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
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "image" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "error" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Error" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "message" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateAssetMutation, UpdateAssetMutationVariables>;
export const AssetDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Asset" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "asset" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
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
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "asset" },
                      },
                    ],
                  },
                },
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: { kind: "Name", value: "Error" },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "error" },
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
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "sum" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Sum" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "currency" } },
          { kind: "Field", name: { kind: "Name", value: "amount" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "file" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "File" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "buffer" } },
          { kind: "Field", name: { kind: "Name", value: "filename" } },
          { kind: "Field", name: { kind: "Name", value: "mimeType" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "document" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Document" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "file" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "file" },
                },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "image" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Image" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "description" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "file" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "file" },
                },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "asset" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Asset" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "description" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "value" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "sum" },
                },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "proofOfPurchase" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "document" },
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
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "image" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "error" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Error" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "message" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AssetQuery, AssetQueryVariables>;
export const AssetListDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AssetList" },
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
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "assetListItem" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "sum" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Sum" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "currency" } },
          { kind: "Field", name: { kind: "Name", value: "amount" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "file" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "File" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "buffer" } },
          { kind: "Field", name: { kind: "Name", value: "filename" } },
          { kind: "Field", name: { kind: "Name", value: "mimeType" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "image" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Image" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "description" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "file" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "file" },
                },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "assetListItem" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Asset" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "description" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "value" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "sum" },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "mainImage" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "image" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AssetListQuery, AssetListQueryVariables>;
