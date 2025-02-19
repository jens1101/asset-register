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

export type AssetError = Error & {
  __typename?: "AssetError";
  message: Scalars["String"]["output"];
};

export type AssetResponse = Asset | AssetError;

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

export type MutateDocumentInput =
  | { delete: DeleteDocumentInput; update?: never }
  | { delete?: never; update: UpdateDocumentInput };

export type MutateImageInput =
  | { create: CreateImageInput; delete?: never; update?: never }
  | { create?: never; delete: DeleteImageInput; update?: never }
  | { create?: never; delete?: never; update: UpdateImageInput };

export type Mutation = {
  __typename?: "Mutation";
  createAsset: AssetResponse;
  deleteAsset?: Maybe<AssetError>;
  updateAsset: AssetResponse;
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
  asset: AssetResponse;
  assets: Array<Asset>;
};

export type QueryassetArgs = {
  id: Scalars["ID"]["input"];
};

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
  AssetResponse:
    | (Asset & { __typename: "Asset" })
    | (AssetError & { __typename: "AssetError" });
};

/** Mapping of interface types */
export type ResolversInterfaceTypes<_RefType extends Record<string, unknown>> =
  {
    Error: AssetError & { __typename: "AssetError" };
  };

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Asset: ResolverTypeWrapper<Asset>;
  String: ResolverTypeWrapper<Scalars["String"]["output"]>;
  ID: ResolverTypeWrapper<Scalars["ID"]["output"]>;
  AssetError: ResolverTypeWrapper<AssetError>;
  AssetResponse: ResolverTypeWrapper<
    ResolversUnionTypes<ResolversTypes>["AssetResponse"]
  >;
  BigDecimal: ResolverTypeWrapper<Scalars["BigDecimal"]["output"]>;
  CreateAssetInput: CreateAssetInput;
  CreateDocumentInput: CreateDocumentInput;
  CreateFileInput: CreateFileInput;
  CreateImageInput: CreateImageInput;
  Currency: ResolverTypeWrapper<Scalars["Currency"]["output"]>;
  DeleteDocumentInput: DeleteDocumentInput;
  DeleteImageInput: DeleteImageInput;
  Document: ResolverTypeWrapper<Document>;
  Error: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>["Error"]>;
  File: ResolverTypeWrapper<File>;
  Image: ResolverTypeWrapper<Image>;
  MutateDocumentInput: MutateDocumentInput;
  MutateImageInput: MutateImageInput;
  Mutation: ResolverTypeWrapper<{}>;
  NonEmptyTrimmedString: ResolverTypeWrapper<
    Scalars["NonEmptyTrimmedString"]["output"]
  >;
  Query: ResolverTypeWrapper<{}>;
  Sum: ResolverTypeWrapper<Sum>;
  SumInput: SumInput;
  TemporalInstant: ResolverTypeWrapper<Scalars["TemporalInstant"]["output"]>;
  TrimmedString: ResolverTypeWrapper<Scalars["TrimmedString"]["output"]>;
  Uint8Array: ResolverTypeWrapper<Scalars["Uint8Array"]["output"]>;
  UpdateAssetInput: UpdateAssetInput;
  UpdateDocumentInput: UpdateDocumentInput;
  UpdateImageInput: UpdateImageInput;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]["output"]>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Asset: Asset;
  String: Scalars["String"]["output"];
  ID: Scalars["ID"]["output"];
  AssetError: AssetError;
  AssetResponse: ResolversUnionTypes<ResolversParentTypes>["AssetResponse"];
  BigDecimal: Scalars["BigDecimal"]["output"];
  CreateAssetInput: CreateAssetInput;
  CreateDocumentInput: CreateDocumentInput;
  CreateFileInput: CreateFileInput;
  CreateImageInput: CreateImageInput;
  Currency: Scalars["Currency"]["output"];
  DeleteDocumentInput: DeleteDocumentInput;
  DeleteImageInput: DeleteImageInput;
  Document: Document;
  Error: ResolversInterfaceTypes<ResolversParentTypes>["Error"];
  File: File;
  Image: Image;
  MutateDocumentInput: MutateDocumentInput;
  MutateImageInput: MutateImageInput;
  Mutation: {};
  NonEmptyTrimmedString: Scalars["NonEmptyTrimmedString"]["output"];
  Query: {};
  Sum: Sum;
  SumInput: SumInput;
  TemporalInstant: Scalars["TemporalInstant"]["output"];
  TrimmedString: Scalars["TrimmedString"]["output"];
  Uint8Array: Scalars["Uint8Array"]["output"];
  UpdateAssetInput: UpdateAssetInput;
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

export type AssetErrorResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["AssetError"] = ResolversParentTypes["AssetError"],
> = {
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AssetResponseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["AssetResponse"] = ResolversParentTypes["AssetResponse"],
> = {
  __resolveType?: TypeResolveFn<
    "Asset" | "AssetError",
    ParentType,
    ContextType
  >;
};

export interface BigDecimalScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["BigDecimal"], any> {
  name: "BigDecimal";
}

export interface CurrencyScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Currency"], any> {
  name: "Currency";
}

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
  __resolveType?: TypeResolveFn<"AssetError", ParentType, ContextType>;
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

export type MutationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"],
> = {
  createAsset?: Resolver<
    ResolversTypes["AssetResponse"],
    ParentType,
    ContextType,
    RequireFields<MutationcreateAssetArgs, "data">
  >;
  deleteAsset?: Resolver<
    Maybe<ResolversTypes["AssetError"]>,
    ParentType,
    ContextType,
    RequireFields<MutationdeleteAssetArgs, "id">
  >;
  updateAsset?: Resolver<
    ResolversTypes["AssetResponse"],
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
    ResolversTypes["AssetResponse"],
    ParentType,
    ContextType,
    RequireFields<QueryassetArgs, "id">
  >;
  assets?: Resolver<Array<ResolversTypes["Asset"]>, ParentType, ContextType>;
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

export type Resolvers<ContextType = any> = {
  Asset?: AssetResolvers<ContextType>;
  AssetError?: AssetErrorResolvers<ContextType>;
  AssetResponse?: AssetResponseResolvers<ContextType>;
  BigDecimal?: GraphQLScalarType;
  Currency?: GraphQLScalarType;
  Document?: DocumentResolvers<ContextType>;
  Error?: ErrorResolvers<ContextType>;
  File?: FileResolvers<ContextType>;
  Image?: ImageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  NonEmptyTrimmedString?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Sum?: SumResolvers<ContextType>;
  TemporalInstant?: GraphQLScalarType;
  TrimmedString?: GraphQLScalarType;
  Uint8Array?: GraphQLScalarType;
};
