import type { BigDecimal } from "effect";
import type {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from "graphql";
import type { Temporal } from "temporal-polyfill";

export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
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
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string | number };
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

export type MutationcreateAssetArgs = {
  data: CreateAssetInput;
};

export type MutationdeleteAssetArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationupdateAssetArgs = {
  data: UpdateAssetInput;
};

export type Query = {
  __typename?: "Query";
  /** Query a single asset by ID */
  asset: ReadAssetResponse;
  /** Query all assets */
  assets: Array<Asset>;
};

export type QueryassetArgs = {
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

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {},
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping of union types */
export type ResolversUnionTypes<_RefType extends Record<string, unknown>> = {
  ReadAssetResponse:
    | (Asset & { __typename: "Asset" })
    | (ReadAssetError & { __typename: "ReadAssetError" });
  UpdateAssetResponse:
    | (Asset & { __typename: "Asset" })
    | (DeleteDocumentError & { __typename: "DeleteDocumentError" })
    | (ImageNotFoundError & { __typename: "ImageNotFoundError" })
    | (ReadAssetError & { __typename: "ReadAssetError" });
};

/** Mapping of interface types */
export type ResolversInterfaceTypes<_RefType extends Record<string, unknown>> =
  {
    Error:
      | (DeleteDocumentError & { __typename: "DeleteDocumentError" })
      | (ImageNotFoundError & { __typename: "ImageNotFoundError" })
      | (ReadAssetError & { __typename: "ReadAssetError" });
  };

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Asset: ResolverTypeWrapper<Asset>;
  String: ResolverTypeWrapper<Scalars["String"]["output"]>;
  ID: ResolverTypeWrapper<Scalars["ID"]["output"]>;
  BigDecimal: ResolverTypeWrapper<Scalars["BigDecimal"]["output"]>;
  CreateAssetInput: CreateAssetInput;
  CreateDocumentInput: CreateDocumentInput;
  CreateFileInput: CreateFileInput;
  CreateImageInput: CreateImageInput;
  Currency: ResolverTypeWrapper<Scalars["Currency"]["output"]>;
  DeleteDocumentError: ResolverTypeWrapper<DeleteDocumentError>;
  DeleteDocumentInput: DeleteDocumentInput;
  DeleteImageInput: DeleteImageInput;
  Document: ResolverTypeWrapper<Document>;
  Error: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>["Error"]>;
  File: ResolverTypeWrapper<File>;
  Image: ResolverTypeWrapper<Image>;
  ImageNotFoundError: ResolverTypeWrapper<ImageNotFoundError>;
  MutateDocumentInput: MutateDocumentInput;
  MutateImageInput: MutateImageInput;
  Mutation: ResolverTypeWrapper<{}>;
  NonEmptyTrimmedString: ResolverTypeWrapper<
    Scalars["NonEmptyTrimmedString"]["output"]
  >;
  Query: ResolverTypeWrapper<{}>;
  ReadAssetError: ResolverTypeWrapper<ReadAssetError>;
  ReadAssetResponse: ResolverTypeWrapper<
    ResolversUnionTypes<ResolversTypes>["ReadAssetResponse"]
  >;
  Sum: ResolverTypeWrapper<Sum>;
  SumInput: SumInput;
  TemporalInstant: ResolverTypeWrapper<Scalars["TemporalInstant"]["output"]>;
  TrimmedString: ResolverTypeWrapper<Scalars["TrimmedString"]["output"]>;
  Uint8Array: ResolverTypeWrapper<Scalars["Uint8Array"]["output"]>;
  UpdateAssetInput: UpdateAssetInput;
  UpdateAssetResponse: ResolverTypeWrapper<
    ResolversUnionTypes<ResolversTypes>["UpdateAssetResponse"]
  >;
  UpdateDocumentInput: UpdateDocumentInput;
  UpdateImageInput: UpdateImageInput;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]["output"]>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Asset: Asset;
  String: Scalars["String"]["output"];
  ID: Scalars["ID"]["output"];
  BigDecimal: Scalars["BigDecimal"]["output"];
  CreateAssetInput: CreateAssetInput;
  CreateDocumentInput: CreateDocumentInput;
  CreateFileInput: CreateFileInput;
  CreateImageInput: CreateImageInput;
  Currency: Scalars["Currency"]["output"];
  DeleteDocumentError: DeleteDocumentError;
  DeleteDocumentInput: DeleteDocumentInput;
  DeleteImageInput: DeleteImageInput;
  Document: Document;
  Error: ResolversInterfaceTypes<ResolversParentTypes>["Error"];
  File: File;
  Image: Image;
  ImageNotFoundError: ImageNotFoundError;
  MutateDocumentInput: MutateDocumentInput;
  MutateImageInput: MutateImageInput;
  Mutation: {};
  NonEmptyTrimmedString: Scalars["NonEmptyTrimmedString"]["output"];
  Query: {};
  ReadAssetError: ReadAssetError;
  ReadAssetResponse: ResolversUnionTypes<ResolversParentTypes>["ReadAssetResponse"];
  Sum: Sum;
  SumInput: SumInput;
  TemporalInstant: Scalars["TemporalInstant"]["output"];
  TrimmedString: Scalars["TrimmedString"]["output"];
  Uint8Array: Scalars["Uint8Array"]["output"];
  UpdateAssetInput: UpdateAssetInput;
  UpdateAssetResponse: ResolversUnionTypes<ResolversParentTypes>["UpdateAssetResponse"];
  UpdateDocumentInput: UpdateDocumentInput;
  UpdateImageInput: UpdateImageInput;
  Boolean: Scalars["Boolean"]["output"];
};

