import type {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from "graphql";

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
  /** Represents the Node `Buffer` type */
  Byte: { input: Buffer; output: Buffer };
  /** RFC 3339 compliant date-time string. */
  DateTime: { input: Date | string; output: Date };
};

export type Asset = {
  __typename?: "Asset";
  createdAt: Scalars["DateTime"]["output"];
  description?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  images: Array<Image>;
  name?: Maybe<Scalars["String"]["output"]>;
  proofOfPurchase?: Maybe<Document>;
  updatedAt: Scalars["DateTime"]["output"];
};

export type AssetError = Error & {
  __typename?: "AssetError";
  message: Scalars["String"]["output"];
};

export type AssetInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  images?: InputMaybe<Array<ImageInput>>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  proofOfPurchase?: InputMaybe<DocumentInput>;
};

export type AssetResponse = Asset | AssetError;

export type Document = {
  __typename?: "Document";
  asset: Asset;
  createdAt: Scalars["DateTime"]["output"];
  file: File;
  id: Scalars["ID"]["output"];
};

export type DocumentInput = {
  file: FileInput;
};

/** A generic error interface. */
export type Error = {
  message: Scalars["String"]["output"];
};

export type File = {
  __typename?: "File";
  createdAt: Scalars["DateTime"]["output"];
  file: Scalars["Byte"]["output"];
  filename: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  mimeType: Scalars["String"]["output"];
};

export type FileInput = {
  file: Scalars["Byte"]["input"];
  filename: Scalars["String"]["input"];
  mimeType: Scalars["String"]["input"];
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

export type ImageInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  file: FileInput;
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  createAsset: AssetResponse;
};

export type MutationcreateAssetArgs = {
  data: AssetInput;
};

export type Query = {
  __typename?: "Query";
  asset: AssetResponse;
  assets: Array<AssetResponse>;
};

export type QueryassetArgs = {
  id: Scalars["ID"]["input"];
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
  AssetInput: AssetInput;
  AssetResponse: ResolverTypeWrapper<
    ResolversUnionTypes<ResolversTypes>["AssetResponse"]
  >;
  Byte: ResolverTypeWrapper<Scalars["Byte"]["output"]>;
  DateTime: ResolverTypeWrapper<Scalars["DateTime"]["output"]>;
  Document: ResolverTypeWrapper<Document>;
  DocumentInput: DocumentInput;
  Error: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>["Error"]>;
  File: ResolverTypeWrapper<File>;
  FileInput: FileInput;
  Image: ResolverTypeWrapper<Image>;
  ImageInput: ImageInput;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]["output"]>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Asset: Asset;
  String: Scalars["String"]["output"];
  ID: Scalars["ID"]["output"];
  AssetError: AssetError;
  AssetInput: AssetInput;
  AssetResponse: ResolversUnionTypes<ResolversParentTypes>["AssetResponse"];
  Byte: Scalars["Byte"]["output"];
  DateTime: Scalars["DateTime"]["output"];
  Document: Document;
  DocumentInput: DocumentInput;
  Error: ResolversInterfaceTypes<ResolversParentTypes>["Error"];
  File: File;
  FileInput: FileInput;
  Image: Image;
  ImageInput: ImageInput;
  Mutation: {};
  Query: {};
  Boolean: Scalars["Boolean"]["output"];
};

export type AssetResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Asset"] = ResolversParentTypes["Asset"],
> = {
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  description?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  images?: Resolver<Array<ResolversTypes["Image"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  proofOfPurchase?: Resolver<
    Maybe<ResolversTypes["Document"]>,
    ParentType,
    ContextType
  >;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
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

export interface ByteScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Byte"], any> {
  name: "Byte";
}

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["DateTime"], any> {
  name: "DateTime";
}

export type DocumentResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Document"] = ResolversParentTypes["Document"],
> = {
  asset?: Resolver<ResolversTypes["Asset"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
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
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  file?: Resolver<ResolversTypes["Byte"], ParentType, ContextType>;
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
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  description?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  file?: Resolver<ResolversTypes["File"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
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
};

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
  assets?: Resolver<
    Array<ResolversTypes["AssetResponse"]>,
    ParentType,
    ContextType
  >;
};

export type Resolvers<ContextType = any> = {
  Asset?: AssetResolvers<ContextType>;
  AssetError?: AssetErrorResolvers<ContextType>;
  AssetResponse?: AssetResponseResolvers<ContextType>;
  Byte?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  Document?: DocumentResolvers<ContextType>;
  Error?: ErrorResolvers<ContextType>;
  File?: FileResolvers<ContextType>;
  Image?: ImageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};
