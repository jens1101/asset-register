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
  /**
   * A tagged scalar that encodes to a decimal numerical string and decodes to a
   * `BigDecimal` instance.
   */
  BigDecimal: { input: BigDecimal.BigDecimal; output: BigDecimal.BigDecimal };
  /** A string scalar of ISO 4217 3-letter currency codes. */
  Currency: { input: string; output: string };
  /**
   * A string scalar that may not be empty nor have any leading or trailing
   * whitespaces.
   */
  NonEmptyTrimmedString: { input: string; output: string };
  /**
   * A tagged scalar that encodes to an ISO 8601 timestamp and decodes to a
   * `Temporal.Instant` instance.
   */
  TemporalInstant: { input: Temporal.Instant; output: Temporal.Instant };
  /** A string scalar that may not have any leading or trailing whitespaces. */
  TrimmedString: { input: string; output: string };
  /**
   * A tagged scalar that encodes to a base64 string and decodes to a `Uint8Array`
   * instance.
   */
  Uint8Array: { input: Uint8Array; output: Uint8Array };
};

export type Asset = {
  __typename?: "Asset";
  createdAt: Scalars["TemporalInstant"]["output"];
  description?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  /** Images associated with the asset. */
  images: Array<Image>;
  /**
   * The main image is the first image in the array of images associated with the
   * asset. This can be `null` if the asset has no images.
   */
  mainImage?: Maybe<Image>;
  /**
   * The asset name. This must be a non-empty string with no leading or trailing
   * whitespaces.
   */
  name: Scalars["NonEmptyTrimmedString"]["output"];
  proofOfPurchase?: Maybe<Document>;
  updatedAt: Scalars["TemporalInstant"]["output"];
  /** The value of the asset at the time of purchase or valuation. */
  value: Sum;
};

/** Inputs required for creating a new asset. */
export type CreateAssetInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  /** Images associated with the asset. The array may be empty. */
  images?: InputMaybe<Array<CreateImageInput>>;
  /**
   * The asset name. This must be a non-empty string with no leading or trailing
   * whitespaces.
   */
  name: Scalars["NonEmptyTrimmedString"]["input"];
  proofOfPurchase?: InputMaybe<CreateDocumentInput>;
  /** The value of the asset at the time of purchase or valuation. */
  value: SumInput;
};

/** Inputs required for creating a new document. */
export type CreateDocumentInput = {
  file: CreateFileInput;
};

/** Inputs required for creating a new file. */
export type CreateFileInput = {
  /** The actual file contents. */
  buffer: Scalars["Uint8Array"]["input"];
  /** The name of the file. */
  filename: Scalars["String"]["input"];
  /** The mime type of the file. */
  mimeType: Scalars["String"]["input"];
};

/** Inputs required for creating a new image. */
export type CreateImageInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  /** The file associated with this image. */
  file: CreateFileInput;
  /** The image name. It may not contain leading or trailing whitespaces. */
  name?: InputMaybe<Scalars["TrimmedString"]["input"]>;
  /**
   * The ID of the image that preceeds this one. Used for ordering images. If
   * `null` or omitted then the new image will be appended to the start of the
   * list.
   */
  previousImageId?: InputMaybe<Scalars["ID"]["input"]>;
};

/**
 * Error that occurs when attempting to delete a document from an asset that
 * doesn't own the document. In other words: the asset in question does not match
 * the document's associated asset.
 */
export type DeleteDocumentError = Error & {
  __typename?: "DeleteDocumentError";
  message: Scalars["String"]["output"];
};

/** Inputs required for deleting a document. */
export type DeleteDocumentInput = {
  /** The ID of the document that needs to be deleted. */
  id: Scalars["ID"]["input"];
};

/** Inputs required for deleting an image. */
export type DeleteImageInput = {
  /** The ID of the image that needs to be deleted. */
  id: Scalars["ID"]["input"];
};

/** The document type is used to contain a file with some associated metadata. */
export type Document = {
  __typename?: "Document";
  /** The asset associated with this document. */
  asset: Asset;
  createdAt: Scalars["TemporalInstant"]["output"];
  /** The file contained within this document. */
  file: File;
  id: Scalars["ID"]["output"];
};

/**
 * The interface for expected business errors. This allows us to distinguish
 * between errors and defects. For example: querying for an asset that does not
 * exist is an expected error and then this interface is used to standardise the
 * returned error.
 */
export type Error = {
  message: Scalars["String"]["output"];
};

/**
 * The file type is a genric container for binary file data plus some essential
 * metadata.
 */