export type AssetResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Asset"] = ResolversParentTypes["Asset"],
> = {
  createdAt?: Resolver<
    ResolversTypes["TemporalInstant"],
    ParentType,
    ContextType
  >;
  description?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  images?: Resolver<Array<ResolversTypes["Image"]>, ParentType, ContextType>;
  mainImage?: Resolver<Maybe<ResolversTypes["Image"]>, ParentType, ContextType>;
  name?: Resolver<
    ResolversTypes["NonEmptyTrimmedString"],
    ParentType,
    ContextType
  >;
  proofOfPurchase?: Resolver<
    Maybe<ResolversTypes["Document"]>,
    ParentType,
    ContextType
  >;
  updatedAt?: Resolver<
    ResolversTypes["TemporalInstant"],
    ParentType,
    ContextType
  >;
  value?: Resolver<ResolversTypes["Sum"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface BigDecimalScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["BigDecimal"], any> {
  name: "BigDecimal";
}

export interface CurrencyScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Currency"], any> {
  name: "Currency";
}

export type DeleteDocumentErrorResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["DeleteDocumentError"] = ResolversParentTypes["DeleteDocumentError"],
> = {
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DocumentResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Document"] = ResolversParentTypes["Document"],
> = {
  asset?: Resolver<ResolversTypes["Asset"], ParentType, ContextType>;
  createdAt?: Resolver<
    ResolversTypes["TemporalInstant"],
    ParentType,
    ContextType
  >;
  file?: Resolver<ResolversTypes["File"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ErrorResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Error"] = ResolversParentTypes["Error"],
> = {
  __resolveType?: TypeResolveFn<
    "DeleteDocumentError" | "ImageNotFoundError" | "ReadAssetError",
    ParentType,
    ContextType
  >;
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
};

export type FileResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["File"] = ResolversParentTypes["File"],
> = {
  buffer?: Resolver<ResolversTypes["Uint8Array"], ParentType, ContextType>;
  createdAt?: Resolver<
    ResolversTypes["TemporalInstant"],
    ParentType,
    ContextType
  >;
  filename?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  mimeType?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ImageResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Image"] = ResolversParentTypes["Image"],
> = {
  asset?: Resolver<ResolversTypes["Asset"], ParentType, ContextType>;
  createdAt?: Resolver<
    ResolversTypes["TemporalInstant"],
    ParentType,
    ContextType
  >;
  description?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  file?: Resolver<ResolversTypes["File"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<
    Maybe<ResolversTypes["TrimmedString"]>,
    ParentType,
    ContextType
  >;
  updatedAt?: Resolver<
    ResolversTypes["TemporalInstant"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ImageNotFoundErrorResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ImageNotFoundError"] = ResolversParentTypes["ImageNotFoundError"],
> = {
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"],
> = {
  createAsset?: Resolver<
    ResolversTypes["Asset"],
    ParentType,
    ContextType,
    RequireFields<MutationcreateAssetArgs, "data">
  >;
  deleteAsset?: Resolver<
    Maybe<ResolversTypes["ReadAssetError"]>,
    ParentType,
    ContextType,
    RequireFields<MutationdeleteAssetArgs, "id">
  >;
  updateAsset?: Resolver<
    ResolversTypes["UpdateAssetResponse"],
    ParentType,
    ContextType,
    RequireFields<MutationupdateAssetArgs, "data">
  >;
};

export interface NonEmptyTrimmedStringScalarConfig
  extends GraphQLScalarTypeConfig<
    ResolversTypes["NonEmptyTrimmedString"],
    any
  > {
  name: "NonEmptyTrimmedString";
}

export type QueryResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Query"] = ResolversParentTypes["Query"],
> = {
  asset?: Resolver<
    ResolversTypes["ReadAssetResponse"],
    ParentType,
    ContextType,
    RequireFields<QueryassetArgs, "id">
  >;
  assets?: Resolver<Array<ResolversTypes["Asset"]>, ParentType, ContextType>;
};

export type ReadAssetErrorResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ReadAssetError"] = ResolversParentTypes["ReadAssetError"],
> = {
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReadAssetResponseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ReadAssetResponse"] = ResolversParentTypes["ReadAssetResponse"],
> = {
  __resolveType?: TypeResolveFn<
    "Asset" | "ReadAssetError",
    ParentType,
    ContextType
  >;
};

export type SumResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Sum"] = ResolversParentTypes["Sum"],
> = {
  amount?: Resolver<ResolversTypes["BigDecimal"], ParentType, ContextType>;
  currency?: Resolver<ResolversTypes["Currency"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface TemporalInstantScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["TemporalInstant"], any> {
  name: "TemporalInstant";
}

export interface TrimmedStringScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["TrimmedString"], any> {
  name: "TrimmedString";
}

export interface Uint8ArrayScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Uint8Array"], any> {
  name: "Uint8Array";
}

export type UpdateAssetResponseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["UpdateAssetResponse"] = ResolversParentTypes["UpdateAssetResponse"],
> = {
  __resolveType?: TypeResolveFn<
    "Asset" | "DeleteDocumentError" | "ImageNotFoundError" | "ReadAssetError",
    ParentType,
    ContextType
  >;
};

export type Resolvers<ContextType = any> = {
  Asset?: AssetResolvers<ContextType>;
  BigDecimal?: GraphQLScalarType;
  Currency?: GraphQLScalarType;
  DeleteDocumentError?: DeleteDocumentErrorResolvers<ContextType>;
  Document?: DocumentResolvers<ContextType>;
  Error?: ErrorResolvers<ContextType>;
  File?: FileResolvers<ContextType>;
  Image?: ImageResolvers<ContextType>;
  ImageNotFoundError?: ImageNotFoundErrorResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  NonEmptyTrimmedString?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  ReadAssetError?: ReadAssetErrorResolvers<ContextType>;
  ReadAssetResponse?: ReadAssetResponseResolvers<ContextType>;
  Sum?: SumResolvers<ContextType>;
  TemporalInstant?: GraphQLScalarType;
  TrimmedString?: GraphQLScalarType;
  Uint8Array?: GraphQLScalarType;
  UpdateAssetResponse?: UpdateAssetResponseResolvers<ContextType>;
};