export type File = {
  __typename?: "File";
  /** The actual file contents. */
  buffer: Scalars["Uint8Array"]["output"];
  createdAt: Scalars["TemporalInstant"]["output"];
  /** The name of the file. */
  filename: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  /** The mime type of the file. This is essential for knowing what the file is. */
  mimeType: Scalars["String"]["output"];
};

/** The image type is used to contain a file with some image related metadata. */
export type Image = {
  __typename?: "Image";
  /** The asset associated with this image. */
  asset: Asset;
  createdAt: Scalars["TemporalInstant"]["output"];
  description?: Maybe<Scalars["String"]["output"]>;
  /** The file contained within this image. */
  file: File;
  id: Scalars["ID"]["output"];
  /** The image name. It may not contain leading or trailing whitespaces. */
  name?: Maybe<Scalars["TrimmedString"]["output"]>;
  updatedAt: Scalars["TemporalInstant"]["output"];
};

/**
 * Occurs when an image was not found in the asset's list of images. This can
 * happen, for example, when images are reordered and the mutation input is bad.
 */
export type ImageNotFoundError = Error & {
  __typename?: "ImageNotFoundError";
  message: Scalars["String"]["output"];
};

/**
 * Inputs required for mutating a document. This approach allows the use of a
 * single mutation to update or delete a document.
 */
export type MutateDocumentInput =
  | { delete: DeleteDocumentInput; update?: never }
  | { delete?: never; update: UpdateDocumentInput };

/**
 * Inputs required for mutating an image. This approach allows the use of a single
 * mutation to create, update, or delete an image.
 */
export type MutateImageInput =
  | { create: CreateImageInput; delete?: never; update?: never }
  | { create?: never; delete: DeleteImageInput; update?: never }
  | { create?: never; delete?: never; update: UpdateImageInput };

export type Mutation = {
  __typename?: "Mutation";
  /** Mutation to create a new asset */
  createAsset: Asset;
  /**
   * Mutation to delete an asset. Upon success the return value will be `null`. An
   * error value will be returned when an error occurs.
   */
  deleteAsset?: Maybe<ReadAssetError>;
  /** Mutation to update an existing asset */
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
  /** Query a single asset by ID */
  asset: ReadAssetResponse;
  /** Query all assets */
  assets: Array<Asset>;
};

export type QueryAssetArgs = {
  id: Scalars["ID"]["input"];
};

/** Error that occurs when the specified asset could not be found in the database */
export type ReadAssetError = Error & {
  __typename?: "ReadAssetError";
  message: Scalars["String"]["output"];
};

export type ReadAssetResponse = Asset | ReadAssetError;

/** The sum type is used to associate a numerical amount with a currency. */
export type Sum = {
  __typename?: "Sum";
  /** The numerical amount as a decimal number. */
  amount: Scalars["BigDecimal"]["output"];
  /** An ISO 4217 currency code. */
  currency: Scalars["Currency"]["output"];
};

/** Generic input for creating or updating a sum. */
export type SumInput = {
  /** The numerical amount as a decimal number. */
  amount: Scalars["BigDecimal"]["input"];
  /** An ISO 4217 currency code. */
  currency: Scalars["Currency"]["input"];
};

/**
 * Inputs for updating an asset. Only the fields that need to be updated need to be
 * included.
 */
export type UpdateAssetInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  /** The ID of the asset that needs to be updated. */
  id: Scalars["ID"]["input"];
  images?: InputMaybe<Array<MutateImageInput>>;
  /**
   * The asset name. This must be a non-empty string with no leading or trailing
   * whitespaces.
   */
  name?: InputMaybe<Scalars["NonEmptyTrimmedString"]["input"]>;
  proofOfPurchase?: InputMaybe<MutateDocumentInput>;
  /** The value of the asset at the time of purchase or valuation. */
  value?: InputMaybe<SumInput>;
};

export type UpdateAssetResponse =
  | Asset
  | DeleteDocumentError
  | ImageNotFoundError
  | ReadAssetError;

/**
 * Inputs for updating a document. Only the fields that need to be updated need to
 * be included.
 */
export type UpdateDocumentInput = {
  file: CreateFileInput;
};

/**
 * Inputs for updating an image. Only the fields that need to be updated need to be
 * included.
 */
export type UpdateImageInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  /** A new image file that will replace the existing one. */
  file?: InputMaybe<CreateFileInput>;
  /** The ID of the image that needs to be updated. */
  id: Scalars["ID"]["input"];
  /** The image name. It may not contain leading or trailing whitespaces. */
  name?: InputMaybe<Scalars["TrimmedString"]["input"]>;
  /**
   * The ID of the image that preceeds this one. Used for reordering images. If
   * `null` then the new image will be moved to the start of the list.
   */
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
